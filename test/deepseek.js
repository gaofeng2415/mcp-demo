import OpenAI from "openai";
// import { generateText } from 'ai'

const baseURL = 'https://cloud.infini-ai.com/maas';
const apiKey = 'sk-4ftuxwzb4y6pigxv';

const openai = new OpenAI({
  baseURL,
  apiKey,
  dangerouslyAllowBrowser: true,
});

openai.chat.completions.create({
  messages: [{ role: "system", content: "Hello!" }],
  model: 'qwen2.5-72b-instruct',
}).then((res) => {
  console.log(res)
})

// const deepseekModel = createDeepSeek({
//   baseURL,
//   headers: {
//     'Authorization': `Bearer ${apiKey}`,
//     'Content-Type': 'application/json',
//   },
//   apiKey,
// });

// const { text } = await generateText({
//   model: deepseekModel,
//   prompt: 'Hello, how are you?',
//   maxTokens: 100,
// });
