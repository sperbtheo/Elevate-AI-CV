import express from "express"
import cors from "cors"
import Groq from "groq-sdk"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

app.post("/analyze-cv", async (req, res) => {

  try {

    const { text } = req.body

    const response =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",

            content: `
Você é um especialista em análise de currículos.

Extraia informações e retorne SOMENTE JSON:

{
  "info": {
    "nome":"",
    "email":"",
    "telefone":"",
    "localizacao":"",
    "resumo":""
  },

  "experiencias":[
    {
      "cargo":"",
      "empresa":"",
      "periodo":"",
      "descricao":""
    }
  ],

  "formacoes":[
    {
      "curso":"",
      "instituicao":"",
      "periodo":""
    }
  ],

  "habilidades":[
    {
      "habilidade":"",
      "nivel":"Básico"
    }
  ]
}

Não invente dados.
Retorne apenas JSON válido.
`
          },

          {
            role: "user",
            content: text
          }

        ],

        temperature: 0.2

      })

    const content =
      response.choices[0].message.content || ""

    const start = content.indexOf("{")
    const end = content.lastIndexOf("}")

    if (start === -1 || end === -1) {

      return res
        .status(500)
        .json({
          error: "JSON inválido retornado pela IA"
        })

    }

    const json = JSON.parse(
      content.substring(
        start,
        end + 1
      )
    )

    res.json(json)

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      error: err.message
    })

  }

})


app.post("/suggest-cv", async (req, res) => {

  try {

    const { curriculo } = req.body

    if (!curriculo) {

      return res.status(400).json({
        error: "curriculo ausente"
      })

    }

    const response =
      await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {

            role: "system",

            content: `
Você é especialista em otimização de currículos.

Retorne SOMENTE:

{
  "suggestions":[
    {
      "id":"string",
      "title":"string",
      "reason":"string",

      "preview":{
        "before":"",
        "after":""
      },

      "patch":[
        {
          "op":"set",
          "path":"info.resumo",
          "value":""
        }
      ]
    }
  ]
}

Máximo 8 sugestões.
Não invente informações.
`
          },

          {

            role: "user",
            content:
              JSON.stringify(curriculo)

          }

        ],

        temperature: 0.2

      })

    const content =
      response.choices[0].message.content || ""

    const start = content.indexOf("{")
    const end = content.lastIndexOf("}")

    const json = JSON.parse(
      content.substring(
        start,
        end + 1
      )
    )

    res.json(json)

  }

  catch (err) {

    console.error(err)

    res.status(500).json({
      error: err.message
    })

  }

})

app.listen(3000, () => {

  console.log(
    "Servidor rodando na porta 3000"
  )

})