const population = require("./data/tables/region/population.json")
const households = require("./data/tables/region/households.json")
const housing = require("./data/tables/region/housing.json")
const economic = require("./data/tables/region/economic.json")
const education = require("./data/tables/region/education.json")
const health = require("./data/tables/region/health.json")

module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "regions",
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
