submitButton = document.getElementById('submit-button');
addToBooksContainer = document.querySelector('.books');

let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = (isRead == null) ? false : true;
  }

  formInnerHTML() {
    let innerHTMLString = '';
    innerHTMLString += `    
      <div class="book-name">${this.title}</div>
      <div class="book-author">${this.author}</div>
      <div class="book-pages">${this.pages} pages</div>
      <div class="book-buttons">
    `;
    if (this.isRead == true) {
      innerHTMLString += `
        <button class="book-button" id="isReadButton">
          <img src="./media/images/seen.svg" alt="" class="book-button-img">
          <img src="./media/images/remove-seen.svg" alt="" class="book-button-img">
        </button>
      `;
    } else {
      innerHTMLString += `
        <button class="book-button" id="isReadButton">
          <img src="./media/images/unseen.svg" alt="" class="book-button-img">
          <img src="./media/images/seen.svg" alt="" class="book-button-img">
        </button>
      `;
    }
    innerHTMLString += `          
      <button class="book-button" id="deleteButton">
          <img src="./media/images/delete.svg" alt="" class="book-button-img">
        </button>
      </div>
      `;

    return innerHTMLString;
  }
}

submitButton.addEventListener('click', () => {
  addBookToLibrary();
  displayLibrary();
});

function addBookToLibrary() {
  let usernameForm = document.getElementById("book-info");
  let fd = new FormData(usernameForm);

  const newBook = new Book(fd.get('title'), fd.get('author'),
    fd.get('pages'), fd.get('is-read'))

  myLibrary.push(newBook);
}

function displayLibrary() {
  addToBooksContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookHTML = document.createElement('div');
    bookHTML.classList.add('book');

    bookHTML.innerHTML = book.formInnerHTML();
    addToBooksContainer.appendChild(bookHTML);

    addListeners(book, bookHTML, index);
  });
}

function addListeners(book, bookHTML, index) {
  isReadButton = bookHTML.querySelector('#isReadButton');
  deleteButton = bookHTML.querySelector('#deleteButton');

  isReadButton.addEventListener('click', () => {
    book.isRead = !book.isRead;
    bookHTML.innerHTML = book.formInnerHTML();
    addListeners(book, bookHTML, index);
  });

  deleteButton.addEventListener('click', () => {
    addToBooksContainer.removeChild(bookHTML);
    myLibrary.splice(index, 1);
  });
}

// IIFE for example book
(function () {
  const exampleBook = new Book('Example Book', 'James G.', '123', null)
  myLibrary.push(exampleBook);
  displayLibrary();
})();