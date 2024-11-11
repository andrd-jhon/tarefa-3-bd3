
// // Função para adicionar um aluno à tabela
// function adicionarAluno(event) {
//     event.preventDefault(); // Evitar o envio do formulário

//     // Captura os dados do formulário
//     const codTurma = document.getElementById('cod_turma').value;
//     const nome = document.getElementById('nome').value;
//     const cpf = document.getElementById('cpf').value;
//     const rg = document.getElementById('rg').value;
//     const telefoneAluno = document.getElementById('telefone_aluno').value;
//     const telefoneResponsavel = document.getElementById('telefone_responsavel').value;
//     const email = document.getElementById('email').value;
//     const dataNascimento = document.getElementById('data_nascimento').value;

//     // Criação de uma nova linha na tabela
//     const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
//     const novaLinha = tabela.insertRow();

//     // Inserção de células com os dados
//     novaLinha.innerHTML = `
//         <td>${codTurma}</td>
//         <td>${nome}</td>
//         <td>${cpf}</td>
//         <td><button class="excluir-btn" onclick="excluirAluno(this)">Excluir</button></td>
//     `;

//     // Limpar o formulário após o cadastro
//     document.getElementById('formCadastro').reset();
// }

// // Função para excluir um aluno da tabela
// function excluirAluno(botao) {
//     const linha = botao.closest('tr');
//     linha.remove();
// }

// // Adiciona um evento de submit ao formulário para chamar a função de adicionar aluno
// document.getElementById('formCadastro').addEventListener('submit', adicionarAluno);

const listBook = document.querySelector('#book-list');
function renderList(doc) {
    
    let li = document.createElement('li');
    let autor = document.createElement('span');
    let titulo = document.createElement('span');
    let excluir = document.createElement('div');

    // console.log(doc.id);
    li.setAttribute('data-id', doc.titulo);
    autor.textContent = doc.autor;
    titulo.textContent = doc.titulo;

    li.appendChild(titulo);
    li.appendChild(autor);

    listBook.appendChild(li);

}

/* LISTA OS DADOS DO COLEÇÃO DO FIRESTORE */
db.collection('libri-collection')
    .get()
    .then((snapshot)=>{
        console.log('TESTE: ' + snapshot.docs)
        snapshot.docs.array.forEach(
            doc =>{
                console.log(doc.id);
                renderList(doc.data());
            }
        )
    });

    /* INSERÇÃO DE DADOS */
    const form = document.querySelector('#add-book-form');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();        
        // alert('Formulário funcionando!');
        db.collection('libri-collection').add({
            autor: form.autor.value,
            titulo: form.titulo.value
        }).then(()=>{
            form.autor.value = '';
            form.titulo.value = '';
            window.location.reload();
        });

    });


