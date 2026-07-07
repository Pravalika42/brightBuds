import { alphabetData } from "./data/read.js";
let letter = 'A';
showSentence();
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