let botao = document.querySelector(".botao-gerar")

botao.addEventListener("click", gerarCodigo)

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")

    console.log("BOTÃO CLICADO")
    console.log("ENVIANDO:", textoUsuario)

    try {
        let resposta = await fetch("https://animes-informacoes.onrender.com/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: "Você é uma IA especialista absoluta em animes, cultura japonesa e premiações como Anime Awards. Sua função é responder qualquer pergunta relacionada a animes, mangás, rankings, recomendações, notícias do mundo dos animes e Anime Awards (indicados, vencedores, categorias, história e curiosidades). Regras: sempre responda em HTML formatado usando h1, h2, p, ul e li. Seja informativa, organizada, clara e também um pouco divertida. Nunca responda fora do tema anime e cultura japonesa."
                    },
                    {
                        role: "user",
                        content: textoUsuario
                    }
                ]
            })
        })

        let dados = await resposta.json()
        console.log("RESPOSTA:", dados)

        let resultado = dados.resposta || "Erro na resposta"

        blocoCodigo.innerHTML = resultado

    } catch (erro) {
        console.error("ERRO:", erro)
        blocoCodigo.innerHTML = "Erro ao conectar com a IA"
    }
}
