//your JS code here.
// Question data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Render questions
const questionsElement = document.getElementById("questions");

function renderQuestions() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (savedProgress[index] === choice) {
        choiceElement.checked = true;
      }
      choiceElement.addEventListener("change", () => saveProgress(index, choice));

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
    });

    questionsElement.appendChild(questionElement);
  });

  // Display last score
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    document.getElementById("score").textContent = `Last Score: ${lastScore} out of 5`;
  }
}

// Save progress to sessionStorage
function saveProgress(index, choice) {
  let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  progress[index] = choice;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Calculate and display score
document.getElementById("submit").addEventListener("click", () => {
  let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((question, index) => {
    if (progress[index] === question.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  document.getElementById("score").textContent = `Your score is ${score} out of 5`;

  // Clear sessionStorage after submission
  sessionStorage.removeItem("progress");
});

// Initialize quiz
renderQuestions();
