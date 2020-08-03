//Book Class: To represent a book
class Book {
    constructor(title, owner, author, type, isbn, availability, date) {
        this.title = title;
        this.owner = owner;
        this.author = author;
        this.type = type;
        this.isbn = isbn;
        this.availability = availability;
        this.date = date;
    }
}

//UI Class: To handle UI tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.owner}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#bookform');
        container.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#owner').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#type').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: To handle storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: To display a book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: To add a book
document.querySelector('#bookform').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const owner = document.querySelector('#owner').value;
    const author = document.querySelector('#author').value;
    const type = document.querySelector('#type').value;
    const isbn = document.querySelector('#isbn').value;
    const availability = "Available";
    const date = "";
    const bookNow = "";

    //Validate
    if (title === '' || author === '' || type === '' || owner === '' || isbn === '') {
        UI.showAlert('Please fill in all fields!', 'alert-danger');
    }
    else {
        //Instantiate Book
        const book = new Book(title, owner, author, type, isbn, availability, date, bookNow);

        //Add book to UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //Show success message
        UI.showAlert('Book Added!', 'alert-success');

        //Clear fields
        UI.clearFields();
    }
});

//Event: To remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show success message
    UI.showAlert('Book Removed!', 'alert-success');
});