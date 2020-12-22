const baseArea = require("./base-area")

module.exports = {
  ...baseArea,
  pagination: {
    data: "regions",
    alias: "area",
    size: 1
  }
}
