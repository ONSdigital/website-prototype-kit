module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "wards",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs
  }
}
