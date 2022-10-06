
const buttonColors = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

var started = false;

var level = 0;

//DETECTS KEYBOARD PRESS //

$(document).keypress(function () {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// DETECTS BUTTON CLICK //

$('.btn').click(function () {

  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


// CHECKS ANSWER //

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {

    playSound("wrong");

    $('body').addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");

    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 200);

    startOver();
  }
}


// NEXT SEQUENCE // 

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// START OVER //
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// PLAYS SOUND //

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// ANIMATE BUTTON //
function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(function () {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}














// $('#button').click(function(){
//   $(this).addClass('active');
// });



// $(document).keypress(function(event){
//     $("h1").text(event.key)
//     console.log(event.key);
// })


// $(document).keypress(function(event){
//     $("h1").text(function(i, current){
//         return current + event.key;
//       });
// })
