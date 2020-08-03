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

    static updateBook(isbn) {
        const books = Store.getBooks();
        //console.log(books);

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                //console.log(book.isbn);
                //console.log(isbn);
                if (book.availability === "Booked") {
                    book.availability = "Available";
                    book.date = '';
                }
                else {
                    book.availability = "Booked";
                    //alert(UI.addDate());
                    book.date = UI.addDate();
                }

                localStorage.setItem('books', JSON.stringify(books));
                document.querySelector('#bookNow' + isbn).remove();
                UI.clearFields();
                UI.displayBooks();
            }
        });
    }
}

class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#myTable');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.owner}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td>${book.isbn}</td>
            <td>${book.availability}</td>
            <td>${book.date}</td>
            `
        //if (book.availability === "Booked" || book.availability === "Donated") {
        if (book.availability === "Donated") {
            //Emptying the button column
            row.innerHTML = row.innerHTML + `<td></td>`
        }
        else if (book.availability === "Booked") {
            row.innerHTML = row.innerHTML + `<td><button id=bookNow${book.isbn}>Return</button></td>`
        }
        else {
            row.innerHTML = row.innerHTML + `<td><button id=bookNow${book.isbn}>Book Now</button></td>`
        }

        list.appendChild(row);
    }

    static clearFields() {
        var table = document.querySelector('#myTable');
        table.innerHTML = ''
        //alert(table);
        //alert(table.row[i]);
    }

    static addDate() {
        var date = new Date();

        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var yyyy = date.getFullYear();

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (dd < 10) {
            dd = '0' + dd;
        }

        date = dd + '/' + mm + '/' + yyyy;
        return date;
    }
}

//Replace availability value in Store
document.querySelector('#myTable').addEventListener('click', (e) => {
    Store.updateBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    //Store.returnBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

//To display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

