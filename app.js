let turnNumber = 0;
let rollNumber = 0;

const updateDice = (id, roll) => {
  const dieDiv = document.getElementById(id);
  dieDiv.textContent = roll;
};

const rollAll = () => {
  if (rollNumber < 3) {
    const dice = document.getElementsByClassName('die');
    for (let die of dice) {
      if (die.className !== 'die active') {
        const roll = (Math.floor((Math.random() * 6) + 1));
        updateDice(die.id, roll);
      }
    }
    const rollSpan = document.querySelector('#rollSpan');
    rollNumber += 1;
    rollSpan.textContent = rollNumber;
  }
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
  rollNumber = 0;
  turnNumber++;
  console.log(turnNumber);
  const rollSpan = document.querySelector('#rollSpan');
  rollSpan.textContent = rollNumber;
  const dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0';
    die.style = 'border: 1px solid black;';
    die.className = 'die';
  }
  if (turnNumber === 13) {
    // game over
    const scoreSpans = document.getElementsByClassName('score-span');
    const totalScoresArray = [];
    for (let span of scoreSpans) {
      if (span.textContent === '') {
        span.textContent = '0';
      }
      totalScoresArray.push(span.textContent);
    }
    let totalSum = totalScoresArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const topSection = document.getElementsByClassName('top-scores');
    const topSectionArray = [];
    for (let score of topSection) {
      topSectionArray.push(score.textContent);
    }
    const topSum = topSectionArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    if (topSum >= 63) {
      totalSum += 35;
    }

    const rollBtn = document.getElementById('roll-btn');
    rollBtn.disabled = true;
    const totalDiv = document.getElementById('total');
    totalDiv.textContent = 'Total: ' + totalSum;
  }
};

