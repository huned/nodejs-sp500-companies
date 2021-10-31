import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { parseTable } from '@joshuaavalon/cheerio-table-parser'

export default async () => {
  // fetch html
  const url = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
  const response = await fetch(url)
  const body = await response.text()

  // parse table
  const $ = cheerio.load(body)
  const table = parseTable($('table#constituents')[0], {
    parser: element => $(element).text().replace(/\s+$/, '')
  })

  // TODO convert array of array to an array of JSON objects

  return table
}
