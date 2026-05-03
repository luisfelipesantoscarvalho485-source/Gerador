let botao = document.querySelector(".botao-gerar")

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")

    let resposta = await fetch("http://localhost:3000/gerar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: "Voce e uma superespecialista em anime..."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()
    console.log(dados)

    let resultado = dados?.choices?.[0]?.message?.content || "Erro na resposta"

    blocoCodigo.textContent = resultado
}

botao.addEventListener("click", gerarCodigo)
