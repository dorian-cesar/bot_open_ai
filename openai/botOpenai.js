
require('dotenv').config();

const apiKey = process.env.API_KEY;


const OpenAI = require ('openai')



const openai = new OpenAI({
  apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
});

async function botOpenai(pregunta) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: pregunta }],
    model: 'gpt-3.5-turbo',
  });

  

  response= chatCompletion.choices[0].message.content



  return response


}

module.exports={botOpenai}