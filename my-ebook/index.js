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
        <h2>Java Programming</h2>
        <p> "${title}" by ${author}.</p>
        
        <h1>परिचय</h1>
        <p>जावा की दुनिया में आपका स्वागत है! यह ई-बुक दुनिया की सबसे लोकप्रिय और बहुमुखी प्रोग्रामिंग भाषाओं में से एक, जावा का एक सीधा परिचय देने के लिए डिज़ाइन की गई है। जावा एक हाई-लेवल, क्लास-आधारित, ऑब्जेक्ट-ओरिएंटेड भाषा है जिसे यथासंभव कम से कम इम्प्लीमेंटेशन डिपेंडेंसी के साथ डिज़ाइन किया गया है। 
        <p>जावा का मूल सिद्धांत <strong>"एक बार लिखें, कहीं भी चलाएँ" (Write Once, Run Anywhere)</strong> है, जिसका अर्थ है कि कंपाइल किया गया जावा कोड किसी भी प्लेटफ़ॉर्म पर चल सकता है जो बिना दोबारा कंपाइल किए जावा को सपोर्ट करता है।</p>

<p>जावा का उपयोग मोबाइल एप्लिकेशन (विशेषकर एंड्रॉयड) से लेकर बड़े पैमाने के एंटरप्राइज़ सिस्टम, वैज्ञानिक कंप्यूटिंग और वेब डेवलपमेंट तक हर जगह होता है। इसकी शक्ति और स्केलेबिलिटी इसे पेशेवर डेवलपर्स के लिए एक महत्वपूर्ण भाषा बनाती है।</p>

<h3>अध्याय 1: मूल बातें</h3>
<p>कोड लिखना शुरू करने से पहले, आपको यह समझने की ज़रूरत है कि जावा कैसे काम करती है।</p>

<strong>आपका पहला प्रोग्राम: "Hello, World!"</strong>
<p>हर प्रोग्रामिंग यात्रा क्लासिक "Hello, World!" प्रोग्राम से शुरू होती है। यह सरल कोड आपके कंसोल पर "Hello, World!" प्रिंट करेगा।</p>
<pre>
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
</pre>
<p><strong>public class HelloWorld:</strong> यह लाइन HelloWorld नामक एक क्लास घोषित करती है। 
जावा में, सभी कोड क्लास के भीतर रहते हैं।<strong> public</strong> कीवर्ड का मतलब है कि इस क्लास को अन्य क्लास द्वारा एक्सेस किया जा सकता है।
</p>
<p><strong>public static void main(String[] args):</strong> यह main method है, जो हर जावा प्रोग्राम के लिए एंट्री पॉइंट है। जब आप अपना प्रोग्राम चलाते हैं, तो जावा वर्चुअल मशीन (JVM) एक्ज़ीक्यूशन शुरू करने के लिए इस सटीक मेथड को खोजती है।
</p>
<p><strong>System.out.println("Hello, World!");</strong>: यह कंसोल पर टेक्स्ट की एक लाइन प्रिंट करने का कमांड है। </p><p>डबल कोट्स के अंदर का टेक्स्ट एक <strong>String</strong> है। जावा में हर स्टेटमेंट का अंत एक सेमीकोलन (;) से होना चाहिए।
</P>
कंपाइलेशन पर एक नोट
इंटरप्रेटेड भाषाओं के विपरीत, जावा कोड को पहले bytecode नामक फॉर्मेट में कंपाइल किया जाता है। फिर इस bytecode को JVM द्वारा एक्ज़ीक्यूट किया जाता है। यही bytecode जावा को प्लेटफ़ॉर्म-इंडिपेंडेंट बनाता है।
<pre>
<h2>अध्याय 2: वेरिएबल्स और डेटा टाइप</h2>
एक वेरिएबल डेटा मानों को स्टोर करने के लिए एक कंटेनर है। जावा में, हर वेरिएबल का एक विशिष्ट डेटा टाइप होना चाहिए।

<h2>प्रिमिटिव डेटा टाइप</h2>
ये जावा में सबसे बुनियादी डेटा टाइप हैं।

<strong>int:</strong> 10, -5, या 1000 जैसी पूर्णांक संख्याएं (पूरे नंबर) स्टोर करता है।

<strong>double:</strong> 3.14 या -0.5 जैसी फ्लोटिंग-पॉइंट संख्याएं (दशमलव) स्टोर करता है।

<strong>boolean:</strong> या तो true या false स्टोर करता है।

<strong>char:</strong> 'a' या 'B' जैसे एक ही कैरेक्टर को स्टोर करता है।

