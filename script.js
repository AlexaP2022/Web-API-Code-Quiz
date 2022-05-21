
//introduction section - seprated to allow clicks dynamically change what will display next
var introSection = document.querySelector("#intro");
//quiz question 
var quizContainer = document.querySelector("#quizcontainer");
var quizQuestion = document.querySelector("#quiz-question");
var answerBtns = document.querySelectorAll(".answerbtn")
var answerChoiceA = document.querySelector("#A");
var answerChoiceB = document.querySelector("#B");
var answerChoiceC = document.querySelector("#C");
var answerChoiceD = document.querySelector("#D");
var questionCount = 0;
// timer and score 
var timerElement = document.querySelector(".timer-count")
var secondsLeft = 75;
var scoreElement = document.querySelector("#score")

//buttons / result alert
var startButton = document.querySelector(".start-button");
var onScreenAnswerResult = document.querySelector("#onscreen-answer-result");
var submitButton = document.querySelector("#submitscore");

//final results section
var finalElement = document.querySelector("#final");
var playerInitials = document.querySelector("#initials");

//high scores section
var highScoresSection = document.querySelector("#highscores");
var scoreListElement = document.querySelector("#score-list");
var scoreList = [];

//array used to store questions and answers, each indexed starting at zero.
var questionsArray = [

    {
        question: "Commonly used data types DO NOT include:",
        answers: ["1. Strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ________",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: ["1.numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        answers: ["1.commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ________",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
]

//Functions

function startTimer() {
    timer = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = secondsLeft;
        if (secondsLeft === 0 || questionCount === questionsArray.length) {
            clearInterval(timer);
            quizContainer.style.display = "none";
            finalElement.style.display ="block";
            scoreElement.textContent = secondsLeft;
        }
    }, 1000);
    console.log(questionCount)
}

//start quiz and timer
function startQuiz() {
    introSection.style.display = "none";
    quizContainer.style.display = "block";
    questionCount = 0;

    startTimer();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if(id < questionsArray.length) {
        quizQuestion.textContent = questionsArray[id].question;
        answerChoiceA.textContent = questionsArray[id].answers[0];
        answerChoiceB.textContent = questionsArray[id].answers[1];    
        answerChoiceC.textContent = questionsArray[id].answers[2];
        answerChoiceD.textContent = questionsArray[id].answers[3];
    }
}

//function to check answer and display whether correct/wrong for each question answered//
function checkAnswer(event) {
    event.preventDefault();
    onScreenAnswerResult.style.display = "block";
    var flash = document.createElement("p");
    onScreenAnswerResult.appendChild(flash);
    
    //Timeout for on screen answer result after 1.5 seconds
    setTimeout(function() {
        flash.style.display = 'none';
    },1500);

    if(questionsArray[questionCount].correctAnswer === event.target.value) {
    flash.textContent = "Correct!";
    }else if(questionsArray[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10; // decrement of 10 seconds per wrong answer
    flash.textContent = "Wrong!"
    }
    if(questionCount < questionsArray.length) {
    questionCount++;
    }
    setQuestion(questionCount);

}

function getScore(event) {
    event.preventDefault();
    finalElement.style.display = "none";
    highScoresSection.style.display = "block";

    var playerinit = playerInitials.value.toUpperCase();
    scoreList.push({initials: playerinit, score: secondsLeft});

scoreListElement.innherHTML="";
for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListElement.append(li);
}
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if(storedScoreList !== NaN) {
        scoreList = storedScoreList;
    }
}


//Event Listeners
startButton.addEventListener('click', startQuiz);

    //answer buttons for each question
answerBtns.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitButton.addEventListener('click', getScore);


