// ================= BOOK DATA =================

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "fiction",
    format: "pdf",
    pdf: "Books/cpp_notes.pdf",   // make sure folder name case matches
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200",
    rating: 4.8,
    description: "A journey of dreams and destiny."
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    format: "pdf",
    pdf: "books/resume.pdf",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
    rating: 4.5,
    description: "Epic science fiction novel."
  }
];


// ================= NAVIGATION =================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if(section){
    section.scrollIntoView({ behavior: "smooth" });
  }
}


// ================= SEARCH =================

function searchBooks() {
  const searchInput = document.getElementById("book-search");
  if(!searchInput) return;

  const searchTerm = searchInput.value.toLowerCase();

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm)
  );

  displayBooks(filteredBooks);
  scrollToSection("library");
}


// ================= FILTER =================

function filterByCategory(category) {
  const filteredBooks = books.filter((book) => book.genre === category);
  displayBooks(filteredBooks);
  scrollToSection("library");
}


// ================= DISPLAY BOOKS =================

function displayBooks(booksToShow = books) {
  const booksGrid = document.getElementById("books-grid");
  if (!booksGrid) return;

  booksGrid.innerHTML = "";

  booksToShow.forEach((book) => {

    const bookCard = document.createElement("div");
    bookCard.className = "book-card grid-item";

    bookCard.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p class="author">${book.author}</p>
        <p class="genre">${book.genre}</p>
        <div class="rating">★★★★★ (${book.rating})</div>
        <p class="description">${book.description}</p>

        ${
          book.format === "pdf"
            ? `<a href="pdf-viewer.html?file=${book.pdf}" 
                 target="_blank" 
                 class="read-btn">
                 Read Now
               </a>`
            : `<button class="read-btn">Coming Soon</button>`
        }
      </div>
    `;

    booksGrid.appendChild(bookCard);
  });
}


// ================= READING LIST =================

let readingList = [];

function addToReadingList(bookId) {
  const book = books.find((b) => b.id === bookId);
  if (book && !readingList.includes(book)) {
    readingList.push(book);
    updateReadingCount();
  }
}

function updateReadingCount() {
  const counter = document.getElementById("reading-count");
  if(counter){
    counter.textContent = readingList.length;
  }
}


// ================= START READING =================

function startReading() {
  if (readingList.length === 0) {
    alert("Reading list is empty!");
    return;
  }

  const firstBook = readingList[0];

  if (firstBook.format === "pdf") {
    window.open(`pdf-viewer.html?file=${firstBook.pdf}`, "_blank");
  }
}


// ================= MOBILE MENU =================

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {
  displayBooks();
  updateReadingCount();
});