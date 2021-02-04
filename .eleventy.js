module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets")

  return {
    useGitIgnore: false,
    dir: {
      input: "src",
      output: "dist",
      layouts: "layouts",
      includes: "includes",
      data: "data"
    },
    passthroughFileCopy: true
  }
}
