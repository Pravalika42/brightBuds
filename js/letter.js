import { alphabetData } from "./data.js";
const urlparams = new URLSearchParams(window.location.search);
const letter = urlparams.get('letter');
const display_letter = document.getElementById("letter-display");
const display_word = document.getElementById("word-display")  
const nextwordfun = document.getElementById("nextword")
const words = alphabetData[letter].words;
const previouswordfun = document.getElementById("previousword")
const Letter_box = document.getElementById("Letter-box");
Letter_box.style.backgroundColor=alphabetData[letter].colour;
Letter_box.style.color = "#ffffff"
if(letter){
    display_letter.textContent = letter;
}
else{
    display_letter.textContent = "A";
}

 display_word.textContent = words[0].word
let current_index = 0; 
 nextwordfun.addEventListener("click",() =>  {
    if(current_index >= words.length-1){
    }
    else{
     current_index+=1;
  updatescreen();
   
    }
 });
 previouswordfun.addEventListener("click",()=> {
    if(current_index <= 0){
    
    }
    else{
        current_index-=1; 
  
    updatescreen();
   
    }  
});
function updatescreen () {
display_word.textContent = words[current_index].word 
  if(current_index==0){
    nextwordfun.style.visibility = 'visible'
    previouswordfun.style.visibility ='hidden'
  } 
  else if(current_index==words.length-1){
 nextwordfun.style.visibility = 'hidden'
    previouswordfun.style.visibility ='visible'
  }
  else{
   
  }
  
}