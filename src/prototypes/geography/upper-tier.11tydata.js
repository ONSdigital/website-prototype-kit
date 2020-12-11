module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "upperTiers",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs
  }
}
