module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{ward.permalink}}",
  pagination: {
    data: "wards",
    alias: "ward",
    size: 1
  },
  eleventyComputed: {
    type: "ward",
    breadcrumbs: ({ ward }) => ward.breadcrumbs,
    children: ({ ward }) => ward.children,
    title: ({ ward }) => ward.name,
    id: ({ ward }) => ward.id
  }
}
