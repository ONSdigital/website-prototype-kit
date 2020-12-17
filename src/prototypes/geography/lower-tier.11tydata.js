const population = require("./data/tables/lower-tier/population.json")
const households = require("./data/tables/lower-tier/households.json")
const housing = require("./data/tables/lower-tier/housing.json")
const economic = require("./data/tables/lower-tier/economic.json")
const education = require("./data/tables/lower-tier/education.json")
const health = require("./data/tables/lower-tier/health.json")

module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "lowerTiers",
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