<h2>नॉन-प्रिमिटिव डेटा टाइप</h2>
ये भाषा द्वारा पहले से परिभाषित नहीं होते हैं और इनमें क्लास, एरे और इंटरफेस शामिल हैं। शुरुआती लोगों के लिए सबसे आम String है।

String: "Hello" या "Java is fun" जैसे कैरेक्टर्स का एक क्रम स्टोर करता है।

उदाहरण:

// Declaring and initializing variables
int age = 30;
double price = 19.99;
boolean isJavaFun = true;
String greeting = "Hello, Java!";

System.out.println(age);
System.out.println(price);
System.out.println(isJavaFun);
System.out.println(greeting);

<h2>अध्याय 3: कंट्रोल फ्लो</h2>
कंट्रोल फ्लो स्टेटमेंट का उपयोग कंडीशंस के आधार पर कोड ब्लॉक को एक्ज़ीक्यूट करने या उन्हें दोहराने के लिए किया जाता है।

<h5>कंडीशनल स्टेटमेंट (if, else if, else)</h5>
ये स्टेटमेंट आपके प्रोग्राम को निर्णय लेने की अनुमति देते हैं।

int score = 85;

if (score >= 90) {
    System.out.println("You got an A!");
} else if (score >= 80) {
    System.out.println("You got a B.");
} else {
    System.out.println("You got a C or lower.");
}

<h5>लूपिंग कंस्ट्रक्ट्स (for, while)</h5>
लूप का उपयोग कोड के एक ब्लॉक को बार-बार एक्ज़ीक्यूट करने के लिए किया जाता है।

// A 'for' loop that prints numbers from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}

// A 'while' loop that does the same thing
int counter = 1;
while (counter <= 5) {
    System.out.println("Number: " + counter);
    counter++;
}

<h3>अध्याय 4: एरे और मेथड्स/h3>
<h4>एरे (Arrays)</h4>
एक एरे एक ही प्रकार के कई मानों को एक ही वेरिएबल में स्टोर करने के लिए उपयोग किया जाने वाला एक कंटेनर है। एरे का साइज़ निश्चित होता है और इसे बनाते समय निर्दिष्ट किया जाना चाहिए।

// एक पूर्णांक (integer) एरे घोषित और इनिशियलाइज़ करें
int[] numbers = {10, 20, 30, 40, 50};

// एरे के तत्वों को एक्सेस करें (इंडेक्स 0 से शुरू होता है)
System.out.println("पहला नंबर: " + numbers[0]);  // आउटपुट: 10
System.out.println("तीसरा नंबर: " + numbers[2]);  // आउटपुट: 30

// एरे पर लूप चलाएँ
for (int i = 0; i < numbers.length; i++) {
    System.out.println("एलिमेंट इंडेक्स " + i + ": " + numbers[i]);
}

<h5>मेथड्स (Methods)</h5>
एक मेथड कोड का एक ब्लॉक होता है जो केवल तभी चलता है जब उसे कॉल किया जाता है। आप मेथड्स में डेटा पास कर सकते हैं, जिन्हें पैरामीटर कहा जाता है। मेथड्स का उपयोग कुछ क्रियाएँ करने के लिए किया जाता है।

// एक साधारण मेथड
public void sayHello() {
    System.out.println("हैलो!");
}

// पैरामीटर वाला मेथड
public int addNumbers(int a, int b) {
    return a + b;
}

// मेन मेथड से मेथड्स को कॉल करना
// sayHello();
// int sum = addNumbers(5, 10);
// System.out.println("योग: " + sum);

<h2>अध्याय 5: ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP)</h2>
जावा एक ऑब्जेक्ट-ओरिएंटेड भाषा है। इसका मतलब है कि यह ऑब्जेक्ट की अवधारणा पर आधारित है, जिसमें डेटा और मेथड्स होते हैं।

<h6>क्लासेस (Classes):</h6> एक क्लास ऑब्जेक्ट बनाने के लिए एक ब्लूप्रिंट है। यह उन गुणों (डेटा) और व्यवहारों (मेथड्स) को परिभाषित करती है जो उसके ऑब्जेक्ट में होंगे।

<h6>ऑब्जेक्ट्स (Objects): </h6>एक ऑब्जेक्ट एक क्लास का एक इंस्टेंस है। जब आप एक ऑब्जेक्ट बनाते हैं, तो उसमें अपनी क्लास में परिभाषित सभी गुण और मेथड्स होते हैं।

<h4>OOP के सिद्धांत</h4>
<h6>इनहेरिटेंस (Inheritance):</h6> एक क्लास (subclass) को दूसरी क्लास (superclass) से गुणों और व्यवहारों को प्राप्त करने की अनुमति देता है। यह कोड के पुन: उपयोग (reusability) को बढ़ावा देता है।

