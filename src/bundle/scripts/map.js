import { csvParse } from "d3-dsv"
import { parse } from "./wellknown"
import { bbox, centroid } from "./turf.min.js"

let map

const areaChildren = window.__areaChildren__
const areaSiblings = window.__areaSiblings__

const colours = {
  matisse: "#206095",
  salem: "#0F8243"
}

const isEqual = (a) => (b) => a === b

const deDupeAreas = (areas) =>
  areas.reduce((array, area) => {
    if (!array.map(({ code }) => code).some(isEqual(area.code))) {
      return [...array, area]
    }

    return array
  }, [])

const mergeAreas = (a, b) => {
  const sortedA = a.sort((a, b) => a.code > b.code)
  const sortedB = b.sort((a, b) => a.id > b.id)

  return sortedA.map((area, i) => ({
    ...area,
    ...sortedB[i]
  }))
}

const filterAreas = (a, b) => {
  const filteredAreas = a.filter(({ code }) => b.find(({ id }) => id === code))
  return mergeAreas(filteredAreas, b)
}

const convertAreaToGeoJson = ({ code, name, geometry, permalink, type }) => ({
  type: "Feature",
  geometry: { ...parse(geometry) },
  properties: { id: code, name, permalink, type }
})

const convertAreasToGeoJson = (areas) => ({
  type: "FeatureCollection",
  features: areas.map(convertAreaToGeoJson)
})

const extractAreaAndSiblings = (areaData, areaId) =>
  areaData.reduce(
    (obj, area) => {
      if (area.code === areaId) {
        obj.area = area
      } else {
        obj.siblings = [...obj.siblings, area]
      }

      return obj
    },
    { area: null, siblings: [] }
  )

const getCentroids = ({ features }) => ({
  type: "FeatureCollection",
  features: features.map((feature) => ({
    ...centroid(feature),
    properties: feature.properties
  }))
})

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFtaXNodGFwbGluIiwiYSI6ImNqMWpiYmYxNDAwMWgzMm1uNThxN2g1OHMifQ.RDtUmEqrDYplmFSHft14nw"

const API_URL =
  "https://pmd3-production-drafter-onsgeo.publishmydata.com/v1/sparql/live?query="

const areaQuery = (code) => `
    PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    PREFIX foi: <http://publishmydata.com/def/ontology/foi/>
    PREFIX statid: <http://statistics.data.gov.uk/id/statistical-geography/>
    PREFIX statdef: <http://statistics.data.gov.uk/def/statistical-geography#>
    PREFIX st: <http://ns.inria.fr/sparql-template/>
    SELECT ?code ?name ?geometry
    WHERE {
        statid:${code} foi:parent ?parent .
        ?sibling foi:parent ?parent ;
                 foi:code ?code ;
                 statdef:officialname ?name ;
                 geosparql:hasGeometry ?geom .
    ?geom geosparql:asWKT ?geometry .
    }
`

const countryQuery = (code) => `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX geoid: <http://statistics.data.gov.uk/id/statistical-geography/>
    PREFIX foi: <http://publishmydata.com/def/ontology/foi/>
    PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    SELECT ?code ?name ?geometry
    WHERE
    {
    geoid:${code} foi:code ?code ;
                    foi:displayName ?name .
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
    SELECT DISTINCT ?code ?name ?geometry
    WHERE {
    ?child foi:parent statid:${code} ;
            foi:code ?code ;
            statdef:officialname ?name ;
            geosparql:hasGeometry ?geom .
    ?geom geosparql:asWKT ?geometry .
    }
`

