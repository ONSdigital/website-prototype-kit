const countries = require("./data/countries.json")
const regions = require("./data/regions.json")
const upperTiers = require("./data/upper-tier.json")
const lowerTiers = require("./data/lower-tier.json")
const wards = require("./data/wards.json")

module.exports = function () {
  return {
    countries,
    regions,
    upperTiers,
    lowerTiers,
    wards
  }
}