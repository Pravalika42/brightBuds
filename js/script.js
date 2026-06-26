import {alphabetData} from './data.js'
document.addEventListener("DOMContentLoaded", () => {
   // your code here
   const container = document.querySelector(".main");
for (const letter in alphabetData) {
    const frame = document.createElement("div");
    frame.className = "main_frame";
    frame.style.background = alphabetData[letter].colour;
    frame.innerHTML = `
        <button class="letter-btn">
            ${letter}
        </button>
    `;
    frame.addEventListener("click", () => {
        window.location.href = `Letter.html?letter=${letter}`;
    });
    container.appendChild(frame);
}
});
