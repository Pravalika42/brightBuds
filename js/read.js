import { readingData } from "./data/scentences.js";
let index = 0;
let isFirst = true;
 let celebrationTimeout
loadSentence(index);
function loadSentence(index) {
    let clickedCount = 0;
    let total_words = readingData[index].words.length;
    const container = document.querySelector(".sentence-box");
    container.innerHTML = "";
    container.style.display = "flex";
    readingData[index].words.forEach((word) => {
        const frame = document.createElement("div");
        frame.className = "sentence-word";
        frame.style.background = "#FFBF00";
        frame.style.position = "relative";
        frame.innerHTML = `
        <button class="word-reveal" >
        <strong>
            ${word}
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
            speak(word);
            const tapHint = document.querySelector(".tap-hint");
            if (tapHint) tapHint.style.display = "none";

            if (!alreadyClicked) {
                alreadyClicked = true;
                clickedCount++;
                if (clickedCount === total_words) {
                    let sentence = readingData[index].speech;
                  setTimeout(() => {
                      speak(sentence, function () {
                       showCelebration();
                    });
                  }, 3000);
                }
            }

        });
        container.appendChild(frame);
    });

}
function showCelebration() {
    const dialog = document.querySelector(".congrats-box");
    dialog.showModal();
   celebrationTimeout = setTimeout(() => {
        dialog.close();
        index++;
        loadSentence(index);
    }, 6000);
}

document.getElementById("closeCongrats").addEventListener("click", () => {
    clearTimeout(celebrationTimeout);
    document.querySelector(".congrats-box").close();
    index++
    loadSentence(index);
});
function speak(text,callback) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[2];
    speechSynthesis.speak(utterance);
    utterance.onend = function(){
        callback();
    }
}
function saveProgress(data) {
    localStorage.setItem(
        "readingProgress",
        JSON.stringify(data)
    );
}

function getProgress() {
    return JSON.parse(
        localStorage.getItem("readingProgress")
    );
}