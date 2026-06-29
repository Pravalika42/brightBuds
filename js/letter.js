import { alphabetData } from "./data.js";
const urlparams = new URLSearchParams(window.location.search);
const letter = urlparams.get('letter');
const display_letter = document.getElementById("letter-display");
const display_word = document.getElementById("word-display")
const nextwordfun = document.getElementById("nextword")
const words = alphabetData[letter].words;
const previouswordfun = document.getElementById("previousword")
const Letter_box = document.getElementById("Letter-box");
const word_image = document.getElementById("word-image")
Letter_box.style.backgroundColor = alphabetData[letter].colour;
Letter_box.style.color = "#ffffff"
let current_index = 0;
updatescreen();
if (letter) {
    display_letter.textContent = letter;
}
else {
    display_letter.textContent = "A";
}



nextwordfun.addEventListener("click", () => {
    if (current_index >= words.length - 1) {
    }
    else {
        current_index += 1;
        updatescreen();

    }
});
previouswordfun.addEventListener("click", () => {
    if (current_index <= 0) {

    }
    else {
        current_index -= 1;

        updatescreen();

    }
});
function updatescreen() {
    display_word.textContent = words[current_index].word
    word_image.src = words[current_index].image
    previouswordfun.style.visibility =
        current_index === 0 ? "hidden" : "visible";
    nextwordfun.style.visibility =
        current_index === words.length - 1 ? "hidden" : "visible";

    const utterance = new SpeechSynthesisUtterance(words[current_index].word);

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[2];
    speechSynthesis.speak(utterance);


}