<h6>पॉलीमॉर्फिज्म (Polymorphism):</h6> "कई रूप" होने की क्षमता। जावा में, पॉलीमॉर्फिज्म दो प्रकार का होता है: मेथड ओवरलोडिंग (एक ही नाम, अलग पैरामीटर) और मेथड ओवरराइडिंग (subclass में superclass के मेथड को फिर से परिभाषित करना)।

<h6>एनकैप्सुलेशन (Encapsulation):</h6> डेटा (वेरिएबल्स) और उस डेटा पर काम करने वाले मेथड्स को एक साथ एक इकाई (क्लास) में बंडल करने की प्रक्रिया। इसका उपयोग डेटा को सीधे एक्सेस से बचाने के लिए किया जाता है।

उदाहरण:

आइए एक Car क्लास और फिर एक Car ऑब्जेक्ट बनाएँ।

// एक 'Car' नामक क्लास
public class Car {
    String color;
    int year;

    public void startEngine() {
        System.out.println("इंजन शुरू हो रहा है।");
    }
}

अब, आइए इस क्लास से एक ऑब्जेक्ट बनाएँ।

public class Main {
    public static void main(String[] args) {
        // Car क्लास का एक ऑब्जेक्ट बनाएँ
        Car myCar = new Car();

        // ऑब्जेक्ट के गुणों को सेट करें
        myCar.color = "Red";
        myCar.year = 2023;

        // ऑब्जेक्ट के मेथड को कॉल करें
        System.out.println("मेरी कार एक " + myCar.year + " " + myCar.color + " कार है।");
        myCar.startEngine();
    }
}

<h3>अध्याय 6: कंस्ट्रक्टर और एक्सेप्शन हैंडलिंग</h3>
<h6>कंस्ट्रक्टर (Constructors)</h6>
एक कंस्ट्रक्टर एक विशेष प्रकार का मेथड होता है जिसका उपयोग ऑब्जेक्ट बनाते समय उसे इनिशियलाइज़ करने के लिए किया जाता है। इसका नाम हमेशा क्लास के नाम जैसा ही होता है।

public class Dog {
    String name;

    // कंस्ट्रक्टर
    public Dog(String dogName) {
        this.name = dogName;
    }

    public void bark() {
        System.out.println(name + " भौंकता है!");
    }
}

// मेन मेथड से कंस्ट्रक्टर का उपयोग
// Dog myDog = new Dog("रॉकी");
// myDog.bark();

<h6>एक्सेप्शन हैंडलिंग (Exception Handling)</h6>
एक्सेप्शन (अपवाद) प्रोग्राम के एक्ज़ीक्यूशन के दौरान होने वाली त्रुटियाँ हैं। जावा try...catch ब्लॉक का उपयोग करके इन त्रुटियों को संभालने के लिए एक तंत्र प्रदान करता है।

try {
    // कोड जो एक एक्सेप्शन उत्पन्न कर सकता है
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[10]); // यह एक ArrayIndexOutOfBoundsException देगा
} catch (Exception e) {
    // अगर कोई एक्सेप्शन उत्पन्न होता है, तो यह कोड चलेगा
    System.out.println("एक त्रुटि हुई: " + e.getMessage());
}

<h3>अध्याय 7: कलेक्शन फ्रेमवर्क</h3>
जावा का कलेक्शन फ्रेमवर्क ऑब्जेक्ट के ग्रुप को मैनेज करने के लिए इंटरफेस और क्लास का एक सेट है।

<h6>List: </h6>डुप्लीकेट एलिमेंट की अनुमति देता है और एलिमेंट को उनके इंडेक्स द्वारा एक्सेस किया जा सकता है। उदाहरण: ArrayList.

<h6>Set:</h6> डुप्लीकेट एलिमेंट की अनुमति नहीं देता है। उदाहरण: HashSet.

<h6>Map:</h6> key-value पेयर में डेटा स्टोर करता है। उदाहरण: HashMap.

import java.util.ArrayList;

// एक ArrayList का उपयोग करना
ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

System.out.println("फलों की लिस्ट: " + fruits);
System.out.println("पहला फल: " + fruits.get(0));

<h4>निष्कर्ष</h4>
आपने जावा प्रोग्रामिंग की दुनिया में अपने पहले कदम सफलतापूर्वक पूरे कर लिए हैं! हमने "Hello, World!" से लेकर वेरिएबल्स, कंट्रोल फ्लो,<br> OOP के सिद्धांतों और कलेक्शन तक की मूल बातें कवर की हैं। यह एक ऐसी यात्रा है जो तकनीक की दुनिया में कई दरवाजे खोलेगी।</pre>
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

