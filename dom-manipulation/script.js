
document.addEventListener('DOMContentLoaded', () => {
  const NewQuote = document.getElementById('newQuote');
  const DisplayQuotes = document.getElementById('quoteDisplay');
  

  const quotes =JSON.parse(localStorage.getItem('quotes'))|| [
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
    const randomQuote = quotes[randomSelection];
    DisplayQuotes.innerHTML = `<strong>category:</strong> ${randomQuote.category}<p>${randomQuote.text}</p>`;
  }


  NewQuote.addEventListener('click', showRandomQuote);

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

  

AddQuoteButton.addEventListener('click', createAddQuoteForm);
});

