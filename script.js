// ARRAYS

let quoteArray = [
  "Never let people distract you from being you",
  "Life begins at the end of your comfort zone",
  "Don't stumble on something behind you",
  "Progress not perfection",
  "Stop comparing your highs to their lows",
  "Good nor bad things last forever",
  "If you talk then it's harder to listen",
  "Stop creating competitions that don't exist",
  "Your fear of looking stupid is holding you back",
  "Forget the mistake, remember the lesson",
  "Their idea of you isn't your responsibility to live up to"
];

let randomArray = [
  "elephant stop not want logic happening remember",
  "creations Indian life element lyrics live",
  "accuracy book large should in miss mean play got",
  "will made never head work leave talk take sound",
  "animal thing might call must where began answer at great",
];



let timeLimit = 60;
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let start = document.querySelector(".start")
let timeLeft = timeLimit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote(mainArray) {
  quote_text.textContent = null;
  current_quote = mainArray[quoteNo];

  //seperating each character 
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  if (quoteNo < mainArray.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    if (typedChar == null) {
      char.classList.remove('correct');
      char.classList.remove('incorrect');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct');
      char.classList.remove('incorrect');

      // incorrect characters
    } else {
      char.classList.add('incorrect');
      char.classList.remove('correct');
      errors++;
    }
  });

  error_text.textContent = total_errors + errors;
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  if (curr_input.length == current_quote.length) {
    updateQuote();
    total_errors += errors;
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timer_text.textContent = timeLeft + "s";
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);

  input_area.disabled = true;
  quote_text.textContent = "Click on restart to start a new game.";
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  wpm_text.textContent = wpm;
  wpm_group.style.display = "block";
  start.style.display = "none";
}


function userOption () {

  value = document.getElementById("selection").value;

  let mainArray;

  // quote array default
  if (value == 0) {
    mainArray = quoteArray;
  } else if (value == 1) {
    mainArray = quoteArray;
  } else if (value == 2) {
    mainArray = randomArray; // not done yet
  } else {
    mainArray = quoteArray;
  } 

  mainOne(mainArray);

}

function mainOne(mainArray, start) {
  document.getElementById("startBtn").addEventListener("click", function() {
    value = document.getElementById("selection").value;
    if(value == 0) {
      document.getElementById("demo").innerHTML = "Select a mode";
    } else {
      startGame(mainArray);
    }
       
  }); 
}



function startGame(mainArray) {

  updateQuote(mainArray);
  clearInterval(timer);
  timer = setInterval(updateTimer, 100);
}

function resetGame() {}