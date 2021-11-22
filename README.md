# S&P 500 Index Companies

Main repo: [https://github.com/huned/nodejs-sp500-companies](https://github.com/huned/nodejs-sp500-companies)

Returns an up-to-date list of S&P 500 constituent companies and metadata as a
useful JSON array. The actual data is from [Wikipedia's List of S&P 500
Companies](https://en.wikipedia.org/wiki/List_of_S%26P_500_companies)

## Command Line Usage

    $ npm install --g sp500-companies-as-json

    $ sp500 | jq
    [
      {
        "ticker": "MMM",
        "exchange": "NYSE",
        "name": "3M",
        "gics": {
          "sector": "Industrials",
          "subIndustry": "Industrial Conglomerates"
      },
      ...
    ]

## Node.js Usage

    ```bash
    $ npm install sp500-companies-as-json --save
    ```

    ```js
    import sp500CompaniesAsJSON from 'sp500-companies-as-json'

    const companies = await sp500CompaniesAsJSON()

    console.log(companies.length)
    // 505

    console.log(companies[0])
    // {
    //   ticker: 'MMM',
    //   exchange: 'NYSE',
    //   name: '3M',
    //   gics: {
    /      sector: 'Industrials',
    //     subIndustry: 'Industrial Conglomerates'
    //   },
    //   dateAdded: '1976-08-09',
    //   cik: '0000066740',
    //   yearFounded: '1902'
    // }
    ```

## TODOs

- [ ] rename "binary" to companies
- [ ] CLI
  - [ ] output CSV by default
  - [ ] --index=sp500|russell2000|russell3000
  - [ ] --json

## Contributing

PRs are welcome so long as quality and speed aren't compromised.

1. Fork repo
2. Create a branch
3. Make your changes and add tests (`npm test`)
4. Submit PR

## Author(s)

* [Huned Botee](huned@hunedbotee.com)

## License

MIT
