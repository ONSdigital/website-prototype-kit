const population = require("./data/tables/upper-tier/population.json")
const households = require("./data/tables/upper-tier/households.json")
const housing = require("./data/tables/upper-tier/housing.json")
const economic = require("./data/tables/upper-tier/economic.json")
const education = require("./data/tables/upper-tier/education.json")
const health = require("./data/tables/upper-tier/health.json")

module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "upperTiers",
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
