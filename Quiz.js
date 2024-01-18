let quizContainer = document.getElementById("quizContainer");
let quizBtn = document.getElementById("quizBtn");
let question = document.getElementById("question");
let loader = document.querySelector(".loader");
let storeData;
let score;
const storeAnswer = [];

const fetchdata = async () => {
  try {
    loader.style.display = "block";
    const response = await Promise.race([
      fetch(
        `https://opentdb.com/api.php?amount=7&category=18&difficulty=easy&type=multiple`
      ),
    ]);
  

    const data = await response.json();
    storeData = data.results[index];

    console.log(storeData);
    if (index < data.results.length) {
      loader.style.display = "none";
      let quizElement = document.createElement("div");
      quizContainer.innerHTML = "";
      quizElement.innerHTML = `
        <div id="question">${index + 1}. ${storeData.question}</div>
        <div id="questionOption">
          <label>
            <input type="radio" required class="option" name="answer" value="${
              storeData.incorrect_answers[0]
            }">
            <span>${storeData.incorrect_answers[0]}</span>
          </label>
          <label>
            <input type="radio" required class="option" name="answer" value="${
              storeData.incorrect_answers[1]
            }">
            <span>${storeData.incorrect_answers[1]}</span>
          </label>
          <label>
            <input type="radio" required class="option" name="answer" value="${
              storeData.incorrect_answers != storeData.correct_answer
                ? storeData.correct_answer
                : ""
            }">
            <span>${
              storeData.incorrect_answers != storeData.correct_answer
                ? storeData.correct_answer
                : ""
            }</span>
          </label>
          <label>
            <input type="radio" required class="option" name="answer" value="${
              storeData.incorrect_answers[2]
            }">
            <span>${storeData.incorrect_answers[2]}</span>
          </label>
      </div>`;
      quizContainer.appendChild(quizElement);
    } else {
      quizContainer.innerHTML = `FINISH \n You got ${storeAnswer.length} / ${data.results.length}`;
      finalScore(score);
    }
    if (index < data.results.length) {
      index += 1;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    loader.style.display = "none";
  }
};

let index = 0;
quizBtn.addEventListener("click", () => {
  index += 1;
  fetchdata();
});
fetchdata();

quizContainer.addEventListener("click", selectAnswer);

function selectAnswer(e) {
  if (e.target.classList.contains("option")) {
    let selectedAnswer = e.target.value;
    if (selectedAnswer == storeData.correct_answer) {
      storeAnswer.push({
        question: storeData.question,
        userAnswer: selectedAnswer,
      });
    }
  }
}

function finalScore() {
  score = storeAnswer.length;
}
