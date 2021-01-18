import R from "ramda"
import fs from "fs"
import slugify from "slugify"

import fetchData from "./fetch-data.mjs"
import geoCodes from "./area-codes.mjs"

const BASE_PATH = "/prototypes/geography/"
const toSlug = (str) => slugify(str, { lower: true, remove: /[*+~.,()'"!:@]/g })
const findById = (list, id) => R.find(R.propEq("id", id), list)
const sortByName = R.sortBy(R.prop("name"))
const mergeLists = R.unapply(R.reduce(R.concat, []))
const mergeChildren = R.pipe(mergeLists, sortByName)

let countries, regions, upperTiers, lowerTiers, wards

const mapChildren = (childArea, parentArea) =>
  R.pipe(
    R.filter((child) => parentArea.id === child.parentcode.value),
    R.map(({ areacode, areaname }) => ({
      id: areacode.value,
      name: areaname.value,
      permalink: `${parentArea.permalink}${toSlug(areaname.value)}/`,
      type: geoCodes[areacode.value.substr(0, 3)].outputArea,
      areaCode: areacode.value.substr(0, 3)
    }))
  )(childArea)

const mapArea = R.map(({ areacode, areaname, parentcode }) => {
  const parent = parentcode
    ? findById(countries, parentcode.value) ||
      findById(regions, parentcode.value) ||
      findById(upperTiers, parentcode.value) ||
      findById(lowerTiers, parentcode.value)
    : null

  const id = areacode.value

  const slug = toSlug(areaname.value)
  const permalink = parent
    ? `${parent.permalink}${slug}/`
    : `${BASE_PATH}${slug}/`

  const breadcrumbs = parent
    ? [...parent.breadcrumbs]
    : [
        {
          href: BASE_PATH,
          title: "Home"
        }
      ]

  breadcrumbs.push({
    title: areaname.value,
    href: permalink
  })

  const type = geoCodes[areacode.value.substr(0, 3)].outputArea
  const baseArea = {
    id,
    permalink
  }

  const children = mergeChildren(
    mapChildren(rawData.regions, baseArea),
    mapChildren(rawData.upperTiers, baseArea),
    mapChildren(rawData.lowerTiers, baseArea),
    mapChildren(rawData.wards, baseArea)
  )

  const area = {
    ...baseArea,
    areaCode: areacode.value.substr(0, 3),
    name: areaname.value,
    slug,

    parent: R.omit(["parent"], parent),
    children,
    breadcrumbs,
    type
  }

  return area
})

const writeFile = ({ name, data }) =>
  fs.writeFile(
    `./src/prototypes/geography/data/${name}.json`,
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err)
        return
      }
    }
  )

const rawData = await fetchData()

countries = mapArea(rawData.countries)
regions = mapArea(rawData.regions)
upperTiers = mapArea(rawData.upperTiers)
lowerTiers = mapArea(rawData.lowerTiers)
wards = mapArea(rawData.wards)

// writeFile("raw-wards", rawData.wards)
// writeFile("raw-uppertiers", rawData.upperTiers)

const areas = [
  { name: "countries", data: countries },
  { name: "regions", data: regions },
  { name: "upper-tier", data: upperTiers },
  { name: "lower-tier", data: lowerTiers },
  { name: "wards", data: wards }
]

areas.forEach(writeFile)
