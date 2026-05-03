import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/gerar", async (req, res) => {
    console.log("CHEGOU NO BACKEND:", req.body)

    try {
        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        })

        const dados = await resposta.json()
        console.log("RESPOSTA DA IA:", dados)

        res.json(dados)

    } catch (erro) {
        console.log("ERRO:", erro)
        res.status(500).json({ erro: "Erro no servidor" })
    }
})

// 👇 ISSO É O MAIS IMPORTANTE PRO DEPLOY
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
