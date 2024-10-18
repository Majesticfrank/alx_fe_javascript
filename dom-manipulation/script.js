document.addEventListener('DOMContentLoaded', function(){
   
     const NewQuote =document.getElementById('newQuote');
     const DisplayQuotes =document.getElementById('quoteDisplay');
   const quotes=[
      "Believe you can and you're halfway there. – Theodore Roosevelt",
"Do what you can, with what you have, where you are. – Theodore Roosevelt",
"Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
"What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
"In the middle of every difficulty lies opportunity. – Albert Einstein",
"Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
"Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
"It always seems impossible until it’s done. – Nelson Mandela",
"You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
"Act as if what you do makes a difference. It does. – William James"

   ];


     function addQuotes(){
      const randomposition =Math.floor(Math.random() * quotes.length);
      const randomquote =quotes[randomposition];
      DisplayQuotes.innerHTML=randomquote;
   }


    NewQuote.addEventListener('click', addQuotes);
});