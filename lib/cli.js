#!/usr/bin/env node

import sp500Companies from '../index.js'

const main = async () => {
  const results = await sp500Companies()
  process.stdout.write(JSON.stringify(results))
  process.stdout.write('\n')
}

main()
