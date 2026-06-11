
function navigateTo(letter) {
    window.location.href = `Letter.html?letter=${letter}`;
}
const urlparams = new URLSearchParams(window.location.search);
const letter = urlparams.get('letter');
const display_letter = document.getElementById("letter-display");
if(letter){
    display_letter.textContent = letter;
}
else{
    display_letter.textContent = "A";
}