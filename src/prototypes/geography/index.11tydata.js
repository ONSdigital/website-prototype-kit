module.exports = {
  layout: "prototype",
  warning: true,
  eleventyComputed: {
    area: {
      name: "United Kingdom",
      children: ({ countries }) => countries
    },
    breadcrumbs: false
  }
}
