const listStudent = document.querySelector('#container')

let content = document.createElement('div')
listStudent.appendChild(content)

let ul = document.createElement('ul')
content.appendChild(ul)

function renderBook(doc) {
    let dataStudent = doc.data()

    let li = document.createElement('li')
    let nome = document.createElement('span')
    let email = document.createElement('span')
    let data_nascimento = document.createElement('span')
    let cpf = document.createElement('span')
    let rg = document.createElement('span')
    let telefone_aluno = document.createElement('span')
    let telefone_responsavel = document.createElement('span')

    let exclude = document.createElement('div')
    exclude.textContent = 'X'

    li.setAttribute('data-id', doc.id)
    nome.textContent = `Aluno: ${dataStudent.nome}`
    email.textContent = `Email: ${dataStudent.email}`
    data_nascimento.textContent = `Data Nascimento: ${dataStudent.data_nascimento}`
    cpf.textContent = `CPF: ${dataStudent.cpf}`
    rg.textContent = `RG: ${dataStudent.rg}`
    telefone_aluno.textContent = `Tel (Aluno): ${dataStudent.telefone_aluno}`
    telefone_responsavel.textContent = `Tel (Responsável): ${dataStudent.telefone_responsavel}`


    li.appendChild(nome)
    li.appendChild(email)
    li.appendChild(data_nascimento)
    li.appendChild(cpf)
    li.appendChild(rg)
    li.appendChild(telefone_aluno)
    li.appendChild(telefone_responsavel)
    li.appendChild(exclude)

    exclude.addEventListener('click', (event) => {
        event.stopPropagation()


        let id = event.target.parentElement.getAttribute('data-id')

        db.collection("libri-collection").doc(id).delete()
            .then(() => { window.location.reload() })
    })

    ul.appendChild(li)
}

db.collection("libri-collection").get()
    .then((snapshot) => { 
        snapshot.docs.forEach(doc => {
            console.log(doc.data()) 
            renderBook(doc)
        });
    })