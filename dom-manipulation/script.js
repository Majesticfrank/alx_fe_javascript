document.addEventListener('DOMContentLoaded', ()=>{
   
     const NewQuote =document.getElementById('newQuote');
     const DisplayQuotes =document.getElementById('quoteDisplay');
      const quotes = [
         {category:"love", text:"Love conquers all."},
         {category:"love", text:"you know you're in love when you can't fall asleep because reality is finally better than your dreams-Dr Seuss"},
         {category:"love", text:"Love is composed of a single soul inhabiting two bodies- Aristole"},
         {category:"motivation", text:"just do it"},
         {category:"motivation", text:"i'm not arguing i'm just explaining why i'm right"},
         {category:"motivation", text:"Behind  every great man is a woman rolling her eyes-Jim carrey "},
         {category:"humor",text:"i'm on a seafood diet,I see food and i eat it "},
         {category:"motivation", text:"The best way to get started is to quit talking and begin doing- walt Disney"},
         {category:"motivation", text:"success is not final,failure is not fata:it is the courage to continue that counts-Winston Churchill"},
         {category:"motivation", text:"Dont't wartch the clock, do what it does keep going- sam levenson"}
      ];


     function addQuotes(){
      const randomposition =Math.floor(Math.random() * quotes.length);
      const randomquote =quotes[randomposition];
      DisplayQuotes.innerHTML = `
      Category: ${randomquote.category}
       <p>${randomquote.text}</p>
  `;
   }


    NewQuote.addEventListener('click', addQuotes);
});