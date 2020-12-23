module.exports = (config) => {
  config.addPassthroughCopy({ public: "./" })

  config.setBrowserSyncConfig({
    files: ["dist/**/*"],
    open: false
  })

  config.setDataDeepMerge(true)

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
