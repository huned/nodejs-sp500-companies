import assert from 'assert'
import nock from 'nock'
import * as fs from 'fs/promises'
import sp500Constituents from '../index.js'

// NOTE: don't use arrow functions with mocha.
// See https://github.com/mochajs/mocha/issues/2018
describe('S&P500 Constituents', function () {
  it('does not raise', function () {
    assert.doesNotThrow(sp500Constituents)
  })

  it('returns companies and metadata', async function () {
    const mockHTML = await fs.readFile('./test/data/List of S&P 500 companies - Wikipedia.html')
    nock('http://en.wikipedia.org')
      .get('/wiki/List_of_S%26P_500_companies')
      .reply(200, mockHTML)
    const mockFile = './data/List of S&P 500 companies - Wikipedia.html'
    const table = await sp500Constituents(mockFile)

    // 1 header row + 505 company rows = 506 rows
    assert.strictEqual(table.length, 506)
  })
})
