// book construtor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
 
// UI constructor

function UI() {

}

UI.prototype.addBookToList = function(book){
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
    // console.log(row);
}

UI.prototype.deleteBook = function(target) {
    if (target.className ==='delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.querySelector('#title').value ='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {
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

    ui.showAlert('Book removed!', 'success');

    e.preventDefault()});

