import OpenAI from "openai";
// import { generateText } from 'ai'

const baseURL = 'https://api.deepseek.com';
const apiKey = 'sk-ff412d5bdd9f4e1a94bb5c9839b494cd';

const openai = new OpenAI({
  baseURL,
  apiKey,
  dangerouslyAllowBrowser: true,
});

openai.chat.completions.create({
  messages: [{ role: "system", content: "Hello!" }],
  model: 'deepseek-chat',
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