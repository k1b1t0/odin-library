function book(title, author, pages, read) {
    if (!new.target) {
        throw Error("need 'use' operator")
    }
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read`
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
    }
}

const theHobbit = new book("The Hobbit", "J.R.R. Tolkien", 295, false)
console.log(theHobbit.info())