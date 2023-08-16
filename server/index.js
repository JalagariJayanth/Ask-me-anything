// Back-End (Express)

const openAI = require('openai')
const dotenv = require('dotenv')

dotenv.config()

const {Configuration, OpenAIApi} = openAI

const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

const port = 3001

const apikey = process.env.API_KEY
const org = process.env.ORG
const configuration = new Configuration({
  organization: org,
  apiKey: apikey,
})
const openai = new OpenAIApi(configuration)

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
  console.log('am listening', port)
})

app.post('/chat', async (request, response) => {
  const {userEnteredValue} = request.body
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: userEnteredValue,
      max_tokens:520,
      temperature: 0,
    })

    if (completion.data.choices[0].text) {
      console.log(completion.data.choices[0].text)
      response.json({result: completion.data.choices[0].text})
    }
  } catch (error) {
    console.error(error)
    response.json({result:'Internal Error'})
  }
})