const geoData = require("./data/geo.json")
const R = require("ramda")
const fs = require("fs")

const slugify = require("slugify")

const toSlug = (str) => slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g })

const buildSlug = R.pipe(
  R.unapply(R.reduce((slug, part) => `${slug}/${part}`, "")),
  toSlug
)

let regions, upperTier, lowerTier

const REGION = "region"
const UPPER_TIER = "lac"
const LOWER_TIER = "lad"

const types = {
  [REGION]: {
    id: "regioncode",
    name: "regionname"
  },
  [UPPER_TIER]: {
    id: "laccode",
    name: "lacname"
  },
  [LOWER_TIER]: {
    id: "ladcode",
    name: "ladname"
  }
}

const toArea = (type) => (list, node) => {
  const { id, name } = types[type]

  if (!node[id]) return list

  const area = {
    id: node[id].value,
    name: node[name].value,
    type: type
  }

  if (type === REGION) {
    area.slug = buildSlug(area.name)
  } else if (type === UPPER_TIER) {
    area.slug = buildSlug(node.regionname.value, `${area.name}-${area.id}`)
    area.parent = R.find(R.propEq("id", node.regioncode.value), regions)
  } else if (type === LOWER_TIER) {
    area.slug = buildSlug(
      node.regionname.value,
      node.lacname.value,
      `${area.name}-${area.id}`
    )
    area.parent = R.find(R.propEq("id", node.laccode.value), upperTier)
  }

  if (!R.includes(area, list)) list.push(area)

  return list
}

const reduceToArea = (opts) =>
  R.reduce(toArea(opts), [], geoData.results.bindings)

regions = reduceToArea(REGION)
upperTier = reduceToArea(UPPER_TIER)
lowerTier = reduceToArea(LOWER_TIER)

const mergeChildren = (parent, children) =>
  R.map(
    (p) =>
      R.mergeRight(p, {
        children: R.reduce(
          (acc, value) => {
            if (value.parent && value.parent.id === p.id) {
              acc.push(value)
            }
            return acc
          },
          [],
          children
        )
      }),
    parent
  )

const all = mergeChildren(regions, mergeChildren(upperTier, lowerTier))

const content = JSON.stringify({ all })

fs.writeFile("./prototypes/geography/data.json", content, (err) => {
  if (err) {
    console.error(err)
    return
  }
})
