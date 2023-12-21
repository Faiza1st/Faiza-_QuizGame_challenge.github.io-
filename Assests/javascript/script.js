var timeEl = document.querySelector(".start-timer");
var startButton = document.querySelector(".start-button");
const questionScreen = document.getElementById("question-screen");
const scoreElement = document.getElementById("score");
const startScreen = document.getElementById("start-screen")
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const endScreen = document.getElementById("endScreen");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("saveScoreButton");
const highScoresList = document.getElementById("highScoresList");
const clearHighScoresButton = document.getElementById("clearHighScoresButton");
const restartButton = document.getElementById("restartButton");

//Question for the Quiz game// Will add more if neeeded. 
const quizQuestions = [
    {
        question: "What does JavaScript primarily add to a web page?",
        choices: ["Style", "Interactivity", "Structure", "Images"],
        correctAnswer: "Interactivity"
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        choices: ["let myVar = 10;", "var myVar = 10;", " const myVar = 10;", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "Which of the following is a falsy value in JavaScript?",
        choices: ["0", "false", " undefined", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "What is the purpose of the document.getElementById() method in JavaScript?",
        choices: ["To get the value of an input element", "To change the page's title", " To get an element by its ID", "To add a new HTML element"],
        correctAnswer: "To get an element by its ID"
    },
    {
        question: "Which operator is used for equality without type coercion in JavaScript?",
        choices: [" === ", " == ", " = ", " !== "],
        correctAnswer: " === "
    },
    {
        question: "What is the correct way to comment a single line in JavaScript?",
        choices: [" // This is a comment ", " /* This is a comment */ ", " <!-- This is a comment --> ", " % This is a comment % "],
        correctAnswer: "  // This is a comment "
    },
    {
        question: "Which function is used to add a new element at the end of an array in JavaScript?",
        choices: [" push() ", " pop()", "  shift() ", "unshift()"],
        correctAnswer: "push()"
    },
    

];

//Setting Global variable to 0 
let currentQuestion = 0;
let score = 0;
var secondsLeft = 75;

//Start the timer fuction, it starts the timer to display the final scores and also stops the other function from happening if the timer runs out 
function setTime() {
    var startTimer = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if (currentQuestion >= quizQuestions.length) {
            clearInterval(startTimer);
            showFinalScore(); // Display final score when timer ends or all questions are answered
        }

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            showFinalScore();
            clearInterval(startTimer);
        }
    }, 1000);
}

function showFinalScore() {
    // Display final score when all questions are answered
    questionElement.textContent = "Quiz complete! Final score: " + score;
    choicesElement.innerHTML = "";
    scoreElement.textContent = score;
    //Shows the Initial sections by removing the hidden class
    endScreen.classList.remove("hidden");

}

//Starts the quiz, display our questions in order and then removes our content from startscreen
startButton.addEventListener("click", function () {
    startScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden")
    setTime();
    displayQuestion();

});

//Shows the next question to users, and If all questions are done = final score and stop timer
function showNext() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        // If all questions are answered, show final score
        clearInterval(startTimer);
        showFinalScore();
    }
}

// This function clears the existing section and loops to add/create the correct questions and options.
function displayQuestion() {
    questionElement.textContent = quizQuestions[currentQuestion].question;
    choicesElement.innerHTML = ""; //clear HTML

    quizQuestions[currentQuestion].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = function () {
            checkAnswer(choice);
        };
        choicesElement.appendChild(button);
    });
}

function checkAnswer(answer) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    const feedbackElement = document.getElementById("feedback");
    if (answer === correctAnswer) {
        score++; // add points
        feedbackElement.textContent = "Correct!"; // If write show 'Correct'
    } else {
        var timeRemoved = 15;
        secondsLeft -= timeRemoved; // remove time from Timer 
        feedbackElement.textContent = "Wrong!"; // If wrong show 'Wrong
    }

    currentQuestion++;
    displayQuestion();
}

// Uses the button to store the input in local file. 
saveScoreButton.addEventListener("click", function () {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        // Save the score and initials in localStorage
        saveScoreToStorage(initials, score);
    }
});

function saveScoreToStorage(initials, score) {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    const newScore = { initials: initials.toUpperCase(), score: score };
    savedScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));
    displayHighScores();
}


function displayHighScores() {
    highScoresList.innerHTML = ""; // Clear previous high scores

    // Retrieve scores from storage 
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    
    // Sort scores in descending order
    const sortedScores = savedScores.sort((a, b) => b.score - a.score);

    sortedScores.slice(0, 10).forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}
// Clears HIghscore 
clearHighScoresButton.addEventListener("click", function () {
    // Clear high scores from storage 
    localStorage.removeItem("scores");
    
    // Update the displayed high scores
    displayHighScores();
});

//restarts the quiz 
restartButton.addEventListener("click", function () {
    // Reset quiz variables and elements to initial state
    currentQuestion = 0;
    score = 0;
    secondsLeft = 75;

    // Clear high scores from storage 
    localStorage.removeItem("scores");

    // Reset UI elements or hide/show necessary sections 
    startScreen.classList.remove("hidden");
    questionScreen.classList.add("hidden");
    endScreen.classList.add("hidden");

    // Reset the displayed score, timer, and other relevant elements
    timeEl.textContent = "Timer: " + secondsLeft;
    scoreElement.textContent = score;

});




