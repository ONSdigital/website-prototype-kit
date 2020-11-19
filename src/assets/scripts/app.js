document.addEventListener("DOMContentLoaded", (event) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFtaXNodGFwbGluIiwiYSI6ImNqMWpiYmYxNDAwMWgzMm1uNThxN2g1OHMifQ.RDtUmEqrDYplmFSHft14nw"

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

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hamishtaplin/ckhynxmqs1zhf19r9i9vacd38",
    zoom: 5,
    center: [-1.33402, 52.15907]
  })

  map.on("load", function () {
    map.addSource("regions", {
      type: "geojson",
      data: "/assets/data/region.geojson"
    })

    map.addLayer({
      id: "regions_line",
      type: "line",
      source: "regions",
      layout: style.line.layout,
      paint: style.line.paint,
      minzoom: 1,
      maxzoom: 12
    })

    map.addLayer({
      id: "regions",
      type: "fill",
      source: "regions",
      paint: style.fill.paint,
      minzoom: 1,
      maxzoom: 12
    })

    map.on("click", "regions", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var item = e.features[0].properties.item

      const region = window.__regions.filter((region) => region.id === item)[0]

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      //   }

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<h2 style="margin: 0;">${region.name}</h2>`)
        .addTo(map)
    })

    // Change the cursor to a pointer when the mouse is over the regions layer.
    map.on("mouseenter", "regions", function () {
      map.getCanvas().style.cursor = "pointer"
    })

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "regions", function () {
      map.getCanvas().style.cursor = ""
    })
  })
})
