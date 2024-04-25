let gameseq = [];
let userseq = [];
let btns = ["red", "yellow", "green", "blue"]

let started = false;
let level = 0;
let Highscore = 0;

let h2 = document.querySelector("h2")

document.addEventListener("keypress", function () {
    // console.log("game started")
    if (started == false) {
        console.log("game started")
        started = true;
    }
    levelup();
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 250)
}
function levelup() {
    userseq = [];
    level++;

    h2.innerText = `level ${level}`
    let randIdx = Math.floor(Math.random() * 3)
    let btnColor = btns[randIdx]
    let randBtn = document.querySelector(`.${btnColor}`)
    gameseq.push(btnColor)
    console.log(btnColor)
    gameFlash(randBtn);
}
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup(), 1000)
            if (userseq.length > Highscore) {
                Highscore = userseq.length;
                document.querySelector("h3").innerText = `Highscore: ${Highscore}`;
            }
        }
    } else {
        h2.innerHTML = `Game over! your score was <b>${level}<b><br> press any key to start`
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white"
        }, 200)
        reset();
    }
}

function btnpress() {
    let btn = this;
    gameFlash(btn);

    userColor = btn.getAttribute("id")
    userseq.push(userColor)
    console.log(userColor)

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns) {
    btn.addEventListener("click", btnpress)
}
function reset() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
