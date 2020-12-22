const areaTypes = {
  W05: "Electoral Wards",
  E05: "Electoral Wards",
  E06: "Local Authorities",
  W06: "Local Authorities",
  E09: "Local Authorities",
  E08: "Local Authorities",
  E10: "Local Authorities",
  E07: "Local Authority Districts",
  E12: "Regions"
}

const mapAreaChildrenTypes = ({ area }) => {
  if (!area.children || area.children.length < 1) {
    return null
  }

  return areaTypes[area.children[0].areaCode]
}

module.exports = {
  page: {
    warning: true
  },
  warning: true,
  permalink: "{{area.permalink}}",
  eleventyComputed: {
    breadcrumbs: ({ area }) => area.breadcrumbs,
    childrenType: mapAreaChildrenTypes
  }
}
