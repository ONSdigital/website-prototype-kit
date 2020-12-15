module.exports = {
  page: {
    warning: true
  },
  permalink: "{{area.permalink}}",
  pagination: {
    data: "countries",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs
  }
}
