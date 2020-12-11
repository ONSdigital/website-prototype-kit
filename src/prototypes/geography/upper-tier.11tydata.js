module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{upperTier.permalink}}",
  pagination: {
    data: "upperTiers",
    alias: "upperTier",
    size: 1
  },
  eleventyComputed: {
    type: "Upper Tier Local Authority",
    breadcrumbs: ({ upperTier }) => upperTier.breadcrumbs,
    children: ({ upperTier }) => upperTier.children,
    title: ({ upperTier }) => upperTier.name,
    id: ({ upperTier }) => upperTier.id
  }
}
