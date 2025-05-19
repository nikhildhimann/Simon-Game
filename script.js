let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;

const h2 = document.querySelector("h2");
const startBtn = document.querySelector("#start");
const allBtns = document.querySelectorAll(".box");
const colors = ["red", "yellow", "green", "purple"];

// Start Button Click
startBtn.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Level 0";
    startBtn.innerText = "Restart";
    levelUp();
  }
});

// Flash animation for game sequence
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

// Flash for user click
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 400);
}

// Visual game over effect
function gameOverFlash() {
  document.body.classList.add("game-over");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 300);
}

// Move to next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = colors[randomIndex];
  let randomBtn = document.querySelector(`#${randomColor}`);
  gameSeq.push(randomColor);
  gameFlash(randomBtn);
}

// Check user input
function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 600);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Click Start to try again.`;
    gameOverFlash();
    reset();
  }
}

// Handle user click
function pressBtn() {
  if (started) {
    let btn = this;
    let color = btn.getAttribute("id");
    userFlash(btn);
    userSeq.push(color);
    check(userSeq.length - 1);
  }
}

// Button click listeners
for (let btn of allBtns) {
  btn.addEventListener("click", pressBtn);
}

// Reset game
function reset() {
  userSeq = [];
  gameSeq = [];
  level = 0;
  started = false;
}
