// Reading list functionality
let readingList = [];
let currentUser = null;
let books = [
  {
    id: 1,
    title: "Java Programming",
    author: "BookVerse community",
    genre: "fiction",
    format: "e-book",
    cover:
      "https://tse2.mm.bing.net/th/id/OIP._Lm_T3scKhVEVFC54gcRxwHaE8?pid=Api&P=0&h=180",
    rating: 4.8,
    description: "A book that can learn Java with full understanding.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "fiction",
    format: "pdf",
    cover:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=200&h=300&fit=crop",
    rating: 4.7,
    description:
      "A dystopian social science fiction novel and cautionary tale.",
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "non-fiction",
    format: "epub",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop",
    rating: 4.6,
    description:
      "Timeless lessons on wealth, greed, and happiness from one of the greatest writers in finance.",
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "mystery",
    format: "epub",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    rating: 4.3,
    description:
      "A woman's act of violence against her husband and her refusal to speak.",
  },
  {
    id: 5,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "romance",
    format: "epub",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
    rating: 4.9,
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist.",
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    format: "pdf",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
    rating: 4.5,
    description:
      "Epic science fiction novel set in the distant future amidst a feudal interstellar society.",
  },
  {
    id: 7,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "biography",
    format: "epub",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
    rating: 4.4,
    description:
      "The exclusive biography of Steve Jobs based on extensive interviews.",
  },
  {
    id: 8,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "fiction",
    format: "audiobook",
    cover:
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=200&h=300&fit=crop",
    rating: 4.2,
    description:
      "A magical novel about all the choices that go into a life well lived.",
  },
];

// Navigation functionality
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  });
}

// Search functionality
function searchBooks() {
  const searchTerm = document.getElementById("book-search").value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm)
  );
  displayBooks(filteredBooks);
  scrollToSection("library");
}

// Filter by category
function filterByCategory(category) {
  const filteredBooks = books.filter((book) => book.genre === category);
  displayBooks(filteredBooks);
  scrollToSection("library");
}

