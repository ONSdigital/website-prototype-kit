module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{lowerTier.permalink}}",
  pagination: {
    data: "lowerTiers",
    alias: "lowerTier",
    size: 1
  },
  eleventyComputed: {
    type: "Lower Tier Local Authority",
    breadcrumbs: ({ lowerTier }) => lowerTier.breadcrumbs,
    children: ({ lowerTier }) => lowerTier.children,
    title: ({ lowerTier }) => lowerTier.name,
    id: ({ lowerTier }) => lowerTier.id
  }
}
