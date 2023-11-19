import settings from "./settings";

let score = 0;
let highScore = 0;
const scoreElement = document.getElementById("score") as HTMLDivElement;
const highScoreElement = document.getElementById("highScore") as HTMLDivElement;

function setHighScore(n: number) {
    if (n < highScore) return;
    highScore = n;
    localStorage.setItem(settings.localStorage.highScoreKey, String(n));
    highScoreElement.textContent = String(n);
}

export function setScore(n: number) {
    score = n;
    scoreElement.textContent = String(n);
    setHighScore(n);
}

export function increaseScore(n: number) {
    setScore(score + n);
}

export function loadHighScore() {
    const h = localStorage.getItem(settings.localStorage.highScoreKey);
    if (h === null) {
        setHighScore(0);
        return;
    };

    const n = Number(h);
    if (Number.isSafeInteger(n) && !Number.isNaN(n) && n > 0) {
        setHighScore(n);
        return;
    }

    setHighScore(0);
}

export function getScoreText(): string {
    return `Your score: ${score}\nYour high score: ${highScore}`;
}
