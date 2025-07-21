const questions = [
  {
    question: "Which country has the largest population?",
    answers: [
      { text: "India", correct: true },
      { text: "USA", correct: false },
      { text: "China", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: [
      { text: "Nucleus", correct: false },
      { text: "Ribosome", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Chloroplast", correct: false },
    ],
  },
  {
    question: "What is the result of 9 × 8?",
    answers: [
      { text: "72", correct: true },
      { text: "64", correct: false },
      { text: "81", correct: false },
      { text: "69", correct: false },
    ],
  },
  {
    question: "Which programming language is used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Osmium", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Oxide", correct: false },
      { text: "Oganesson", correct: false },
    ],
  },
  {
    question: "Which data structure uses FIFO (First-In-First-Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  nextButton.innerText = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.style.display = "none";
  feedbackElement.innerText = "";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });
  if (correct) {
    score++;
    feedbackElement.innerText = "✅ Correct!";
  } else {
    feedbackElement.innerText = "❌ Wrong!";
  }
  nextButton.style.display = "block";
}
function setStatusClass(element, correct) {
  element.classList.add(correct ? "correct" : "wrong");
}
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});
function showScore() {
  resetState();
  scoreContainer.classList.remove("hide");
  scoreText.innerText = `${score} out of ${questions.length}`;
  nextButton.innerText = "Restart Quiz";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}
startQuiz();
