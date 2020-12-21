const countries = require("./data/countries.json")
const regions = require("./data/regions.json")
const upperTiers = require("./data/upper-tier.json")
const lowerTiers = require("./data/lower-tier.json")
const wards = require("./data/wards.json")

const areaTypes = {
  W05: "Electoral Wards",
  E05: "Electoral Wards",
  E06: "Local Authorities",
  W06: "Local Authorities",
  E09: "Local Authorities",
  E08: "Local Authorities",
  E10: "Local Authorities",
  E07: "Local Authority Districts",
  E12: "Regions"
}

const mapAreaChildrenTypes = (area) => {
  const type = areaTypes[area.children[0].areaCode]

  if (!type) {
    console.log(area)
  }

  return type
}

module.exports = function () {
  return {
    countries,
    regions,
    upperTiers,
    lowerTiers,
    wards,
    mapAreaChildrenTypes
  }
}
