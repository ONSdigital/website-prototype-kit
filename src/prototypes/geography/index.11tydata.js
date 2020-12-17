module.exports = {
  page: {
    warning: true
  },
  warning: true,
  eleventyComputed: {
    area: {
      name: "United Kingdom",
      children: ({ countries }) => countries
    },
    breadcrumbs: [{
      title: "Home",
      href: "/"
    }]
  }
}
