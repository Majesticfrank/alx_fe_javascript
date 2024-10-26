document.addEventListener('DOMContentLoaded', () => {
  const NewQuoteButton = document.getElementById('newQuote');
  const DisplayQuotes = document.getElementById('quoteDisplay');
  const AddQuoteButton = document.getElementById('addQuote');
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = ["love", "Motivation", "success", "Happiness", "Life"];

  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { category: "love", text: "Love conquers all." },
    { category: "Motivation", text: "The only way to do great work is to love what you do. — Steve Jobs" },
    { category: "Motivation", text: "Don’t watch the clock; do what it does. Keep going. — Sam Levenson" },
    { category: "Motivation", text: "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill" },
    { category: "love", text: "Love is not about how much you say 'I love you,' but how much you prove that it’s true. — Anonymous" },
    { category: "love", text: "We are most alive when we're in love. — John Updike" },
    { category: "success", text: "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau" }
  ];

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  function showRandomQuote() {
    const randomSelection = Math.floor(Math.random() * quotes.length);
    return quotes[randomSelection];
  }

  function showQuotes(quoteArray) {
    DisplayQuotes.innerHTML = quoteArray
      .map(
        (quote) => `
          <strong>Category:</strong> ${quote.category}
          <p>${quote.text}</p>
        `
      )
      .join('');
  }

  NewQuoteButton.addEventListener('click', () => showQuotes([showRandomQuote()]));

  function createAddQuoteForm() {
    const NewQuoteText = document.getElementById('newQuoteText').value;
    const NewQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (NewQuoteText.trim() === "" || NewQuoteCategory.trim() === "") {
      alert("Please enter both text and category.");
      return;
    }

    const newQuote = { text: NewQuoteText, category: NewQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    showQuotes([newQuote]);

    const quoteList = document.getElementById('createQuoteForm');
    const listItem = document.createElement('li');
    listItem.textContent = `${newQuote.text} - ${newQuote.category}`;
    quoteList.appendChild(listItem);

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally post the new quote to a mock server
    postNewQuote(newQuote);
  }

  async function fetchQuotesFromServer() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      const data = await response.json();

      const newQuotes = data.map(post => ({
        category: "Motivation",
        text: post.title
      }));

      quotes = mergeQuotes(quotes, newQuotes);
      saveQuotes();
      showQuotes(quotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  }

  async function postNewQuote(newQuote) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuote),
      });

      const result = await response.json();
      console.log('New quote added:', result);
    } catch (error) {
      console.error('Error adding new quote:', error);
    }
  }

  function mergeQuotes(localQuotes, serverQuotes) {
    const localMap = new Map(localQuotes.map(q => [q.text, q]));
    serverQuotes.forEach(quote => localMap.set(quote.text, quote));
    return Array.from(localMap.values());
  }

  function exportToJson() {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showQuotes(quotes);
      } catch (error) {
        alert('Invalid JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function populateCategories(categories) {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.toLowerCase();
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = quotes.filter(
      (quote) =>
        selectedCategory === 'all' || quote.category.toLowerCase() === selectedCategory
    );
    showQuotes(filteredQuotes);
  }

  populateCategories(categories);
  document.getElementById('exportBtn').addEventListener('click', exportToJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  categoryFilter.addEventListener('change', filterQuotes);
  showQuotes([showRandomQuote()]);

  fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 15000);

  AddQuoteButton.addEventListener('click', createAddQuoteForm);
});
