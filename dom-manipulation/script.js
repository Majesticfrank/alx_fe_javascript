document.addEventListener('DOMContentLoaded', ()=>{
  const AddQuotebutton= document.getElementById('addQuote');
  const NewQuote = document.getElementById('newQuote');
  const DisplayQuotes=document.getElementById('quoteDisplay');
  quotes =[{Category:"love", text:"Love conquers all."},
    { Category: "Motivation", text:"The only way to do great work is to love what you do. — Steve Jobs"},
    {Category: "Motivation", text: "Don’t watch the clock; do what it does. Keep going. — Sam Levenson"},
    {Category: "Motivation", text:"Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill"},
    {Category: "love", text: "Love is not about how much you say 'I love you,' but how much you prove that it’s true. — Anonymous"},
    {Category:"love", text:"We are most alive when we're in love. — John Updike"},
    {Category:"success",text: "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau"}
  ];
  
  
function showRandomQuote(){
  const randomSelection =Math.floor(Math.random() * quotes.length);
  const randomquote =quotes[randomSelection];
  DisplayQuotes.innerHTML = `Category: ${randomquote.Category}<p>${randomquote.text}</p>`;
}
NewQuote.addEventListener('click',showRandomQuote);


function addQuote(){
  const NewQuoteText= document.getElementById('newQuoteText').value;
  const NewQuoteCategory = document.getElementById('newQuoteCategory').value;

if(NewQuoteText.trim()===""|| NewQuoteCategory===""){
  alert("please Enter a category and a text!");
  return;
}
const newQuote = {
  text: NewQuoteText,
  Category: NewQuoteCategory
};
quotes.push(newQuote);

document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";




}

AddQuotebutton.addEventListener('click', addQuote);

});



