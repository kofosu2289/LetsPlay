let turnNumber = 0;
let rollNumber = 0;

const updateDice = (id, roll) => {
  const dieDiv = document.querySelector(`#${id}`);
  if (roll === 1) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces1.png"/>';
  } else if (roll === 2) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces2.png"/>';
  } else if (roll === 3) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces3.png"/>';
  } else if (roll === 4) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces4.png"/>';
  } else if (roll === 5) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces5.png"/>';
  } else if (roll === 6) {
    dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" src="diefaces6.png"/>';
  }
  dieDiv.style = 'background-image: url()';
};

const rollAll = () => {
  if (rollNumber < 3) {
    const audio = new Audio('diceRoll.mp3');
    audio.play();
    const dice = document.getElementsByClassName('die');
    for (const die of dice) {
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
  const die = document.querySelector(`#${id}`);
  if (die.innerHTML !== '') {
    if (die.className === 'die active') {
      die.style.border = '1px solid black;';
      die.className = 'die';
    } else {
      die.style.border = '2px solid rgb(0, 0, 209);';
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
  for (const die of dice) {
    die.textContent = '';
    die.style.border = '1px solid black;';
    die.className = 'die';
  }
  const upperSectionScore = document.getElementsByClassName('top-scores');
  const totalTopSection = document.querySelector('#upper-section');
  const upperArray = [];
  for (const scores of upperSectionScore) {
    if (scores.textContent !== '') {
      upperArray.push(scores.textContent);
    }
  }
  if (upperArray.length === 6 && totalTopSection.textContent === '') {
    const upperSum = upperArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    totalTopSection.textContent = upperSum;
    if (upperSum >= 63) {
      totalTopSection.textContent += ` + 35 = ${upperSum + 35}`;
    }
  }
  if (turnNumber === 13) {
    // game over
    const scoreSpans = document.getElementsByClassName('score-span');
    const totalScoresArray = [];
    for (const span of scoreSpans) {
      if (span.textContent === '') {
        span.textContent = '0';
      }
      totalScoresArray.push(span.textContent);
    }
    let totalSum = totalScoresArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

    const topSection = document.getElementsByClassName('top-scores');
    const topSectionArray = [];
    for (const score of topSection) {
      topSectionArray.push(score.textContent);
    }
    const topSum = topSectionArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

    if (topSum >= 63) {
      totalSum += 35;
    }

    const rollBtn = document.querySelector('#roll-btn');
    rollBtn.disabled = true;
    const totalDiv = document.querySelector('#total');
    totalDiv.textContent = totalSum;
    Swal.fire({
      title: 'Game Over!',
      animation: false,
      customClass: {
        popup: 'animated tada',
      }
    });
  }
};

const scoreTop = (divID, number) => {
  const div = document.getElementById(divID);
  if (div.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const scoreArray = [];
    for (const die of dice) {
      if (die.textContent == number) {
        scoreArray.push(die.textContent);
      }
    }
    const sum = scoreArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    div.textContent = sum;
    resetRollNumber();
  }
};

const scoreThreeKind = () => {
  const threeKind = document.querySelector('#three-kind');
  if (threeKind.textContent === '') {
    const dice = document.getElementsByClassName('die');
    const diceArray = [];
    for (const die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

    const first = sortedArray[0];
    const middle = sortedArray[2];
    const last = sortedArray[4];

    const firstArray = [];
    const middleArray = [];
    const lastArray = [];

    for (const number of sortedArray) {
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
      const sum = diceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
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
    for (const die of dice) {
      diceArray.push(die.textContent);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

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
      const sum = diceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
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
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

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
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    // https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
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
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
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
    const sum = diceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
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
    die.textContent = '';
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
  totalDiv.textContent = '';
  const upperDiv = document.querySelector('#upper-section');
  upperDiv.textContent = '';
  const rollBtn = document.querySelector('#roll-btn');
  rollBtn.disabled = false;
};