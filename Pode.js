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
                    content: "Voce e uma superespecialista em anime de qualquer genero, sua reposta e zueira porem com todas as informações que o usuario pedir, se colocar alguma palavra em inglês traduza em portugues brasil, se pergutarem sobre qualquer coisa do anime awards vc sabe de tudo"
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
console.log("BOTÃO CLICADO")
    console.log("ENVIANDO:", textoUsuario)
    console.log("RESPOSTA:", dados)
