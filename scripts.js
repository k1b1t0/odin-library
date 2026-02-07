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

Book.prototype.info = function() {
    if (this.read) {
        return `${this.id}: ${this.title} by ${this.author}, ${this.pages} pages, read`
    }
    return `${this.id}: ${this.title} by ${this.author}, ${this.pages} pages, not read yet`
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    book.setId()
    myLibrary.push(book)
}

function displayAllBooks() {
    for (book of myLibrary) {
        console.log(book.info())
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
displayAllBooks()
