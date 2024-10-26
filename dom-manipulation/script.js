
document.addEventListener('DOMContentLoaded', () => {
  const NewQuote = document.getElementById('newQuote');
  const DisplayQuotes = document.getElementById('quoteDisplay');
 
  const quotes =JSON.parse(localStorage.getItem('quotes')) || [
    { category: "love", text: "Love conquers all." },
    { category: "Motivation", text: "The only way to do great work is to love what you do. — Steve Jobs" },
    { category: "Motivation", text: "Don’t watch the clock; do what it does. Keep going. — Sam Levenson" },
    { category: "Motivation", text: "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill" },
    { category: "love", text: "Love is not about how much you say 'I love you,' but how much you prove that it’s true. — Anonymous" },
    { category: "love", text: "We are most alive when we're in love. — John Updike" },
    { category: "success", text: "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau" }
  ];


  
  function saveQuotes(){
    localStorage.setItem('quotes',JSON.stringify(quotes));
  }

  function showRandomQuote() {
    const randomSelection = Math.floor(Math.random() * quotes.length);
    return  quotes[randomSelection];
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


  NewQuote.addEventListener('click', ()  => showQuotes([showRandomQuote()]));

  const AddQuoteButton = document.getElementById('addQuote');




  
function  createAddQuoteForm(){
  const NewQuoteText= document.getElementById('newQuoteText').value;
  const NewQuoteCategory= document.getElementById('newQuoteCategory').value;


if(NewQuoteText.trim()==="" || NewQuoteCategory.trim()===""){
  alert("please Enter both Text and category");
  return; 
}


const newQuote={
  text:NewQuoteText,
  category:NewQuoteCategory
};
 quotes.push(newQuote);
 saveQuotes();

const quoteList = document.getElementById('createQuoteForm');
const listItem = document.createElement('li');

listItem.textContent = `${newQuote.text} - ${newQuote.category}`;
quoteList.appendChild(listItem);

document.getElementById('newQuoteText').value='';
document.getElementById('newQuoteCategory').value='';
}



function exportToJson() {
  const json = JSON.stringify(quotes, null, 2);


  const blob = new Blob([json], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");


  a.href = url;
  a.download = "quotes.json";


  a.click();


  URL.revokeObjectURL(url);
}



function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
const categories = ["love", "Motivation", "success","Happiness", "Life"];

function populateCategories(categories){
  const categoryFilter = document.getElementById('categoryFilter');
  categories.forEach(category => {

    const option = document.createElement('option');
    option.value = category.toLowerCase();
    option.textContent=category;
    categoryFilter.appendChild(option);
    
  });

}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = quotes.filter(
    (quote) =>
      selectedCategory === 'all' || quote.category.toLowerCase() === selectedCategory
  );

  showQuotes(filteredQuotes.map((quote) => ({ ...quote })));
}

populateCategories(categories);
document.getElementById("exportBtn").addEventListener("click", exportToJson);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);
showQuotes([showRandomQuote()]);

AddQuoteButton.addEventListener('click', createAddQuoteForm);
});

