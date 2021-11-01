import assert from 'assert'
import nock from 'nock'
import * as fs from 'fs/promises'
import sp500Constituents from '../index.js'

// NOTE: don't use arrow functions with mocha.
// See https://github.com/mochajs/mocha/issues/2018
describe('S&P500 Constituents', function () {
  let results = null

  beforeEach(async function () {
    const mockHTML = await fs.readFile('./test/data/List of S&P 500 companies - Wikipedia.html')
    nock('http://en.wikipedia.org')
      .get('/wiki/List_of_S%26P_500_companies')
      .reply(200, mockHTML)
    results = await sp500Constituents()
  })

  it('returns correct length array', function () {
    assert.strictEqual(results.length, 505)
  })

  it('returns correct JSON object structure', function () {
    const result = results[0]
    assert.deepStrictEqual(result, {
      ticker: 'MMM',
      name: '3M',
      exchange: 'NYSE',
      cik: '0000066740',
      gics: {
        sector: 'Industrials',
        subIndustry: 'Industrial Conglomerates'
      },
      dateAdded: '1976-08-09',
      yearFounded: '1902'
    })
  })

  it('all companies have a known exchange', function () {
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      // console.log(result)
      assert.notEqual(result.exchange, 'UNKNOWN')
    }
  })
})
