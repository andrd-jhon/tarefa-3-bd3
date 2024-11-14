

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


