module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "regions",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs,
    childrenType: ({ area, mapAreaChildrenTypes }) => mapAreaChildrenTypes(area)
  }
}
