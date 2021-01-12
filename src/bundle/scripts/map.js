import { csvParse } from "d3-dsv"
import { parse } from "./wellknown"
import { bbox, centroid } from "./turf.min.js"

const areaChildren = window.__areaChildren__

const colours = {
  matisse: "#206095",
  salem: "#0F8243"
}

const compareIds = (code) => ({ properties: { id } }) => id === code

const mapChildrenToGeoJson = (children) => ({
  type: "FeatureCollection",
  features: children.reduce((acc, { code, name, wkt }) => {
    if (
      !acc.some(compareIds(code)) &&
      areaChildren.map(({ id }) => id).includes(code)
    ) {
      const { permalink, type } = areaChildren.find(({ id }) => id === code)
      const feature = {
        type: "Feature",
        geometry: { ...parse(wkt) },
        properties: { id: code, name, permalink, type }
      }

      return [...acc, feature]
    }

    return acc
  }, [])
})

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFtaXNodGFwbGluIiwiYSI6ImNqMWpiYmYxNDAwMWgzMm1uNThxN2g1OHMifQ.RDtUmEqrDYplmFSHft14nw"

const API_URL =
  "https://pmd3-production-drafter-onsgeo.publishmydata.com/v1/sparql/live?query="

const query = (code) => `
    PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    SELECT ?geometry
    WHERE {
        <http://statistics.data.gov.uk/id/statistical-geography/${code}/geometry> geosparql:asWKT ?geometry
    }
    LIMIT 1
`

const childrenQuery = (code) => `
    PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    PREFIX foi: <http://publishmydata.com/def/ontology/foi/>
    PREFIX statid: <http://statistics.data.gov.uk/id/statistical-geography/>
    PREFIX statdef: <http://statistics.data.gov.uk/def/statistical-geography#>
    PREFIX st: <http://ns.inria.fr/sparql-template/>
    SELECT DISTINCT ?code ?name ?wkt
    WHERE {
    ?child foi:parent statid:${code} ;
            foi:code ?code ;
            statdef:officialname ?name ;
            geosparql:hasGeometry ?geom .
    ?geom geosparql:asWKT ?wkt .
    }
`

const makeQuery = async (query) => {
  const response = await fetch(API_URL + encodeURIComponent(query))

  if (response.status >= 200 && response.status <= 299) {
    const string = await response.text()
    const data = await csvParse(string)

    return data
  } else {
    console.error(response.status, response.statusText)
  }
}

const getCentroids = ({ features }) => ({
  type: "FeatureCollection",
  features: features.map((feature) => ({
    ...centroid(feature),
    properties: feature.properties
  }))
})

document.addEventListener("DOMContentLoaded", async () => {
  const mapElement = document.getElementById("map")
  const areaId = mapElement.getAttribute("data-areaId")
  const overlay = document.getElementById("map-overlay")
  const overlayTitle = document.getElementById("map-overlay-title")
  const overlaySubtitle = document.getElementById("map-overlay-subtitle")
  const overlayLink = document.getElementById("map-overlay-link")
  const overlayClose = document.getElementById("map-overlay-close")

  const data = await makeQuery(query(areaId))
  const childData = await makeQuery(childrenQuery(areaId))

  const area = data[0].geometry

  if (!area) return false

  const geoJson = parse(area)
  const bounds = bbox(geoJson)

  let hoveredStateId = null
  let selectedStateId = null

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hamishtaplin/ckhynxmqs1zhf19r9i9vacd38",
    interactive: true
  })

  map.fitBounds(bounds, { animate: false, padding: 20 })

  map.addControl(new mapboxgl.NavigationControl())

  map.scrollZoom.disable()

  map.on("load", () => {
    const layers = map.getStyle().layers
    let firstSymbolId

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id
        break
      }
    }

    map.addSource("area", {
      type: "geojson",
      data: geoJson
    })

    map.addSource("area-children", {
      type: "geojson",
      promoteId: "id",
      data: mapChildrenToGeoJson(childData)
    })

    map.addSource("area-labels", {
      type: "geojson",
      data: getCentroids(mapChildrenToGeoJson(childData))
    })

    map.addLayer(
      {
        id: "area-line",
        type: "line",
        source: "area",
        line: {
          layout: {
            "line-cap": "round",
            "line-join": "round",
            visibility: "visible"
          }
        },
        paint: {
          "line-color": colours.salem,
          "line-opacity": 0.2,
          "line-width": 2
        }
      },
      firstSymbolId
    )

    map.addLayer(
      {
        id: "area-children",
        type: "fill",
        source: "area",
        paint: {
          "fill-color": colours.salem,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.3,
            0.1
          ]
        }
      },
      firstSymbolId
    )

    map.addLayer(
      {
        id: "children-line",
        type: "line",
        source: "area-children",
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible"
        },
        paint: {
          "line-color": colours.salem,
          "line-opacity": 0.2,
          "line-width": 1
        }
      },
      firstSymbolId
    )

    map.addLayer(
      {
        id: "area-children-fill",
        type: "fill",
        source: "area-children",
        paint: {
          "fill-color": colours.salem,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.3,
            0.05
          ]
        }
      },
      firstSymbolId
    )

    map.addLayer(
      {
        id: "area-children-labels",
        type: "symbol",
        source: "area-labels",
        layout: {
          "text-size": 14,
          "text-font": ["Open Sans Regular"],
          visibility: "visible",
          "text-field": ["get", "name"]
        },
        paint: {
          "text-halo-width": 1,
          "text-color": "rgb(50, 50, 50)",
          "text-halo-color": "rgba(255,255,255, 0.8)"
        }
      },
      firstSymbolId
    )

    map.on("mousemove", "area-children-fill", (e) => {
      map.getCanvas().style.cursor = "pointer"

      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: "area-children", id: hoveredStateId },
            { hover: false }
          )
        }

        hoveredStateId = e.features[0].id

        map.setFeatureState(
          { source: "area-children", id: hoveredStateId },
          { hover: true }
        )
      }
    })

    map.on("mouseleave", "area-children-fill", () => {
      map.getCanvas().style.cursor = ""

      if (hoveredStateId) {
        map.setFeatureState(
          { source: "area-children", id: hoveredStateId },
          { hover: false }
        )
      }
      hoveredStateId = null
    })

    map.on("click", "area-children-fill", (e) => {
      const { properties } = e.features[0]

      overlayTitle.innerText = properties.name
      overlaySubtitle.innerText = `${properties.type} (${properties.id})`
      overlayLink.setAttribute("href", properties.permalink)

      overlay.classList.remove("hidden")

      selectedStateId = e.features[0].id

      map.setFeatureState(
        { source: "area-children", selectedStateId },
        { selected: true }
      )
    })

    overlayClose.addEventListener("click", () => {
      overlay.classList.add("hidden")
    })
  })
})
