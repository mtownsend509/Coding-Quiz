
var intro = document.querySelector("#Intro");
var choices = document.querySelector("#choices");
var selection = document.querySelectorAll("li");
var start = document.querySelector("#startbutton");
var playButton = document.querySelector("#start");
var timeLeft = document.querySelector("#time");
var question = document.querySelector("#question");
var initialInput = document.querySelector("#highscore");
var feedBack = document.querySelector("#feedback");
var HighScoresList = document.querySelector("#HighScores");

playButton.addEventListener("click", play);
choices.addEventListener("click", answerLoad);
HighScoresList.addEventListener("click", showHighScores);


question1 = ["Splice()", "Slice()", "Rice()", "Join()"];
question2 = ["(x < 5 && y > 5)", "(x < 5 || y > 5)", "( !(x == y) )", "(x === y)"];
question3 = ["x = 7", "x == 7", "var = 7", "var x = 7"];
question4 = ["Strings", "Numbers", "Arrays", "All of the Above"];
question5 = ["Application pairing interference", "Application processing institute", "Application programming interface", "Application proxy identities"];
question6 = ["for (var i = 0; i < 5; i++) {", "for (i > 5; var i = 0; i++) {", "for (i++; i < 5; var i = 0) {", "for (var i =0; i++; i > 5) {"];
question7 = ['document.querySelector("li");', 'document.querySelector("#feedback");', 'document.querySelector(".intro");', 'document.querySelector("h1");'];
question8 = ["seconds", "milliseconds", "minutes", "picoseconds"];
question9 = ["( )", "{ }", "< >", "[ ]"];
question10 = ["Create a copy of the State variable", "Add 1 to the value of the State variable", "Declare a variable named 'State'", "Literally nothing"];

questions = ["Which of these methods can be used to insert or delete elements in an array?", "Which logical operator indicates that at least one of two values should be true for the statement to be true?", "Which of the following successfully declares a variable?", "What can be stored in an array?", "What does API stand for?", "Which of the following shows a 'for' statement with correctly set operational expressions?", "Which of the following will select an element by it's ID?", "What is the default unit for Javascript timing events?", "What type of brackets are used when declaring an array?", "What will the code 'State++;' do?"]

correctAnswers = ["Splice()", "(x < 5 || y > 5)", "var x = 7", "All of the Above", "Application programming interface", "for (var i = 0; i < 5; i++) {", 'document.querySelector("#feedback");', "milliseconds", "[ ]", "Add 1 to the value of the State variable"];

answers = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

option = [];

state = 0
score = 0
time = 200
response = 2;

function timer() {
    var timerInterval = setInterval(function() {
        time--;
        timeLeft.textContent = ("Time Remaining: " + time);
        //what follows are html changes to get rid of answers and add end screen content on time = 0
        if(time <= 0) {
            for (i=0; i<4; i++) {
                selection[i].innerHTML = "";
                selection[i].style.border = "none";
            }
            intro.innerHTML = "Time up!";
            question.innerHTML = ("Your score was " + score);
            var input = document.createElement("input");
            var submitButton = document.createElement("button");
            initialInput.appendChild(input);
            initialInput.children[0].setAttribute("placeholder", "Enter Initials");
            initialInput.appendChild(submitButton);
            submitButton.textContent = "Submit Score"
            playButton.textContent = "Try Again?";
            timeLeft.textContent = ("Time Remaining: 0")
            clearInterval(timerInterval);
        }
        if (state == 11) {
            clearInterval(timerInterval);
        }
    },1000)
};

//clears feed back field shortly after question is answered
function feedback() {
    var feedBackInterval = setInterval(function() {
        response--;
        if(response == 0) {
            response = 1;
            feedBack.textContent = "";
            clearInterval(feedBackInterval);
        }
    },1000)
}

//removes question content and adds final screen content
function finalScreen() {
    if (state == 10) {
        for (i=0; i<4; i++) {
            selection[i].innerHTML = "";
            selection[i].style.border = "none";
        }
        intro.innerHTML = "Quiz Completed!";
        question.innerHTML = ("Your score was " +(Math.floor(score + (time / 10))) + "!");
        var input = document.createElement("input");
        var submitButton = document.createElement("button");
        initialInput.appendChild(input);
        initialInput.children[0].setAttribute("placeholder", "Enter Initials");
        initialInput.appendChild(submitButton);
        submitButton.textContent = "Submit Score"
        submitButton.addEventListener("click", submit);
        playButton.textContent = "Try Again?";
        console.log(state);
        return;
    };
};


function answerLoad(event) {
    if (!event.target.matches("li") && !event.target.matches("button")) {
        return;
    } 
    if (event.target.textContent == correctAnswers[state - 1]) {
        score++;
        response = 1;
        feedBack.textContent = "Correct!";
        feedback();
    } else if ((event.target.textContent != correctAnswers[state - 1]) && event.target.matches("li")) {
        time = (time - 20);
        feedBack.textContent = "Incorrect!";
        feedback();
    } else {
        time = (time-20);
    }
    //doesn't do anything until state = 10
    finalScreen();
    if (state == 10) {
        state++;
        return;
    };
    //retrives questions from array based off state 
    var fill = answers[state];
    if (state >= 10) {
        selection[0].innerHTML = "";
    } else {
    for (i=0; i<4; i++) {
        selection[i].innerHTML = fill[i];
        selection[i].style.border = "solid";
        };
    }
    intro.innerHTML = "Question " + (state + 1) + ":";
    question.innerHTML = questions[state];
    if (event.target.matches("li") || event.target.matches("button")) {
        console.log("score" + score);
        state++;
        console.log("state" + state);
    };
}

function play(event) {
    score = 0;
    state = 0;
    time = 200;
    timeLeft.textContent = ("Time Remaining: 180")
    playButton.textContent = "";    
    answerLoad(event);
    timer();
    //gets rid of end screen content when starting new game
    if (initialInput.children[0]) {
        initialInput.children[0].remove();
        if (initialInput.children[0]) {
            initialInput.children[0].remove();
        };
    }
};

if (highScoreArray) {
    var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray"));
}else {
    highScoreArray = [];
}

//adds submission to high score list and removes input fields
function submit(event) {
    event.preventDefault();
    var quizScore = {
        Initials: initialInput.children[0].value,
        Score: (Math.floor(score + (time / 10))),
        };
    highScoreArray.push(quizScore);   
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
    initialInput.children[0].remove();
    initialInput.children[0].remove();
    var Updated = document.createElement("h1");
    initialInput.appendChild(Updated);
    Updated.textContent = "Highscores have been updated!";
};

//sorts high scores array into order by score and sloppily shows it in a window alert, I may come back to make it pretty
function showHighScores() {   
    var highScoreArray = JSON.parse(localStorage.getItem("highScoreArray"))
    for (var i=0; i<10; i++) {
        if (highScoreArray) {
            highScoreArray.sort(function(a, b) {return b.Score-a.Score});
            if (highScoreArray[i] != null) {
                window.alert(JSON.stringify(highScoreArray, null, 1))
                return
            } else {
            console.log("")
            }
    } else {
        window.alert("no high scores");
        return;
    }
    }
};
