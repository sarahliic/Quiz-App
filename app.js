
// Creating the questions and answers
const questions = [
  {
    question: "What is the world's longest river called?",
    answers: [
      { text: "The Amazon", correct: false },
      { text: "The Nile", correct: true },
      { text: "The Yangtze", correct: false },
      { text: "The Mississippi", correct: false },
    ],
  },
  {
    question: "Which city hosted the Summer Olympics in 2012?",
    answers: [
      { text: "Tokyo", correct: false },
      { text: "Los Angeles", correct: false },
      { text: "London, England", correct: true },
      { text: "Paris", correct: false },
    ],
  },
  {
    question: "How many bones are there in the human body?",
    answers: [
      { text: "306", correct: false },
      { text: "206", correct: true },
      { text: "96", correct: false },
      { text: "306", correct: false },
    ],
  },
  {
    question: "Which planet is closest to Earth?",
    answers: [
      { text: "Venus", correct: true },
      { text: "Mercury", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
];

// Variables
const questionElement = document.querySelector(".question");
const multiChoiceBtn = document.querySelector(".multi-choice");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Calling functions
startQuiz();

// Start Quiz
function startQuiz() {
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  // Display the questions
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  // Display the Answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("choice-btn");
    multiChoiceBtn.appendChild(button);

    // check the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  return currentQuestion;
}

// Reset State
function resetState() {
  nextBtn.style.display = "none";
  while (multiChoiceBtn.firstChild) {
    multiChoiceBtn.removeChild(multiChoiceBtn.firstChild);
  }
}

// Add funcions to the choices
function selectAnswer(e) {
  // Background colors for the choice
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  // Event to disabled others buttons after click one
  Array.from(multiChoiceBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

// Show score function
function showScore() {
  resetState();
  questionElement.innerHTML = `You get ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

// Next Button function
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Check the questions to move to next
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
  }
});
