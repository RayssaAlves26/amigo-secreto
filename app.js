// ================================
// Lista que armazenará os nomes dos amigos
// ================================
let listaAmigos = [];

// ================================
// Função: adicionarAmigo()
// Adiciona o nome digitado no campo de entrada à lista de amigos
// ================================
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo"); // Campo de texto do HTML
    const nome = inputAmigo.value.trim(); // Pega o valor e remove espaços extras

    // Validações:
    if (nome === "") { // Se o campo estiver vazio
        alert("Por favor, insira um nome.");
        return; // Sai da função
    }
    if (listaAmigos.includes(nome)) { // Se o nome já existir na lista
        alert("Este nome já foi adicionado!");
        return;
    }

    // Adiciona o nome no array
    listaAmigos.push(nome);

    // Atualiza a exibição da lista na tela
    atualizarLista();

    // Limpa o campo e coloca o foco de volta nele
    inputAmigo.value = "";
    inputAmigo.focus();
}

// ================================
// Função: atualizarLista()
// Atualiza visualmente a <ul> de amigos com os nomes do array
// ================================
function atualizarLista() {
    const ulLista = document.getElementById("listaAmigos");
    ulLista.innerHTML = ""; // Limpa a lista antes de preencher de novo

    // Percorre o array listaAmigos e cria elementos <li> para cada amigo
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li"); // Cria um item da lista
        li.textContent = amigo; // Adiciona o nome do amigo

        // Cria o botão de remover (❌)
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.onclick = () => removerAmigo(index); // Ao clicar, remove o amigo
        btnRemover.style.marginLeft = "10px"; // Espaço entre nome e botão
        btnRemover.classList.add("btn-remover"); // Classe para estilizar no CSS

        // Adiciona o botão dentro do <li> e o <li> dentro da <ul>
        li.appendChild(btnRemover);
        ulLista.appendChild(li);
    });
}

// ================================
// Função: removerAmigo(index)
// Remove um amigo da lista pelo índice
// ================================
function removerAmigo(index) {
    listaAmigos.splice(index, 1); // Remove 1 elemento na posição 'index'
    atualizarLista(); // Atualiza a lista na tela
}

// ================================
// Função: embaralhar(array)
// Algoritmo Fisher-Yates para embaralhar elementos de um array
// ================================
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Posição aleatória
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de lugar
    }
}

// ================================
// Função: sortearAmigo()
// Faz o sorteio garantindo que ninguém tire a si mesmo
// ================================
function sortearAmigo() {
    // Impede o sorteio se houver menos de 3 amigos
    if (listaAmigos.length < 3) {
        alert("Adicione pelo menos 3 amigos para o sorteio.");
        return;
    }

    let sorteioValido = false; // Flag para verificar se o sorteio é válido
    let sorteados = []; // Lista embaralhada de resultados

    // Repete o sorteio até ser válido (ninguém tira a si mesmo)
    while (!sorteioValido) {
        sorteados = [...listaAmigos]; // Copia o array original
        embaralhar(sorteados); // Embaralha

        sorteioValido = true; // Assume que é válido
        for (let i = 0; i < listaAmigos.length; i++) {
            if (listaAmigos[i] === sorteados[i]) { // Se alguém tirou a si mesmo
                sorteioValido = false; // Sorteio inválido
                break; // Sai do loop e tenta novamente
            }
        }
    }

    // Exibe o resultado na <ul> de resultados
    const ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = ""; // Limpa antes de mostrar o novo sorteio

    for (let i = 0; i < listaAmigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${listaAmigos[i]} → ${sorteados[i]}`; // Ex.: João → Maria
        ulResultado.appendChild(li);
    }
}