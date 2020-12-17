const population = require("./data/tables/country/population.json")
const households = require("./data/tables/country/households.json")
const housing = require("./data/tables/country/housing.json")
const economic = require("./data/tables/country/economic.json")
const education = require("./data/tables/country/education.json")
const health = require("./data/tables/country/health.json")

module.exports = {
  page: {
    warning: true
  },
  permalink: "{{area.permalink}}",
  pagination: {
    data: "countries",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs,
    tables: {
      population,
      households,
      housing,
      economic,
      education,
      health
    }
  }
}
