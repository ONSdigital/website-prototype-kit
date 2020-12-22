const baseArea = require("./base-area")

module.exports = {
  ...baseArea,
  pagination: {
    data: "lowerTiers",
    alias: "area",
    size: 1
  }
}
