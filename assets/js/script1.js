// Variables for high score, back to homepage button, and clear high score button
var highScores = document.querySelector("#highScores");
var BackToquiz = document.querySelector("#backBtn");
var clearScore = document.querySelector("#clearScore");

// Event listener to clear score storage on-click
clearScore.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Variable to store scores to local storage
var storedScores = localStorage.getItem("storedScores");
storedScores = JSON.parse(storedScores);

if (storedScores !== null) {
  for (var i = 0; i < storedScores.length; i++) {
    var liElement = document.createElement("li");
    liElement.textContent =
      storedScores[i].userInput + " " + storedScores[i].score;
    console.log(liElement);
    highScores.appendChild(liElement);
  }
}