const makeQuery = async (query) => {
  const response = await fetch(API_URL + encodeURIComponent(query))

  if (response.status >= 200 && response.status <= 299) {
    const string = await response.text()
    return await csvParse(string)
  } else {
    console.error(response.status, response.statusText)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const mapElement = document.getElementById("map")
  const areaId = mapElement.getAttribute("data-areaId")
  const overlay = document.getElementById("map-overlay")
  const overlayTitle = document.getElementById("map-overlay-title")
  const overlaySubtitle = document.getElementById("map-overlay-subtitle")
  const overlayLink = document.getElementById("map-overlay-link")
  const overlayClose = document.getElementById("map-overlay-close")

  let area, siblings, showArea

  if (areaId === "W92000004" || areaId === "E92000001") {
    const areaData = await makeQuery(countryQuery(areaId))
    area = areaData[0]
    showArea = false
  } else {
    const areaData = await makeQuery(areaQuery(areaId))
    const areas = extractAreaAndSiblings(areaData, areaId)
    area = areas.area
    siblings = filterAreas(areas.siblings, areaSiblings)

    showArea = true
  }

  const childData = await makeQuery(childrenQuery(areaId))
  const deDupedChildren = deDupeAreas(childData)
  const filteredChildren = filterAreas(deDupedChildren, areaChildren)
  const areaChildrenGeoJson = convertAreasToGeoJson(filteredChildren)

  const geoJson = parse(area.geometry)
  const bounds = bbox(geoJson)

  map = new mapboxgl.Map({
    container: "map",
    style: "/assets/style.json",
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
      data: areaChildrenGeoJson
    })

    map.addSource("area-children-labels", {
      type: "geojson",
      data: getCentroids(areaChildrenGeoJson)
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
          "line-opacity": 0.5,
          "line-width": 2
        }
      },
      firstSymbolId
    )

    map.addLayer(
      {
        id: "area-children-fill",
        type: "fill",
        source: areaChildrenGeoJson.features.length ? "area-children" : "area",
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
        id: "area-children-labels",
        type: "symbol",
        source: "area-children-labels",
        layout: {
          "text-size": 14,
          "text-font": ["Open Sans Regular"],
          visibility: "visible",
          "text-field": ["get", "name"]
        },
        paint: {
          "text-halo-width": 1,
          "text-color": "rgb(30, 30, 30)",
          "text-halo-color": "rgba(255,255,255, 0.8)"
        }
      },
      firstSymbolId
    )

    if (showArea) {
      map.addSource("area-label", {
        type: "geojson",
        data: {
          ...centroid(geoJson),
          properties: { name: area.name, id: area.code }
        }
      })

      map.addLayer(
        {
          id: "area-label",
          type: "symbol",
          source: "area-label",
          layout: {
            "text-size": 12,
            "text-letter-spacing": 0.1,
            "text-font": ["Open Sans Bold"],
            visibility: "visible",
            "text-field": ["get", "name"],
            "text-allow-overlap": true,
            "text-transform": "uppercase"
          },
          paint: {
            "text-halo-width": 1,
            "text-color": "rgb(30, 30, 30)",
            "text-halo-color": "rgba(255,255,255, 0.8)"
          }
        },
        firstSymbolId
      )
    }

    if (siblings) {
      const siblingsGeoJson = convertAreasToGeoJson(siblings)

      map.addSource("area-siblings", {
        type: "geojson",
        promoteId: "id",
        data: siblingsGeoJson
      })

      map.addSource("area-siblings-labels", {
        type: "geojson",
        data: getCentroids(siblingsGeoJson)
      })

      map.addLayer(
        {
          id: "siblings-line",
          type: "line",
          source: "area-siblings",
          layout: {
            "line-cap": "round",
            "line-join": "round",
            visibility: "visible"
          },
          paint: {
            "line-color": colours.matisse,
            "line-opacity": 0.2,
            "line-width": 2
          }
        },
        firstSymbolId
      )

      map.addLayer(
        {
          id: "area-siblings-fill",
          type: "fill",
          source: "area-siblings",
          paint: {
            "fill-color": colours.matisse,
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
          id: "area-siblings-labels",
          type: "symbol",
          source: "area-siblings-labels",
          layout: {
            "text-size": 14,
            "text-font": ["Open Sans Regular"],
            visibility: "visible",
            "text-field": ["get", "name"]
          },
          paint: {
            "text-halo-width": 1,
            "text-color": "rgb(30, 30, 30)",
            "text-halo-color": "rgba(255,255,255, 0.8)"
          }
        },
        firstSymbolId
      )
    }

    let hoveredAreaId = null
    let selectedStateId = null

    const onMouseMove = (e) => {
      map.getCanvas().style.cursor = "pointer"

      if (e.features.length > 0) {
        if (hoveredAreaId) {
          map.setFeatureState(
            { source: "area-children", id: hoveredAreaId },
            { hover: false }
          )
          map.setFeatureState(
            { source: "area-siblings", id: hoveredAreaId },
            { hover: false }
          )
        }

        hoveredAreaId = e.features[0].id

        map.setFeatureState(
          { source: e.features[0].source, id: hoveredAreaId },
          { hover: true }
        )
      }
    }

    const onMouseLeave = (e) => {
      map.getCanvas().style.cursor = ""

      if (hoveredAreaId) {
        map.setFeatureState(
          { source: "area-children", id: hoveredAreaId },
          { hover: false }
        )
        map.setFeatureState(
          { source: "area-siblings", id: hoveredAreaId },
          { hover: false }
        )
      }
      hoveredAreaId = null
    }

    const onMouseClick = (e) => {
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
    }

    map.on("mousemove", "area-children-fill", onMouseMove)
    map.on("mousemove", "area-siblings-fill", onMouseMove)
    map.on("mouseleave", "area-children-fill", onMouseLeave)
    map.on("mouseleave", "area-siblings-fill", onMouseLeave)
    map.on("click", "area-children-fill", onMouseClick)
    map.on("click", "area-siblings-fill", onMouseClick)

    overlayClose.addEventListener("click", () => {
      overlay.classList.add("hidden")
    })
  })
})
