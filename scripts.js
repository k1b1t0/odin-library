const body = document.querySelector('body')
const shelf = document.querySelector('.shelf')
const dialog = document.querySelector('dialog')
const dialogCloseBtn = document.querySelector('.close-button')
const form = document.querySelector('form')
const myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

Book.prototype.setId = function() {
    this.id = crypto.randomUUID()
}

Book.prototype.setRead = function() {
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    book.setId()
    myLibrary.push(book)
}

function createCard(current) {
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

    const btnDiv = document.createElement('div')
    btnDiv.classList.add('btns')

    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.textContent = 'delete'
    btnDiv.appendChild(delBtn)

    const readBtn = document.createElement('button')
    readBtn.classList.add('read')
    readBtn.textContent = 'read'
    btnDiv.appendChild(readBtn)

    card.appendChild(btnDiv)

    card.dataset.index = current.id
    return card
}

function displayAllBooks() {
    shelf.innerHTML = ''
    myLibrary.forEach(function(current, index, array) {
        const card = createCard(current)
        shelf.appendChild(card)
    })
}

shelf.addEventListener('click', (e) => {
    if (e.target.matches('.delete')) {
        const card = e.target.closest(`.card`)
        const id = card.dataset.index
        const removeId =myLibrary.findIndex(b => b.id === id)
        shelf.removeChild(card)
        myLibrary.splice(removeId, 1)
    } else if (e.target.matches('.read')) {
        const card = e.target.closest(`.card`)
        const id = card.dataset.index
        const book = myLibrary.find(b => b.id === id)
        if (book) {
            book.setRead()
        }
        displayAllBooks()
    }
})

const addBtn = document.createElement('button')
addBtn.textContent = "Add book"
addBtn.classList.add("add-button")
body.appendChild(addBtn)

addBtn.addEventListener('click', () => {
    dialog.showModal()
})

const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const errorMessage = document.querySelector('#error-message')

function validatePages() {
    if (pagesInput.validity.valid) {
        errorMessage.textContent = ''
    } else {
        if (pagesInput.validity.valueMissing) {
            errorMessage.textContent = 'Please input pages'
        } else if (pagesInput.validity.rangeUnderflow) {
            errorMessage.textContent = 'Pages must be a positive integer'
        }
    }
}

pagesInput.addEventListener('input', validatePages)
authorInput.addEventListener('input', () => {
    if (authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("Need author name")
    } else {
        authorInput.setCustomValidity("")
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!form.reportValidity()) {
        validatePages()
        return
    }
    

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    addBookToLibrary(data.title, data.author, data.pages, data.read)
    shelf.appendChild(createCard(myLibrary[myLibrary.length-1]))

    form.reset()
    dialog.close()
})

dialogCloseBtn.addEventListener('click', () => {
    dialog.close()
})

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary("The Hobbit", "J.R.R. sTolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
displayAllBooks()
