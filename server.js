import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API rodando 🚀")
})

app.post("/gerar", async (req, res) => {
    try {
        console.log("REQ RECEBIDO:", req.body)

        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: req.body.model,
                messages: req.body.messages
            })
        })

        const dados = await resposta.json()

        res.json({
            resposta: dados?.choices?.[0]?.message?.content || "Sem resposta"
        })

    } catch (err) {
        console.log("ERRO:", err)
        res.status(500).json({ erro: "Erro no servidor" })
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})
