
/* GET HTML ELEMENTS */

const startQuiz = document.getElementById("startQuiz");
const submitAnswer = document.getElementById("submitAnswer");
const closeButton = document.getElementById("closeButton");

const coverPage = document.getElementById("coverPage");
const quizPage = document.getElementById("quizPage");
const letterPage = document.getElementById("letterPage");

const answerInput = document.getElementById("answerInput");
const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const feedback = document.getElementById("feedback");

const backgroundMusic = document.getElementById("backgroundMusic");

const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

const toast = document.getElementById("toast");


/* MATH QUESTIONS */

const questions = [
    {
        question: "12 + 8 = ?",
        answer: 20
    },
    {
        question: "9 × 7 = ?",
        answer: 63
    },
    {
        question: "100 ÷ 4 = ?",
        answer: 25
    }
];


let currentQuestion = 0;
let toastTimer;


/* SHOW NOTIFICATION */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* START QUIZ */

startQuiz.addEventListener("click", function () {

    coverPage.style.display = "none";

    quizPage.style.display = "block";

    currentQuestion = 0;

    submitAnswer.disabled = false;

    loadQuestion();

});


/* LOAD QUESTION */

function loadQuestion() {

    questionText.textContent =
        questions[currentQuestion].question;

    questionNumber.textContent =
        "0" + (currentQuestion + 1) + " / 03";

    progressText.textContent =
        "Question " + (currentQuestion + 1) + " of 3";

    progressFill.style.width =
        (currentQuestion / questions.length) * 100 + "%";

    answerInput.value = "";

    feedback.textContent = "";

    answerInput.focus();

}


/* CHECK ANSWER */

submitAnswer.addEventListener("click", function () {

    const userAnswer = answerInput.value.trim();

    if (userAnswer === "") {

        feedback.style.color = "#bd5573";

        feedback.textContent =
            "Please enter your answer first.";

        return;

    }


    if (Number(userAnswer) === questions[currentQuestion].answer) {

        feedback.style.color = "#548b67";

        feedback.textContent = "Correct! Great job! ♡";

        submitAnswer.disabled = true;

        currentQuestion++;


        if (currentQuestion < questions.length) {

            setTimeout(function () {

                submitAnswer.disabled = false;

                loadQuestion();

            }, 800);

        } else {

            setTimeout(function () {

                openLetter();

            }, 800);

        }

    } else {

        feedback.style.color = "#bd5573";

        feedback.textContent = "Not quite! Try again.";

    }

});


/* ENTER KEY SUPPORT */

answerInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        submitAnswer.click();

    }

});


/* OPEN LETTER AND START MUSIC */

function openLetter() {

    quizPage.style.display = "none";

    letterPage.style.display = "block";

    progressFill.style.width = "100%";


    // Reset music before playing

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;


    // Music starts only after opening the letter

    backgroundMusic.play().then(function () {

        musicIcon.textContent = "♫";

        musicText.textContent = "Pause Music";

    }).catch(function () {

        musicIcon.textContent = "♪";

        musicText.textContent = "Play Music";

        showToast("Press Play Music to start the background music.");

    });


    showToast("Your special letter is now open! ♡");

}


/* PLAY OR PAUSE MUSIC */

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play().then(function () {

            musicIcon.textContent = "♫";

            musicText.textContent = "Pause Music";

        }).catch(function () {

            showToast("Please check your background music file.");

        });

    } else {

        backgroundMusic.pause();

        musicIcon.textContent = "♪";

        musicText.textContent = "Play Music";

    }

});


/* CLOSE LETTER AND RETURN TO COVER */

closeButton.addEventListener("click", function () {

    // Stop the music

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;


    // Hide letter

    letterPage.style.display = "none";


    // Show cover page

    coverPage.style.display = "flex";


    // Reset music button

    musicIcon.textContent = "♫";

    musicText.textContent = "Play Music";


    // Reset quiz

    currentQuestion = 0;

    submitAnswer.disabled = false;

    progressFill.style.width = "0%";


    // Clear old answer and feedback

    answerInput.value = "";

    feedback.textContent = "";


    showToast("Thank you for reading! ♡");

});
