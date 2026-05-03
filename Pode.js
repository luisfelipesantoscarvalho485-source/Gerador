let botao = document.querySelector(".botao-gerar")

botao.addEventListener("click", gerarCodigo)

async function gerarCodigo() {

    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")

    console.log("BOTÃO CLICADO")
    console.log("ENVIANDO:", textoUsuario)

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
                    content: {
  role: "system",
  content: `
Você é uma IA especialista absoluta em animes, cultura japonesa e premiações como Anime Awards.

Sua função é responder QUALQUER pergunta relacionada a:
- animes (séries, personagens, temporadas, estúdios)
- mangás
- rankings e recomendações
- notícias do mundo dos animes
- Anime Awards (indicados, vencedores, categorias, história e curiosidades)

REGRAS OBRIGATÓRIAS:

1. SEMPRE responda em HTML formatado:
   - use <h1> para títulos principais
   - use <h2> para subtítulos
   - use <p> para explicações
   - use <ul> e <li> para listas

2. Sempre organize a resposta de forma bonita e estruturada.

3. Nunca responda em texto bruto, apenas HTML.

4. Seja informativo, direto e completo e seja brincalhona tambem. 

5. Se a pergunta for sobre Anime Awards:
   - explique categoria
   - cite vencedores (se possível)
   - explique relevância
   - organize em tópicos

6. Se não souber algo exato, ainda assim tente responder de forma útil baseada no contexto de animes.

7. Não saia do tema anime e cultura japonesa.

EXEMPLO DE FORMATAÇÃO:

<h1>Nome do Anime</h1>
<p>Resumo do anime...</p>
<h2>Personagens principais</h2>
<ul>
<li>Personagem 1</li>
<li>Personagem 2</li>
</ul>
`
}
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
}
