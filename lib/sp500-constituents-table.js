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
    parser: element => {
      // return $(element).text().replace(/\s+$/, '')
      return $(element).html()
    }
  })

  const results = []
  for (let i = 0; i < table.length; i++) {
    if (i === 0) continue

    const row = table[i].map(s => s.trim())

    // col 0: ticker symbol
    // col 1: company name
    // col 2: link to SEC filings
    // col 3: GICS sector
    // col 4: GICS sub-industry
    // col 5: HQ location
    // col 6: date added to index
    // col 7: cik
    // col 8: year(s) founded

    const tickerLink = $(row[0]).attr('href')
    let exchange = 'UNKNOWN'
    if (/nyse\.com/.test(tickerLink)) {
      exchange = 'NYSE'
    } else if (/nasdaq\.com/.test(tickerLink)) {
      exchange = 'NASDAQ'
    } else if (/cboe\.com/.test(tickerLink)) {
      exchange = 'CBOE'
    }

    results.push({
      ticker: $(row[0]).text().trim().toUpperCase(),
      exchange: exchange,
      name: $(row[1]).text().trim(),
      gics: {
        sector: row[3],
        subIndustry: row[4]
      },
      dateAdded: row[6],
      cik: row[7],
      yearFounded: row[8]
    })
  }

  return results
}
