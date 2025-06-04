let btnEnviar = document.querySelectorAll('#botoes button')[0];
let btnExcluir = document.querySelectorAll('#botoes button')[1];
let btnEditar = document.querySelectorAll('#botoes button')[2];

let nome = document.querySelectorAll('#wrap input')[0];
let quantidade = document.querySelectorAll('#wrap input')[1];
let preco = document.querySelectorAll('#wrap input')[2];

let descricao = document.querySelectorAll('#wrap input')[4];
let categoria = document.querySelectorAll('#wrap input')[5];

let tabela = document.querySelector('#saida table tbody');
let BD = [];

btnEnviar.onclick = function () {
    let produto = {
        nome: nome.value,
        quantidade: quantidade.value,
        preco: preco.value,
        
        descricao: descricao.value,
        categoria: categoria.value,
        id: BD.length
    };
    BD.push(produto);
    montarTabela();
};

btnExcluir.onclick = function () {
    let novosDados = [];
    let checkboxes = document.querySelectorAll('#saida table tbody input[type="checkbox"]');

    checkboxes.forEach((chk, index) => {
        if (!chk.checked) {
            novosDados.push(BD[index]);
        }
    });

    BD = novosDados;
    montarTabela();
};

btnEditar.onclick = function () {
    let checkboxes = document.querySelectorAll('#saida table tbody input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            BD[i].nome = nome.value;
            BD[i].quantidade = quantidade.value;
            BD[i].preco = preco.value;
            
            BD[i].descricao = descricao.value;
            BD[i].categoria = categoria.value;
            break;
        }
    }
    montarTabela();
};

function montarTabela() {
    tabela.innerHTML = "";
    for (let i = 0; i < BD.length; i++) {
        tabela.innerHTML += `
            <tr>
                <td><input type="checkbox" onchange="verificar(${i})"></td>
                <td>${BD[i].nome}</td>
                <td>${BD[i].quantidade}</td>
                <td>${BD[i].preco}</td>
            </tr>`;
    }
}

function verificar(id) {
    let checkboxes = document.querySelectorAll('#saida table tbody input[type="checkbox"]');
    let selecionados = 0;

    checkboxes.forEach((chk, i) => {
        if (chk.checked) {
            selecionados++;
            if (selecionados > 1) {
                alert('Não é possível selecionar mais de 1 item.');
                chk.checked = false;
            } else {
                nome.value = BD[i].nome;
                quantidade.value = BD[i].quantidade;
                preco.value = BD[i].preco;
                
                descricao.value = BD[i].descricao;
                categoria.value = BD[i].categoria;
            }
        }
    });
}
document.getElementById('busca').addEventListener('input', function () {
    let termo = this.value.toLowerCase();
    let linhas = tabela.querySelectorAll("tr");

    linhas.forEach((linha, index) => {
        // Ignora o cabeçalho
        if (index === 0) return;

        let nomeProduto = linha.cells[1].textContent.toLowerCase();
        if (nomeProduto.includes(termo)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
});
