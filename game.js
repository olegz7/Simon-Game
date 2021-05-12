let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

let started = false

$(document).keydown(function() {
    // if (started === false ) {
    if (!started) {
      $("#topic").html("Level " + level)
      nextSequence()
      started = true
    }
})

// // // #10  Use jQuery to detect when any of the buttons are clicked and trigger a handler function.

  $(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    // $(this).fadeOut(100).fadeIn(100)
    userClickedPattern.push(userChosenColour)

    // console.log(userClickedPattern)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
  })

function checkAnswer(currentLevel) {

if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success")
  if (userClickedPattern.length === gamePattern.length) {

    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
} else {
    console.log("wrong")

    playSound("wrong")
    // // // no need to write the code below to play sound, just reuse function playSound
    // let wrong = new Audio('sounds/wrong.mp3');
    // wrong.play();

    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    $("h1").html("Game Over, Press Any Key to Restart")
    startOver()
  }

}

// // // #1 Create function that generates ramdom number from 0 to 3
function nextSequence(){
  userClickedPattern = []

  level++
  $("#topic").html("Level " + level)

  let randomNumber = Math.floor(Math.random() * 4)
  // // alternative function
  // function nextSequence(min, max) {return Math.floor(Math.random() * (max - min + 1) + min)}

  // // // #2 Create variable randomChosenColour to get random colour.
  let randomChosenColour = buttonColours[randomNumber]
  // // // #3 Add new randomChosenColour to the end of gamePattern array.
  gamePattern.push(randomChosenColour)
  // console.log(gamePattern)
  // // // #4 Use jQuery to select button with the same id as the randomChosenColour
  // $("#" + randomChosenColour).
  // // // #5 Use jQuery to animate flash to button selected in previous step

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}


function playSound(name) {
  // // // #9 Use Javascript to play sound for the button colour selected in previous step
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
$("#" + currentColor).addClass("pressed");
// $("#" + currentColor).css("background-color", "grey")
setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
