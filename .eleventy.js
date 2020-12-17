module.exports = (config) => {
  config.addPassthroughCopy({ public: "./" })

  config.setBrowserSyncConfig({
    files: ["dist/**/*"],
    open: false
  })

  config.setDataDeepMerge(true)

  config.addNunjucksFilter("typeof", (value) => typeof value)

  config.addNunjucksFilter("formatCell", (value) => {
    if (typeof value === "number") {
      const nfObject = new Intl.NumberFormat("en-US")
      return nfObject.format(value)
    }

    return value
  })

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "layouts",
      includes: "includes",
      data: "data"
    }
  }
}
