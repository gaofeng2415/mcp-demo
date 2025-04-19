// import http from './agent-fetch.js';

// const res = await http.post('', { messages: 'hello' });
// console.log(res);

import uiHttp from "./ui-fetch.js";
import fs from 'fs/promises';
const fileId = 'GYGDEukMSmeZcWnKzxx2m8'
const nodeIds = '3319-2'
const res = await uiHttp.get(`/v1/files/${fileId}/nodes?ids=${nodeIds}`);

fs.writeFile('./fetch-result.json', JSON.stringify(res, null, 2), 'utf-8')
console.log(res);
