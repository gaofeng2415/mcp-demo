import http from './fetch.js';

const res = await http.post('', { messages: 'hello' });
console.log(res);
