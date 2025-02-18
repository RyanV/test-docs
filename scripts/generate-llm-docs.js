const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const IGNORE_FILES = ['README.md', 'llm.txt'];
require('dotenv').config({ path: '../.env' })

const apiKey = process.env['OPENAI_API_KEY'];
if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}
const client = new OpenAI({ apiKey });

async function main() {
  const docsDir = path.resolve(__dirname, '../docs');
  const docs = fs
    .readdirSync(docsDir)
    .filter((file) => file.endsWith('.md'))
    .filter((file) => !IGNORE_FILES.includes(file));

  const prompt = `You are a technical writer. Your job is to generate a complete, concise and compact version of the input documentation specifically for llm consumption. the output should not include any unnecessary markdown formatting and is not intended for human readability. 
  Here are the document contents:
  ${docs.map((file) => `<DOC_START>\nfilename: ${file}\n${fs.readFileSync(path.resolve(docsDir, file), 'utf8')}\n<DOC_END>`)}
  `;

  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  });

  const output = chatCompletion.choices[0].message.content;
  console.log(output);

  fs.writeFileSync(path.resolve(__dirname, '../docs/llm.txt'), output);
}

main();
