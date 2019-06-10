let turnNumber = 0;
let rollNumber = 0;

const rollAll = () => {
  if (rollNumber < 3) {
    const dice = document.getElementsByClassName('die');
    for (let die of dice) {
      if (die.className !== 'die active') {
        let roll = (Math.floor((Math.random() * 6) + 1));
        updateDice(die.id, roll);
      }
    }
    let rollDiv = document.querySelector('#rollDiv');
    rollNumber += 1;
    rollDiv.textContent = rollNumber;
  }
};

const updateDice = (id, roll) => {
  let dieDiv = document.getElementById(id);
  dieDiv.textContent = roll
};

const lockDie = (id) => {
  let die = document.getElementById(id);
  if (die.textContent !== '0') {
    if (die.className === 'die active') {
      die.style.border = '1px solid black;';
      die.className = 'die';
    } else {
      die.style.border = '1px solid yellow;';
      die.className += 'active';
    }
  }
};

const resetRollNumber = () => {
  rollNumber = 0
  turnNumber++
  console.log(turnNumber)
  let rollDiv = document.getElementById('rollDiv')
  rollDiv.textContent = rollNumber
  let dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0'
    die.style = 'border: 1px solid black;'
    die.className = 'die'
  }
  if (turnNumber === 13) {
    // game over
    let scoreSpans = document.getElementsByClassName('score-span');
    let totalScoresArray = []
    for (let span of scoreSpans) {
      if (span.textContent === '') {
        span.textContent = '0'
      }
      totalScoresArray.push(span.textContent)
    }
    let totalSum = totalScoresArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    let topSection = document.getElementsByClassName('top-scores')
    let topSectionArray = []
    for (let score of topSection) {
      topSectionArray.push(score.textContent)
    }
    let topSum = topSectionArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    if (topSum >= 63) {
      totalSum = totalSum + 35
    }

    let rollBtn = document.getElementById('roll-btn')
    rollBtn.disabled = true
    let totalDiv = document.getElementById('total')
    totalDiv.textContent = 'Total: ' + totalSum
  }
};

const scoreOnes = () => {
  let onesDiv = document.getElementById('ones');
  if (onesDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent == '1') {
        scoreArray.push(die.textContent)
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    onesDiv.textContent = sum;
    resetRollNumber();
  }
};