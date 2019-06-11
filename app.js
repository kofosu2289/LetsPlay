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
  const die = document.getElementById(id);
  if (die.textContent !== '0') {
    if (die.className === 'die active') {
      die.style.border = '1px solid black;';
      die.className = 'die';
    } else {
      die.style.border = '1px solid yellow;';
      die.className += ' active';
    }
  }
};

const resetRollNumber = () => {
  rollNumber = 0;
  turnNumber += 1;
  console.log(turnNumber);
  const rollSpan = document.querySelector('#rollSpan');
  rollSpan.textContent = rollNumber;
  const dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0';
    die.style.border = '1px solid black;';
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
    const totalSum = totalScoresArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    const topSection = document.getElementsByClassName('top-scores');
    let topSectionArray = []
    for (let score of topSection) {
      topSectionArray.push(score.textContent);
    }
    const topSum = topSectionArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    if (topSum >= 63) {
      totalSum = totalSum + 35;
    }

    const rollBtn = document.querySelector('#roll-btn');
    rollBtn.disabled = true;
    const totalDiv = document.querySelector('#total');
    totalDiv.textContent = 'Total: ' + totalSum;
  }
};

const scoreTop = (divID, number) => {
  const div = document.getElementById(divID);
  if (div.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (let die of dice) {
      if (die.textContent == number) {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    div.textContent = sum;
    resetRollNumber();
  }
};

const scoreThreeKind = () => {
  const threeKind = document.querySelector('#three-kind');
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
  const fourKind = document.querySelector('#four-kind');
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
  const fullHouse = document.querySelector('#full-house');
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
    if ((firstArray.length === 3 &&
        lastArray.length === 2) || (firstArray.length === 2 && lastArray.length === 3)) {
      fullHouse.textContent = '25';
    } else {
      fullHouse.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreSmallStraight = () => {
  const smallStraight = document.querySelector('#small-straight');
  if (smallStraight.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));
    const uniqueItems = [...new Set(sortedArray)];
    if (uniqueItems.length === 5) {
      const firstFour = sortedArray.slice(0, 4).join('');
      const lastFour = sortedArray.slice(1, 5).join('');

      const smallStraight = document.querySelector('#small-straight');

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
      const joinedUnique = uniqueItems.join('');
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
  const largeStraight = document.querySelector('#large-straight');
  if (largeStraight.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));
    if (winningArrays[0].join('') === sortedArray.join('') ||
      winningArrays[1].join('') === sortedArray.join('')) {
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
}

const scoreChance = () => {
  const chanceDiv = document.querySelector('#chance');
  if (chanceDiv.textContent === '') {
    const dice = document.getElementsByClassName('die');
    let diceArray = [];
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