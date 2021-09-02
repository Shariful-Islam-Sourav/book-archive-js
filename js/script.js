//Toggle Spinner
const toggleSpinner = (displayProp) => {
  document.getElementById("spinner").style.display = displayProp;
};
//Toggle Book Items
const toggleBookItems = (displayProp) => {
  document.getElementById("Books-container-section").style.display =
    displayProp;
};
//Toggle Error Message
const toggleErrorMsg = (displayProp) => {
  document.getElementById("error-msg").style.display = displayProp;
};
//Search items
const searchBook = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  toggleSpinner("block");
  toggleBookItems("none");
  toggleErrorMsg("none");
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data.docs));
  searchInput.value = "";
};
//Books Overall Results
const showBooks = (books) => {
  //Item unavailable error handling
  if (books.length === 0) {
    toggleErrorMsg("block");
  }
  const totalResults = document.getElementById("total-results");
  const booksContainer = document.getElementById("books-container");
  booksContainer.textContent = "";
  totalResults.textContent = "";
  //Showing Total Search Results
  const showAmountOfBooks = document.createElement("h3");
  showAmountOfBooks.classList.add("text-success");
  showAmountOfBooks.innerText = `Showing ${books.length} books`;
  totalResults.appendChild(showAmountOfBooks);
  //Showing Book Info
  books.forEach((book) => {
    //Author Name Error Handling
    const authorName =
      book.author_name?.[0] === undefined
        ? "Author Unavailable"
        : book.author_name[0];
    //Publish Year Error Handling
    const publishYear =
      book.first_publish_year === undefined
        ? "Year Not Found"
        : book.first_publish_year;
    //Book Coverage Error Handling
    const bookCover =
      book.cover_i === undefined
        ? "images/notAvailable.jpg"
        : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const bookItem = document.createElement("div");
    bookItem.classList.add("col");
    bookItem.innerHTML = `
         <div class="card h-100">
              <img height="100%" src=${bookCover} class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <strong class="card-text">By- ${authorName}</strong>
                  <p>First Publish Year- ${publishYear}</p>
              </div>
          </div>
         `;
    booksContainer.appendChild(bookItem);
  });
  toggleSpinner("none");
  toggleBookItems("block");
};

// ----------------------------END OF CODE-----------------------------