// Variable for quiz questions and answers
var quiz = [
  {
    title:
      "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?",
    choices: ["reverse()", "shift()", "slice()", "some()"],
    answer: "some()",
  },

  {
    title:
      "Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?",
    choices: ["concat()", "every()", "push()", "some()"],
    answer: "every()",
  },

  {
    title:
      "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    choices: ["concat()", "pop()", "push()", "some()"],
    answer: "concat()",
  },

  {
    title:
      "Which of the following function of String object returns the primitive value of the specified object.",
    choices: [
      "toLocaleUpperCase()",
      "toUpperCase()",
      "toString()",
      "valueOf()",
    ],
    answer: "valueOf()",
  },

  {
    title:
      "Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?",
    choices: ["slice()", "split()", "replace()", "search()"],
    answer: "split()",
  },
];

// Variable for Quiz Array for coding questions
var score = 0;
var quizIndex = 0;

var intervalSeconds = 90;
var intervalHold = 0;
var intervalPenalty = 10;

// var wrapper = document.querySelector("#wrapper");
var timeInterval = document.querySelector("#timeInterval");
var quizletQuestions = document.querySelector("#quizletQuestions");

var startInterval = document.querySelector(".start-btn");
//timer starts when button is clicked
startInterval.addEventListener("click", function () {
  if (intervalHold === 0) {
    intervalHold = setInterval(function () {
      intervalSeconds--;
      timeInterval.textContent = "Time: " + intervalSeconds;

      if (intervalSeconds <= 0) {
        clearInterval(intervalHold);
        quizOver();
        timeInterval.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(quizIndex);
});

function render(quizIndex) {
  var ulElement = document.createElement("ul");
  quizletQuestions.innerHTML = "";
  ulElement.innerHTML = "";

  for (var i = 0; i < quiz.length; i++) {
    var questionPrompt = quiz[quizIndex].title;
    var choicesPrompt = quiz[quizIndex].choices;
    quizletQuestions.textContent = questionPrompt;
  }

  choicesPrompt.forEach(function (newItem) {
    var listChoices = document.createElement("li");
    listChoices.textContent = newItem;
    quizletQuestions.appendChild(ulElement);
    ulElement.appendChild(listChoices);
    listChoices.addEventListener("click", compare);
  });
}

// Function to display if question is correct or incorrect
function compare(event) {
  var userChoice = event.target;

  if (userChoice.matches("li")) {
    var divElement = document.createElement("div");
    divElement.setAttribute("id", "divElement");

    if (userChoice.textContent == quiz[quizIndex].answer) {
      score++;
      divElement.textContent =
        "Correct! The answer is: " + quiz[quizIndex].answer;
    } else {
      intervalSeconds = intervalSeconds - intervalPenalty;
      divElement.textContent =
        "Incorrect! The correct answer is: " + quiz[quizIndex].answer;
    }
  }
  quizIndex++;

  if (quizIndex >= quiz.length) {
    quizOver();
    divElement.innerHTML =
      "Good Job!" +
      " you manage to get " +
      score +
      "/" +
      quiz.length +
      " Correct! " +
      "<br><br>" +
      "<ul>Quiz Answers: " +
      " some(), every(), concat(), valueOf(), split()</ul>";
  } else {
    render(quizIndex);
  }
  quizletQuestions.appendChild(divElement);
}

// Function to showcase quiz is over and to display final score
function quizOver() {
  quizletQuestions.innerHTML = "";
  timeInterval.innerHTML = "";

  var h1Element = document.createElement("h1");
  h1Element.setAttribute("id", "h1Element");
  h1Element.textContent = "Quizlet Finished!";

  quizletQuestions.appendChild(h1Element);

  var pElement = document.createElement("p");
  pElement.setAttribute("id", "pElement");

  quizletQuestions.appendChild(pElement);

  if (intervalSeconds >= 0) {
    var timeLeft = intervalSeconds;
    var p2Element = document.createElement("p");
    clearInterval(intervalHold);
    pElement.textContent = "Your final score is: " + timeLeft;

    quizletQuestions.appendChild(p2Element);
  }

  // create label for user input
  var labelInput = document.createElement("label");
  labelInput.setAttribute("id", "labelInput");
  labelInput.textContent = "Enter initals: ";

  quizletQuestions.appendChild(labelInput);

  var inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", "userInput");
  inputEl.textContent = "";

  quizletQuestions.appendChild(inputEl);

  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "submit");
  buttonEl.setAttribute("id", "submit");
  buttonEl.textContent = "Submit";

  quizletQuestions.appendChild(buttonEl);

  buttonEl.addEventListener("click", function () {
    var userInput = inputEl.value;

    if (userInput === null) {
    } else {
      var finalScore = {
        userInput: userInput,
        score: timeLeft,
      };
      console.log(finalScore);
      var storedScores = localStorage.getItem("storedScores");
      if (storedScores === null) {
        storedScores = [];
      } else {
        storedScores = JSON.parse(storedScores);
      }
      storedScores.push(finalScore);
      var newScore = JSON.stringify(storedScores);
      localStorage.setItem("storedScores", newScore);

      window.location.replace("./index1.html");
    }
  });
}
