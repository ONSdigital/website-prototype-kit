import { parse } from "./wellknown"
import { bbox } from "./turf.min.js"

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFtaXNodGFwbGluIiwiYSI6ImNqMWpiYmYxNDAwMWgzMm1uNThxN2g1OHMifQ.RDtUmEqrDYplmFSHft14nw"

const API_URL = "http://statistics.data.gov.uk/sparql.json?query="

const query = (code) => `
    PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>
    SELECT ?geometry
    WHERE {
    <http://statistics.data.gov.uk/id/statistical-geography/${code}/geometry> geosparql:asWKT ?geometry
    }
    LIMIT 1
`

const makeQuery = async (query) => {
  const response = await fetch(API_URL + encodeURIComponent(query))

  if (response.status >= 200 && response.status <= 299) {
    const json = await response.json()
    return await json.results.bindings
  } else {
    console.error(response.status, response.statusText)
  }
}

const style = {
  line: {
    layout: {
      "line-cap": "round",
      "line-join": "round",
      visibility: "visible"
    },
    paint: {
      "line-color": [
        "case",
        ["==", ["feature-state", "select"], true],
        "hsl(207%, 65%, 35%)",
        "hsl(207%, 65%, 35%)"
      ],
      "line-width": [
        "case",
        ["==", ["feature-state", "select"], true],
        3,
        ["==", ["feature-state", "hover"], true],
        2,
        1
      ]
    }
  },
  fill: {
    paint: {
      "fill-color": "rgba(206, 216, 224, 0.3)"
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const mapElement = document.getElementById("map")
  const areaId = mapElement.getAttribute("data-areaId")
  const data = await makeQuery(query(areaId))
  const area = data[0].geometry.value

  if (!area) return false

  const geoJson = parse(area)
  const bounds = bbox(geoJson)

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hamishtaplin/ckhynxmqs1zhf19r9i9vacd38",
    interactive: false
  })

  map.fitBounds(bounds, { animate: false, padding: 20 })

  map.on("load", function () {
    map.addSource("regions", {
      type: "geojson",
      data: geoJson
    })

    map.addLayer({
      id: "regions_line",
      type: "line",
      source: "regions",
      layout: style.line.layout,
      paint: style.line.paint
    })

    map.addLayer({
      id: "regions",
      type: "fill",
      source: "regions",
      paint: style.fill.paint
    })

    // map.on("click", "regions", function (e) {
    //   var coordinates = e.features[0].geometry.coordinates.slice()
    //   var item = e.features[0].properties.item

    //   const region = window.__regions.filter((region) => region.id === item)[0]

    //   new mapboxgl.Popup()
    //     .setLngLat(e.lngLat)
    //     .setHTML(`<h2 style="margin: 0;">${region.name}</h2>`)
    //     .addTo(map)
    // })

    // map.on("mouseenter", "regions", function () {
    //   map.getCanvas().style.cursor = "pointer"
    // })

    // map.on("mouseleave", "regions", function () {
    //   map.getCanvas().style.cursor = ""
    // })
  })
})
