// These commands are used for showing one information to another information start here
let welcomeBtn = document.querySelector("#welcome-quiz button");
let showQuiz = document.querySelector(".items");
let startPage = document.querySelector("#welcome-quiz");

//for highness score button on click ,go to page highness score page
let headerScore=document.querySelector(".header-score")
headerScore.addEventListener("click",()=>{
    window.location.href="highness-score.html"
})
//for time Show up
let timeShowUp = document.querySelector(".clock")

//result show after submit questions
let resultDiv = document.querySelector("#result")
resultDiv.style.display="none";
let intervalID;

welcomeBtn.addEventListener("click", () => {
    showQuiz.classList.add("showQuiz");
    startPage.style.display = "none";
    //executes function "countdown" every 1000ms to update time and display on page
    intervalID = setInterval(countdown, 1000);
})

//ends here


//Question create in object start here

const questions = [
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "When did javascript first appear?",
        options: ["1. 1995", "2. Roaring twenties ", "3. 2005 ", "4. 2000"],
        answer: "1. 1995",
    },
    {
        questionText: "What syntax would call a function?",
        options: ["1. var function", "2.function", "3. call function", "4. function()"],
        answer: "4. function()",
    },
    {
        questionText: "What does DOM stand for?",
        options: ["1. Do Overnight Modules", "2. Document Object Model", "3. Divas Obviously Model", "4. Document"],
        answer: "2. Document Object Model",
    }

]


//hide result div
function hideResultText() {

    let letchoiceAnswer = document.querySelector(".choices")
    setTimeout(() => {
        answerText.innerHTML = "";
        answer.style.display = "none"
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();

        } else {
            endQuiz()
           
        }
    }, 1000)
}


let time = 60;
// Question done
//start quiz
var currentQuestion;
function startQuiz() {
    currentQuestion = 0;
    displayQuestion()

     // //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
      displayTime();
}
startQuiz()


//for time update
function displayTime() {
        timeShowUp.innerHTML = `Time:${time}`

}
// CountDown start here
function countdown() {
    time--;
    displayTime();

    if (time < 1) {
        endQuiz()
        
    }
}

//display the question and answer options for the current question
let options;
var answerbutton;

function displayQuestion() {

    let question = questions[currentQuestion];

    let options = question.options;

    let questionText = document.querySelector(".question")
    questionText.innerHTML = question.questionText;

    let choiceAnswer = document.querySelectorAll(".choices button")
    choiceAnswer.forEach((v, i) => {
        v.innerHTML = options[i]
    })

}
//compare the answer with options , then answer according to choose("correct" ,"Incorrect")
let answer = document.querySelector(".answer");
let answerText = document.querySelector(".answer-text")
let answerBtn = document.querySelectorAll(".answerbtn")

answerBtn.forEach((v, i) => {
    v.addEventListener('click', (e) => {

        answer.style.display = "block"
        let optionGet = e.target.innerHTML;

        if (answerText.innerHTML == "") {

            if (optionGet === questions[currentQuestion].answer) {

                answerText.textContent = "Correct!";
                hideResultText()
                
            } else {
                answerText.textContent = "Incorrect";
                hideResultText()
                if (time >= 15) {
                    time = time - 15;
                    displayTime();

                }
                //if time is less than 15, display time as 0 and end quiz
                //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 15 seconds left on the timer
                else {
                    time = 0;
                    displayTime();
                    endQuiz()
                    
                }
            }
        } else {
            alert("already selected")
        }
    })

})

//when time up or question done, end quiz
let scoreCount = document.querySelector("#result p span")
function endQuiz() {
    clearInterval(intervalID);
    showQuiz.classList.remove("showQuiz");
    resultDiv.style.display = "block";
    scoreCount.textContent = time
}

//localstorage intial save

let formData = document.querySelector("#form-data");
let initalValue = document.querySelector("#inital");
let message = document.querySelector(".message")
let inputRecieve;
let oldData;

//local storage data store
formData.addEventListener("submit", (e) => {

    e.preventDefault()
    inputRecieve = initalValue.value;
    if (inputRecieve != "") {
        var objInitial = {
            score: time,
            inital: inputRecieve
        }
        oldData = JSON.parse(localStorage.getItem("initalName")) ?? [];
        var finalData = [...oldData, objInitial]

        localStorage.setItem("initalName", JSON.stringify(finalData))
        setTimeout(() => {
            message.style.display="block";
            message.innerHTML = "your inital and score has been saved!"
        }, 2000)
        initalValue.value = "";
    }
    else {
        alert("please initial your name")
        return;
    }
    window.location = "./highness-score.html"
})





