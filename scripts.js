const shelf = document.querySelector('.shelf')
const myLibrary = [] 

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("need 'use' operator")
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.setId = function() {
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    book.setId()
    myLibrary.push(book)
}

function displayAllBooks() {
    myLibrary.forEach(function(current, index, array) {
        const card = document.createElement('div')
        card.classList.add('card')

        const id = document.createElement('p')
        id.textContent = current.id
        id.style.fontSize = 'small'
        card.appendChild(id)

        const title = document.createElement('h1')
        title.textContent = current.title
        card.appendChild(title)

        const author = document.createElement('p')
        author.textContent = current.author
        card.appendChild(author)

        const pages = document.createElement('p')
        pages.textContent = current.pages + ' page(s)'
        card.appendChild(pages)

        const read = document.createElement('p')
        if (current.read) {
            read.textContent = "read"
            read.style.color = 'green'
        } else {
            read.textContent = "not read yet"
            read.style.color = 'red'
        }
        card.appendChild(read)

        const delBtn = document.createElement('button')
        delBtn.textContent = 'delete'
        card.appendChild(delBtn)

        card.dataset.index = current.id
        shelf.appendChild(card)
    })
}

shelf.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const card = e.target.closest(`.card`)
        const id = card.dataset.id
        shelf.removeChild(card)
        myLibrary.splice(id, 1)
    }
})

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
displayAllBooks()
