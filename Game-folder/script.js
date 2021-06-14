'use strict';
var main_score, initialscore, active_player, gameplay;

function reset_game() {

  main_score = [0, 0];
  initialscore = 0;
  active_player = 0;
  gameplay = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score--0").innerText = "0";
  document.getElementById("score--1").innerText = "0";
  document.getElementById("current--0").innerText = "0";
  document.getElementById("current--1").innerText = "0";
  document.getElementById("name--0").innerText = "Player 1";
  document.getElementById("name--1").innerText = "Player 2";
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.add("player--active");
}

function name_change() {
  if (gameplay) {
    if (active_player === 0) {
      let new_name = prompt("Please enter NEW name", "PLAYER 1");
      if (new_name != null) {
        document.getElementById("name--0").innerText = new_name;
      }
      if (new_name === "") {
        document.getElementById("name--0").innerText = "PLAYER 1";
      }
    }
    if (active_player === 1) {
      let new_name = prompt("Please enter NEW name", "PLAYER 2");
      if (new_name != null) {
        document.getElementById("name--1").innerText = new_name;
      }
      if (new_name === "") {
        document.getElementById("name--1").innerText = "PLAYER 2";
      }
    }
  }
}
name_change();


document.querySelector(".btn--roll").addEventListener("click", function () {
  if (gameplay) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice_obj = document.querySelector(".dice");
    dice_obj.style.display = "block";
    dice_obj.src = "dice-" + dice + ".png";

    if (dice !== 1) {
      initialscore += dice;
      document.getElementById(
        "current--" + active_player).innerText = initialscore;
    } else {
      next_player();
    }
  }
});
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (gameplay) {
    main_score[active_player] += initialscore;
    document.getElementById("score--" + active_player).innerText = main_score[active_player];

    if (main_score[active_player] >= 100) {
      document.getElementById("name--" + active_player).innerText = "Winner!";
      document.querySelector(".dice").style.display = "none";

      document.querySelector(".player--" + active_player).classList.add("player--winner");
      document.querySelector(".player--" + active_player).classList.remove("player--active");

      gameplay = false;
      document.querySelector(".dice").style.display = "none";
    } else {
      next_player();
    }
  }
});

function next_player() {
  initialscore = 0;
  (active_player === 0) ? (active_player = 1) : (active_player = 0);

  document.getElementById("current--0").innerText = 0;
  document.getElementById("current--1").innerText = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");

}
document.querySelector(".btn--new").addEventListener("click", reset_game);
reset_game();