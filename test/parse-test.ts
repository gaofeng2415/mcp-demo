import fs from 'fs/promises'
import parseUtils from '../src/server/utils/ui-parse.js'

const jsonPath = './fetch-result.json'
const json = await fs.readFile(jsonPath, 'utf-8')

const result = parseUtils.parse(JSON.parse(json))
console.log(result);

