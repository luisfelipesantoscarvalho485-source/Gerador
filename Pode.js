/* 
    Variável - Pedacinho de memória
    que eu posso guardar o que eu quiser

    Função - Pedacinho de código QUE só EXECUTA
    Quando é chamado

    Algoritmo - Receita do Bolo
    Lógica de Programação -  Fazer o bolo

    // Algoritmo do nosso sistema
    // Lógica de programação

    [x] Saber quem é o botão
    [x] Saber quando o botão foi clicado
    [x] Saber quem é o textarea  
    [x] Pegar o que tem dentro dele
    [x] Enviar para a IA
    [x] Pegar a resposta da IA e colocar na tela 
    [ ] Estilizar a resposta     

    // Ir no HTML e pegar o botão
    // HTML = document (documento)
    // Selecionar (querySelector)
    // Quem ? Botão
    // Apelido para o botão - classes(class) = .
    fetch - ferramenta do JS para se comunicar com o servidor
*/

// Descobri que é o botao
let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"
// Criei a funcao que será chamada quando clicar 
// no botao

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
                    content: "Voce e uma superespecialista em anime de qualquer genero, vode responde de uma forma de zueira mas com todas as informações pedidas, se usar inglês traduza em português brasil para que o usuario entenda, e se perguntarem alguma coisa relacioanada ao animeawards vc sabe de tudo"
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
}


    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

// ficar de olho no botao, quando clicado chamar o gerarCodigo
botao.addEventListener("click", gerarCodigo)


// vizinho curioso (addEventListener)
// adicionar ouvinte de eventos
// Evento = clique, digitei...
