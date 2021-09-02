const searchBook = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showBooks(data.docs));
};

const showBooks = (books) => {
    const booksContainer = document.getElementById("books-container");
    books.forEach((book) =>{
       const bookItem = document.createElement("div")
       bookItem.classList.add("col");
       bookItem.innerHTML = `
       <div class="card h-100">
            <img height="100%" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <strong class="card-text">By- ${book.author_name}</strong>
                <p>First Publish Year- ${book.first_publish_year}</p>
            </div>
        </div>
       `
       booksContainer.appendChild(bookItem)
       console.log(book);
    })
}