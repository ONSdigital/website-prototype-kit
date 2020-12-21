const map = {
  E10: "Counties",
  E07: "Local Authority Districts",
  E05: "Electoral Wards"
}

module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  pagination: {
    data: "upperTiers",
    alias: "area",
    size: 1
  },
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs,
    childrenType: ({ area, mapAreaChildrenTypes }) => mapAreaChildrenTypes(area)
  }
}
