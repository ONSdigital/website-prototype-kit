const population = require("../data/tables/population.json")
const households = require("../data/tables/households.json")
const housing = require("../data/tables/housing.json")
const economic = require("../data/tables/economic.json")
const education = require("../data/tables/education.json")
const health = require("../data/tables/health.json")

const tableSections = [
  { title: "Population", data: population },
  { title: "Households", data: households },
  { title: "Housing", data: housing },
  { title: "Economic", data: economic },
  { title: "Education", data: education },
  { title: "Health", data: health }
]

module.exports = {
  tableSections
}
