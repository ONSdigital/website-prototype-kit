const baseArea = require("./base-area")

module.exports = {
  ...baseArea,
  pagination: {
    data: "countries",
    alias: "area",
    size: 1
  }
}
