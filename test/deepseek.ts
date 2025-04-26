import OpenAI from "openai";
// import { generateText } from 'ai'

const baseURL = 'https://cloud.infini-ai.com/maas/v1';
const apiKey = 'sk-4ftuxwzb4y6pigxv';

const openai = new OpenAI({
  baseURL,
  apiKey,
  dangerouslyAllowBrowser: true,
});

const completions = await openai.chat.completions.create({
  messages: [{ role: "system", content: "你好，能帮忙用ts写一个hello world嘛?返回数据格式用markdown语法" }],
  model: 'qwen2.5-72b-instruct',
})
console.log(completions);