const scoreOnes = () => {
  const onesDiv = document.getElementById('ones');
  if (onesDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '1') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    onesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreTwos = () => {
  const twosDiv = document.getElementById('twos');
  if (twosDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '2') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    twosDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreThrees = () => {
  const threesDiv = document.getElementById('threes');
  if (threesDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '3') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    threesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreFours = () => {
  const foursDiv = document.getElementById('fours');
  if (foursDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '4') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    foursDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreFives = () => {
  const fivesDiv = document.getElementById('fives');
  if (fivesDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '5') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    fivesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreSixes = () => {
  const sixesDiv = document.getElementById('sixes');
  if (sixesDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '6') {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    sixesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreThreeKind = () => {
  const threeKind = document.getElementById('three-kind');
  if (threeKind.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));

    const first = sortedArray[0];
    const middle = sortedArray[2];
    const last = sortedArray[4];

    const firstArray = [];
    const middleArray = [];
    const lastArray = [];

    for (let number of sortedArray) {
      if (number === first) {
        firstArray.push(number);
      }
      if (number === middle) {
        middleArray.push(number);
      }
      if (number === last) {
        lastArray.push(number);
      }
    }
    if (firstArray.length === 3 || middleArray.length === 3 || lastArray.length === 3) {
      const sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      threeKind.textContent = sum;
    } else {
      threeKind.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreFourKind = () => {
  const fourKind = document.getElementById('four-kind');
  if (fourKind.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));

    const first = sortedArray[0];
    const last = sortedArray[4];

    const firstArray = [];
    const lastArray = [];

    for (let number of sortedArray) {
      if (number === first) {
        firstArray.push(number);
      }
      if (number === last) {
        lastArray.push(number);
      }
    }
    if (firstArray.length >= 4 || lastArray.length >= 4) {
      const sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      fourKind.textContent = sum;
    } else {
      fourKind.textContent = '0';
    }
    resetRollNumber();
  }
};


const scoreFullHouse = () => {
  const fullHouse = document.getElementById('full-house');
  if (fullHouse.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));

    const first = sortedArray[0];
    const last = sortedArray[4];

    const firstArray = [];
    const lastArray = [];

    for (let number of sortedArray) {
      if (number === first) {
        firstArray.push(number);
      }
      if (number === last) {
        lastArray.push(number);
      }
    }
    if ((firstArray.length === 3 && lastArray.length === 2) ||
      (firstArray.length === 2 && lastArray.length === 3)) {
      fullHouse.textContent = '25';
    } else {
      fullHouse.textContent = '0';
    }
    resetRollNumber();
  }
};


const scoreSmallStraight = () => {
  const smallStraight = document.getElementById('small-straight');
  if (smallStraight.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));
    const uniqueItems = [...new Set(sortedArray)]
    if (uniqueItems.length === 5) {
      const firstFour = sortedArray.slice(0, 4).join('');
      const lastFour = sortedArray.slice(1, 5).join('');
      if (
        firstFour === '1234' ||
        firstFour === '2345' ||
        firstFour === '3456' ||
        lastFour === '1234' ||
        lastFour === '2345' ||
        lastFour === '3456'
      ) {
        console.log('score small straight');
        smallStraight.textContent = '30';
      } else {
        smallStraight.textContent = '0';
      }
    } else if (uniqueItems.length === 4) {
      let joinedUnique = uniqueItems.join('');

      if (
        joinedUnique === '1234' ||
        joinedUnique === '2345' ||
        joinedUnique === '3456'
      ) {
        smallStraight.textContent = '30';
      } else {
        smallStraight.textContent = '0';
      }
    } else {
      smallStraight.textContent = '0';
    }
    resetRollNumber();
  }
};


const scoreLargeStraight = () => {
  const winningArrays = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];
  const largeStraight = document.getElementById('large-straight');
  if (largeStraight.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));
    if (winningArrays[0].join('') === sortedArray.join('') || winningArrays[1].join('') === sortedArray.join('')) {
      largeStraight.textContent = '40';
    } else {
      largeStraight.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreYahtzee = () => {
  const yahtzee = document.querySelector('#yahtzee');
  if (yahtzee.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const scoreArray = [];
    for (let i = 1; i < (diceArray.length + 1); i++) {
      if (diceArray[0] === diceArray[i]) {
        scoreArray.push(diceArray[i]);
      }
    }
    if (scoreArray.length === 4 && scoreArray[0] !== '0') {
      yahtzee.textContent = '50';
    } else {
      yahtzee.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreChance = () => {
  const chanceDiv = document.querySelector('#chance');
  if (chanceDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    chanceDiv.textContent = sum;
    resetRollNumber();
  }
};


const scoreBonus = () => {
  const bonusDiv = document.querySelector('#bonus');
  const yahtzee = document.querySelector('#yahtzee');
  if (bonusDiv.textContent === '' && yahtzee.textContent === '50') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const scoreArray = [];
    for (let i = 1; i < (diceArray.length + 1); i++) {
      if (diceArray[0] === diceArray[i]) {
        scoreArray.push(diceArray[i]);
      }
    }
    if (scoreArray.length === 4 && scoreArray[0] !== '0') {
      bonusDiv.textContent = '100';
    } else {
      bonusDiv.textContent = '0';
    }
    resetRollNumber();
  }
};

const reset = () => {
  const dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0';
    die.style.border = '1px solid black;';
    die.className = 'die';
  }
  const scoreSpans = document.getElementsByClassName('score-span');
  for (let span of scoreSpans) {
    span.textContent = '';
  }
  rollNumber = 0;
  turnNumber = 0;
  const rollSpan = document.querySelector('#rollSpan');
  rollSpan.textContent = rollNumber;
  const totalDiv = document.querySelector('#total');
  totalDiv.textContent = 'Total: ';
  const rollBtn = document.querySelector('#roll-btn');
  rollBtn.disabled = false;
};


document.querySelector('.ones').addEventListener('click', scoreOnes);
document.querySelector('.twos').addEventListener('click', scoreTwos);
document.querySelector('.threes').addEventListener('click', scoreThrees);
document.querySelector('.fours').addEventListener('click', scoreFours);
document.querySelector('.fives').addEventListener('click', scoreFives);
document.querySelector('.sixes').addEventListener('click', scoreSixes);

document.querySelector('.three-kind').addEventListener('click', scoreThreeKind);
document.querySelector('.four-kind').addEventListener('click', scoreFourKind);
document.querySelector('.full-house').addEventListener('click', scoreFullHouse);
document.querySelector('.small-straight').addEventListener('click', scoreSmallStraight);
document.querySelector('.large-straight').addEventListener('click', scoreLargeStraight);
document.querySelector('.yahtzee').addEventListener('click', scoreYahtzee);
document.querySelector('.chance').addEventListener('click', scoreChance);
document.querySelector('.bonus').addEventListener('click', scoreBonus);

document.querySelector('#dice').childNodes.forEach((child, i) => {
  if (i % 2 !== 0) {
    child.addEventListener('click', lockDie(child.id));
  }
});

document.querySelector('#roll-btn').addEventListener('click', rollAll);
document.querySelector('#reset-btn').addEventListener('click', reset);

document.querySelector('#ones').addEventListener('click', scoreOnes);
document.querySelector('#twos').addEventListener('click', scoreTwos);
document.querySelector('#threes').addEventListener('click', scoreThrees);
document.querySelector('#fours').addEventListener('click', scoreFours);
document.querySelector('#fives').addEventListener('click', scoreFives);
document.querySelector('#sixes').addEventListener('click', scoreSixes);



