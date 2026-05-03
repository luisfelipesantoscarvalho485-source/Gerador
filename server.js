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
            body: JSON.stringify({
                model: req.body.model,
                messages: req.body.messages
            })
        })

        const dados = await resposta.json()
        console.log("RESPOSTA DA IA:", dados)

        // 👇 resposta correta pra frontend
        res.json({
            resposta: dados?.choices?.[0]?.message?.content || "Erro na resposta"
        })

    } catch (erro) {
        console.log("ERRO:", erro)
        res.status(500).json({ erro: "Erro no servidor" +port })
    }
})
