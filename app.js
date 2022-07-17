// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// BookListUI Constructor
function UI() {

}

UI.prototype.addBookToList = function(book) {
    const UIlist = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `<td> ${book.title} </td>
                    <td> ${book.author} </td>
                    <td> ${book.isbn} </td>
                    <td> <a href="#"> x </a> </td>`
    UIlist.appendChild(row);
}

UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";    
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

UI.prototype.showAlert = function(msg, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function() {
        div.remove();
    }, 3000);
}

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


 // Event Listeners
document.getElementById('book-form').addEventListener('submit', addBook);


function addBook(e) {
    // Getting the information about the book
    const UItitle = document.getElementById("title"),       
        UIauthor = document.getElementById("author"),
        UIisbn = document.getElementById("isbn");

    const title = UItitle.value,       
        author = UIauthor.value,
        isbn = UIisbn.value;
    
    const book = new Book(title, author, isbn);
    
    const ui = new UI();

    // Validation
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        // Show success
        ui.showAlert('Book added', 'success');
        ui.clearFields();
    }

    e.preventDefault();
}


document.getElementById('book-list').addEventListener('click', deleteBook);

function deleteBook(e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert("Book removed!", 'success');
    e.preventDefault();
}