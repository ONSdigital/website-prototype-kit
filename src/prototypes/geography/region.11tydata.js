module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{region.permalink}}",
  pagination: {
    data: "regions",
    alias: "region",
    size: 1
  },
  eleventyComputed: {
    type: "region",
    breadcrumbs: ({ region }) => region.breadcrumbs,
    children: ({ region }) => region.children,
    title: ({ region }) => region.name,
    id: ({ region }) => region.id
  }
}
