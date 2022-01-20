"use strict";

//Selecting elements
const score0Ele = document.querySelector("#score--0");
const score1Ele = document.querySelector("#score--1");
const currentScore0Ele = document.querySelector("#current--0");
const currentScore1Ele = document.querySelector("#current--1");
const diceEle = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0Ele = document.querySelector(".player--0");
const player1Ele = document.querySelector(".player--1");

//Starting conditions
score0Ele.textContent = 0;
score1Ele.textContent = 0;
diceEle.classList.add("hidden");

let currentScore = 0;
let playerScore0 = 0;
let playerScore1 = 0;

let playing = true;

//Roling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEle.classList.remove("hidden");
    diceEle.src = `dice-${dice}.png`;

    //3.Checked for rolled 1: if true
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      if (player0Ele.classList.contains("player--active")) {
        currentScore0Ele.textContent = currentScore;
      } else {
        currentScore1Ele.textContent = currentScore;
      }
    } else {
      if (player0Ele.classList.contains("player--active")) {
        //Swtich to next player and reset currentScore to 0
        player0Ele.classList.remove("player--active");
        player1Ele.classList.add("player--active");
        currentScore = 0;

        //Remove current score
        currentScore0Ele.textContent = 0;
      } else {
        //Swtich to next player and reset currentScore to 0
        player1Ele.classList.remove("player--active");
        player0Ele.classList.add("player--active");
        currentScore = 0;

        //Remove current score
        currentScore1Ele.textContent = 0;
      }
    }
  }
});

//Hold score functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    if (player0Ele.classList.contains("player--active")) {
      //After pressing the hold button add the current score to the score and set the current score to 0
      playerScore0 += currentScore;
      score0Ele.textContent = playerScore0;
      currentScore0Ele.textContent = 0;
      currentScore = 0;

      //Swtich to next player
      player0Ele.classList.remove("player--active");
      player1Ele.classList.add("player--active");
    } else {
      //After pressing the hold button add the current score to the score and set current score to 0
      playerScore1 += currentScore;
      score1Ele.textContent = playerScore1;
      currentScore1Ele.textContent = 0;
      currentScore = 0;

      //Swtich to next player
      player1Ele.classList.remove("player--active");
      player0Ele.classList.add("player--active");
    }

    //When one of the players win
    if (playerScore0 >= 100) {
      playing = false;
      player0Ele.classList.add("player--winner");
      player1Ele.classList.remove("player--active");
      diceEle.classList.add("hidden");
    } else if (playerScore1 >= 100) {
      player1Ele.classList.add("player--winner");
      player0Ele.classList.remove("player--active");
      diceEle.classList.add("hidden");
    }
  }
});

btnNew.addEventListener("click", function () {
  playing = true;
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  currentScore = 0;
  playerScore0 = 0;
  playerScore1 = 0;
  diceEle.classList.add("hidden");

  if (player0Ele.classList.contains("player--winner")) {
    player0Ele.classList.remove("player--winner");
    player0Ele.classList.add("player--active");
  } else if (player1Ele.classList.contains("player--winner")) {
    player1Ele.classList.remove("player--winner");
    player0Ele.classList.add("player--active");
  }
});
