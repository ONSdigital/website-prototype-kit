const baseArea = require("./base-area")

module.exports = {
  ...baseArea,
  pagination: {
    data: "wards",
    alias: "area",
    size: 1
  }
}
