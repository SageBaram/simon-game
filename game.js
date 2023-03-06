var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var successCounter = 1;
var level = 1;
var highscore = 0;

$(document).on("keypress", function() {
  if (!started) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
    started = true;
  }
});

$(".btn").on("click", function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  if (!checkAnswer(userClickedPattern.length - 1)) {
    gameOver();
  }
  successCounter++;
  setSuccessCounterHeader(successCounter);
});

function setHeaderLevel(currentLevel) {
  $("#level-title").text("Level " + currentLevel);
}

function setHighScoreHeader(highscore) {
  $("#highscore-title").show();
  $("#highscore-title").text("Highscore: " + highscore);
}

function setSuccessCounterHeader(successCounter) {
  $("#success-title").show();
  $("#success-title").text("Sequence Counter: " + successCounter);
}

function setHighScore(level) {
  highscore = level - 1;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  for (let i = 0; i < currentLevel; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      return false;
    }
  }
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    return true;
  }
}

function nextSequence() {
  // generate a random number between 0-3.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // push the color to the game pattern array.
  gamePattern.push(randomChosenColour);

  // flash animation for the random button.
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  // reset ui and clicked patterns
  successCounter = 0;
  userClickedPattern = [];
  setHighScoreHeader(highscore);
  setSuccessCounterHeader(successCounter);
  setHeaderLevel(level);

  // increment level.
  level++;
}

function gameOver() {
  // reset game.
  if (level > highscore) {
    setHighScore(level - 1);
  }
  gamePattern = [];
  userClickedPattern = [];
  successCounter = 1;
  level = 1;
  started = false;

  // play wrong sound effect and flash game-over effect.
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    $("#success-title").hide();
    $("#highscore-title").hide();
  }, 200);
  // set title to tell the player the game is over.
  $("#level-title").text("Game Over, Press Any Key to Restart");
}
