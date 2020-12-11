module.exports = {
  layout: "prototype",
  warning: true,
  permalink: "{{country.permalink}}",
  pagination: {
    data: "countries",
    alias: "country",
    size: 1
  },
  eleventyComputed: {
    type: "country",
    breadcrumbs: ({ country }) => country.breadcrumbs,
    children: ({ country }) => country.children,
    title: ({ country }) => country.name,
    id: ({ country }) => country.id
  }
}
