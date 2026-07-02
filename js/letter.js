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
    speak(words[current_index].word);
    if (current_index === alphabetData[letter].words.length - 1) {
        setTimeout(() => {
            // hide letter/word view, show sentence box
            document.querySelector(".letter-Box-Main").style.display = "none";
            document.querySelector(".sentence-box").style.display = "flex";
            showSentence();
        }, 5000);
    }
}
function showSentence() {
    let clickedCount = 0;
    let isFirst = true;
    let total_words = alphabetData[letter].sentence.length;
    const container = document.querySelector(".sentence-box");
    for (const index in alphabetData[letter].sentence) {
        const frame = document.createElement("div");
        frame.className = "sentence-word";
        frame.style.background = alphabetData[letter].colour;
        frame.style.position = "relative";
        frame.innerHTML = `
        <button class="word-reveal" >
        <strong>
            ${alphabetData[letter].sentence[index]}
            </strong>
        </button>`
        if (isFirst) {
            const hint = document.createElement("div");
            hint.className = "tap-hint";
            hint.textContent = "👆";
            frame.appendChild(hint);
            isFirst = false;
        }
        const button = frame.querySelector(".word-reveal");
        let alreadyClicked = false;
        frame.addEventListener("click", (e) => {
            button.style.opacity = 1;
            button.classList.add("pop");
            speak(alphabetData[letter].sentence[index]);
            const tapHint = document.querySelector(".tap-hint");
            if (tapHint) tapHint.style.display = "none";

            if (!alreadyClicked) {
                alreadyClicked = true;
                clickedCount++;
                if (clickedCount === total_words) {
                    setTimeout(() => {
                        showCelebration();
                    }, 5000);
                }
            }

        });
        container.appendChild(frame);
    }
}

function showCelebration() {
    document.querySelector(".sentence-box").style.display = "none";

    const dialog = document.querySelector(".congrats-box");
    document.getElementById("completed-letter").textContent = letter;
    dialog.showModal();
    setTimeout(() => {
        document.querySelector(".congrats-box").close();
        // navigate back to the ABC grid here
        window.location.href = "alphabets.html";
    }, 6000);
}

document.getElementById("closeCongrats").addEventListener("click", () => {
    document.querySelector(".congrats-box").close();
    // navigate back to the ABC grid here
    window.location.href = "alphabets.html";
});
function speak(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[2];
    speechSynthesis.speak(utterance);
}