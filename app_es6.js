class Book {
    constructor(title, author, isbn) {
        this.title= title;
        this.author= author;
        this.isbn= isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.querySelector('#book-list');
        // create tr element
        const row = document.createElement('tr');
        // insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='delete'>X</a></td>
        `
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // time out after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className ==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books =[];
        }   else {
            books = JSON.parse(localStorage.getItem('books'));
        }
            
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // add to ui
            ui.addBookToList(book);
        })

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

// Dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// instantiate ui object
const ui = new UI();
// Event listners

document.querySelector('#book-form').addEventListener('submit',
function(e){
    // get form values
    const 
        title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    console.log(title,author,isbn);

    
    // validate
    if ([title, author, isbn].includes('')){
        // Error Alert
        ui.showAlert('Please fill all fields', 'error');
        

    }
        else {

            // instantiate a book
            const book = new Book(title, author, isbn);
        
        
        
            // add book to list
            ui.addBookToList(book);
            // add to local storage
            Store.addBook(book);

            ui.showAlert('Book added!', 'success');
        
            // clear fields 
            ui.clearFields();
        
            console.log(book);
        }


    e.preventDefault()});

// delete event listner
document.querySelector('#book-list').addEventListener('click',
function(e) {

    // delete row
    ui.deleteBook(e.target);

    // remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book removed!', 'success');

    e.preventDefault()});
