

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook(book) {
        let books = JSON.parse(localStorage.getItem("books"));
        if (books === null) {
            books = [book];
        } else {
            books.push(book);
        }
        localStorage.setItem("books", JSON.stringify(books));
    }

    showMessage(msg, col) {
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(msg));

        const form = document.getElementById("book-form");
        document.querySelector(".container").insertBefore(div, form);
        div.style.backgroundColor = col;
        div.style.color = 'white';
        setTimeout(function () {
            div.remove();
        }, 3000);
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    showBooks() {
        const books = JSON.parse(localStorage.getItem("books"));
        if (books !== null) {
            for (let i = 0; i < books.length; i++) {
                const newTr = document.createElement("tr");
                newTr.innerHTML += `<th> ${books[i].title}</th>
            <th> ${books[i].author}</th>
            <th> ${books[i].isbn} </th>
            <th> <a href="#" class="delete-button" > x </a> </th>`;

                document.getElementById("book-list").appendChild(newTr);
            }
        }
    }

    addBookToUI(book) {
        const newTr = document.createElement("tr");
        newTr.innerHTML += `<th> ${book.title}</th>
    <th> ${book.author}</th>
    <th> ${book.isbn} </th>
    <th> <a href="#" class="delete-button" > x </a> </th>`;

        document.getElementById("book-list").appendChild(newTr);
    }
}


const ui = new UI();
ui.showBooks();

// Add the event listener for the submit
document.querySelector("#book-form").addEventListener("submit", function (e) {

    const UItitle = document.getElementById("title"),
        UIauthor = document.getElementById("author"),
        UIisbn = document.getElementById("isbn");

    const title = UItitle.value,
        author = UIauthor.value,
        isbn = UIisbn.value;

    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showMessage("Please fill al the fields!", "red");
        ui.clearFields();
    } else {
        const book = new Book(title, author, isbn);

        ui.addBook(book);
        ui.addBookToUI(book);
        ui.showMessage("Book added!", "green");
        ui.clearFields();

    }
    e.preventDefault();
})

// Event listener for deleting the book 

document.querySelector("#book-list").addEventListener("click", function (e) {
    if (e.target.className === 'delete-button') {
        e.target.parentElement.parentElement.remove();
        const isbn = String(e.target.parentElement.parentElement.children[2].textContent).trim();
        let books = JSON.parse(localStorage.getItem("books"));
        for (let i = 0; i < books.length; i++) {
            if (books[i].isbn == isbn) {
                books.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("books", JSON.stringify(books));

        const ui = new UI();

        ui.showMessage("Book removed!", "purple");
    }
    e.preventDefault();
}) 