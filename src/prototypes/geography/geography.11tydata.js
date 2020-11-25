const regions = require("./data/regions.json")
const upperTier = require("./data/upperTier.json")
const lowerTier = require("./data/lowerTier.json")

module.exports = function () {
  return {
    regions,
    upperTier,
    lowerTier
  }
}
