const baseArea = require("./base-area")

module.exports = {
  ...baseArea,
  pagination: {
    data: "upperTiers",
    alias: "area",
    size: 1
  }
}