// Display books in grid
function displayBooks(booksToShow = books) {
  const booksGrid = document.getElementById("books-grid");
  booksGrid.innerHTML = "";

  booksToShow.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card grid-item";
    bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <p class="genre">${
                  book.genre.charAt(0).toUpperCase() + book.genre.slice(1)
                }</p>
                <div class="rating">★★★★★ (${book.rating})</div>
                <p class="description">${book.description}</p>
                <div class="book-actions">
                    <button class="read-btn" onclick="addToReadingList('${
                      book.title
                    }', '${book.author}')">Add to List</button>
                    <button class="read-btn" onclick="openReader('${
                      book.title
                    }', '${
      book.author
    }')" style="background: #3498db;">Read Now</button>
                </div>
            </div>
        `;
    booksGrid.appendChild(bookCard);
  });
}

// Reading list management
function addToReadingList(title, author) {
  const existingBook = readingList.find((book) => book.title === title);

  if (existingBook) {
    showNotification(`${title} is already in your reading list!`);
    return;
  }

  readingList.push({
    title: title,
    author: author,
    dateAdded: new Date().toLocaleDateString(),
  });

  updateReadingListDisplay();
  showNotification(`${title} added to reading list!`);
}

function removeFromReadingList(title) {
  readingList = readingList.filter((book) => book.title !== title);
  updateReadingListDisplay();
}

function updateReadingListDisplay() {
  const readingCount = document.getElementById("reading-count");
  const readingListItems = document.getElementById("reading-list-items");

  readingCount.textContent = readingList.length;

  if (readingList.length === 0) {
    readingListItems.innerHTML =
      "<p>Your reading list is empty. Start exploring our library!</p>";
  } else {
    readingListItems.innerHTML = "";
    readingList.forEach((book) => {
      const listItem = document.createElement("div");
      listItem.className = "reading-list-item";
      listItem.innerHTML = `
                <div>
                    <h4>${book.title}</h4>
                    <p>by ${book.author}</p>
                    <small>Added: ${book.dateAdded}</small>
                </div>
                <div>
                    <button onclick="openReader('${book.title}', '${book.author}')" style="margin-right: 10px; background: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Read</button>
                    <button onclick="removeFromReadingList('${book.title}')" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Remove</button>
                </div>
            `;
      readingListItems.appendChild(listItem);
    });
  }
}

function clearReadingList() {
  readingList = [];
  updateReadingListDisplay();
  showNotification("Reading list cleared!");
}

function startReading() {
  if (readingList.length === 0) {
    showNotification("Your reading list is empty!");
    return;
  }

  const firstBook = readingList[0];
  openReader(firstBook.title, firstBook.author);
  closeModal();
}

// E-book reader functionality
function openReader(title, author) {
  const readerModal = document.getElementById("reader-modal");
  const readerTitle = document.getElementById("reader-title");
  const readerContent = document.getElementById("reader-content");

  readerTitle.textContent = `${title} by ${author}`;

  // In a real implementation, this would load the actual book content
  readerContent.innerHTML = `
    `;

  readerModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeReader() {
  document.getElementById("reader-modal").style.display = "none";
  document.body.style.overflow = "auto";
}

function adjustFontSize(change) {
  const readerContent = document.getElementById("reader-content");
  const currentSize = parseFloat(
    window.getComputedStyle(readerContent).fontSize
  );
  const newSize = currentSize + change * 2;

  if (newSize >= 12 && newSize <= 24) {
    readerContent.style.fontSize = newSize + "px";
  }
}

function toggleTheme() {
  const readerContent = document.getElementById("reader-content");
  readerContent.classList.toggle("dark");
}

// Library filters
function setupLibraryFilters() {
  const genreFilter = document.getElementById("genre-filter");
  const formatFilter = document.getElementById("format-filter");
  const authorSearch = document.getElementById("author-search");

  function applyFilters() {
    let filteredBooks = books;

    const selectedGenre = genreFilter.value;
    const selectedFormat = formatFilter.value;
    const authorQuery = authorSearch.value.toLowerCase();

    if (selectedGenre) {
      filteredBooks = filteredBooks.filter(
        (book) => book.genre === selectedGenre
      );
    }

    if (selectedFormat) {
      filteredBooks = filteredBooks.filter(
        (book) => book.format === selectedFormat
      );
    }

    if (authorQuery) {
      filteredBooks = filteredBooks.filter((book) =>
        book.author.toLowerCase().includes(authorQuery)
      );
    }

    displayBooks(filteredBooks);
  }

  genreFilter.addEventListener("change", applyFilters);
  formatFilter.addEventListener("change", applyFilters);
  authorSearch.addEventListener("input", applyFilters);
}

// Authentication functionality
function showTab(tabName) {
  const tabs = document.querySelectorAll(".auth-tab");
  const tabBtns = document.querySelectorAll(".tab-btn");

  tabs.forEach((tab) => tab.classList.remove("active"));
  tabBtns.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName + "-tab").classList.add("active");
  event.target.classList.add("active");
}

function handleLogin(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelector('input[type="password"]').value;

  if (email && password) {
    currentUser = { email: email, name: email.split("@")[0] };
    showNotification("Login successful! Welcome back.");
    closeModal();
    updateLoginStatus();
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = event.target.querySelector('input[type="text"]').value;
  const email = event.target.querySelector('input[type="email"]').value;
  const password = event.target.querySelectorAll('input[type="password"]')[0]
    .value;
  const confirmPassword = event.target.querySelectorAll(
    'input[type="password"]'
  )[1].value;

  if (password !== confirmPassword) {
    showNotification("Passwords do not match!");
    return;
  }

  if (name && email && password) {
    currentUser = { email: email, name: name };
    showNotification("Account created successfully! Welcome to BookVerse.");
    closeModal();
    updateLoginStatus();
  }
}

function updateLoginStatus() {
  const loginBtn = document.querySelector(".login-btn");
  if (currentUser) {
    loginBtn.textContent = `Hi, ${currentUser.name}`;
    loginBtn.onclick = logout;
  } else {
    loginBtn.textContent = "Login";
    loginBtn.onclick = () => openModal("login-modal");
  }
}

function logout() {
  currentUser = null;
  updateLoginStatus();
  showNotification("Logged out successfully.");
}

// Modal functionality
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
}

// Notification system
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 300px;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Contact form functionality
function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const inquiryType = document.getElementById("inquiry-type").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    showNotification(
      "Thank you! Your message has been sent. We will respond within 24 hours."
    );
    document.getElementById("contact-form").reset();
  } else {
    showNotification("Please fill in all required fields.");
  }
}

// Navigation functionality
function handleNavigation() {
  const navLinks = document.querySelectorAll(
    ".nav-link:not(.reading-list-btn):not(.login-btn)"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
}

// ================= MOBILE MENU =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Link click → menu close
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});
 




// Newsletter subscription
function handleNewsletter() {
  const newsletterBtn = document.querySelector(".newsletter button");
  const newsletterInput = document.querySelector(".newsletter input");

  newsletterBtn.addEventListener("click", () => {
    const email = newsletterInput.value;
    if (email && email.includes("@")) {
      showNotification(
        "Thank you for subscribing! You will receive updates on new releases and exclusive offers."
      );
      newsletterInput.value = "";
    } else {
      showNotification("Please enter a valid email address.");
    }
  });
}

// Search functionality for header
function setupHeaderSearch() {
  const searchInput = document.getElementById("book-search");

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchBooks();
    }
  });
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Display initial books
  displayBooks();

  // Setup library filters
  setupLibraryFilters();

  // Setup header search
  setupHeaderSearch();

  // Reading list modal functionality
  const readingListBtn = document.querySelector(".reading-list-btn");
  const readingListModal = document.getElementById("reading-list-modal");
  const clearListBtn = document.getElementById("clear-list");
  const startReadingBtn = document.getElementById("start-reading");

  readingListBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openModal("reading-list-modal");
  });

  clearListBtn.addEventListener("click", clearReadingList);
  startReadingBtn.addEventListener("click", startReading);

  // Login modal functionality
  const loginBtn = document.querySelector(".login-btn");
  const loginModal = document.getElementById("login-modal");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!currentUser) {
      openModal("login-modal");
    }
  });

  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);

  // Close modals functionality
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  });

  // Contact form
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", handleContactForm);

  // Initialize navigation
  handleNavigation();
  toggleMobileNav();
  handleNewsletter();

  // Initialize displays
  updateReadingListDisplay();
  updateLoginStatus();
});

// Scroll effects
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Keyboard shortcuts for reader
document.addEventListener("keydown", function (e) {
  const readerModal = document.getElementById("reader-modal");
  if (readerModal.style.display === "block") {
    switch (e.key) {
      case "Escape":
        closeReader();
        break;
      case "+":
      case "=":
        adjustFontSize(1);
        break;
      case "-":
        adjustFontSize(-1);
        break;
      case "t":
      case "T":
        toggleTheme();
        break;
    }
  }
});

