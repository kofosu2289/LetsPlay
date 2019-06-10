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
  dieDiv.textContent = roll;
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
  let rollDiv = document.getElementById('rollDiv');
  rollDiv.textContent = rollNumber;
  let dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0';
    die.style = 'border: 1px solid black;';
    die.className = 'die';
  }
  if (turnNumber === 13) {
    // game over
    let scoreSpans = document.getElementsByClassName('score-span');
    let totalScoresArray = [];
    for (let span of scoreSpans) {
      if (span.textContent === '') {
        span.textContent = '0';
      }
      totalScoresArray.push(span.textContent);
    }
    let totalSum = totalScoresArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    let topSection = document.getElementsByClassName('top-scores');
    let topSectionArray = [];
    for (let score of topSection) {
      topSectionArray.push(score.textContent);
    }
    let topSum = topSectionArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

    if (topSum >= 63) {
      totalSum = totalSum + 35;
    }

    let rollBtn = document.getElementById('roll-btn');
    rollBtn.disabled = true;
    let totalDiv = document.getElementById('total');
    totalDiv.textContent = 'Total: ' + totalSum;
  }
};

const scoreOnes = () => {
  let onesDiv = document.getElementById('ones');
  if (onesDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '1') {
        scoreArray.push(die.textContent);
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    onesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreTwos = () => {
  let twosDiv = document.getElementById('twos');
  if (twosDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '2') {
        scoreArray.push(die.textContent);
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    twosDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreThrees = () => {
  let threesDiv = document.getElementById('threes');
  if (threesDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '3') {
        scoreArray.push(die.textContent)
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    threesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreFours = () => {
  let foursDiv = document.getElementById('fours');
  if (foursDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent === '4') {
        scoreArray.push(die.textContent);
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    foursDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreFives = () => {
  let fivesDiv = document.getElementById('fives');
  if (fivesDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent == '5') {
        scoreArray.push(die.textContent);
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    fivesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreSixes = () => {
  let sixesDiv = document.getElementById('sixes');
  if (sixesDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let scoreArray = [];
    for (let die of dice) {
      if (die.textContent == '6') {
        scoreArray.push(die.textContent);
      }
    }
    let sum = scoreArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    sixesDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreThreeKind = () => {
  let threeKind = document.getElementById('three-kind');
  if (threeKind.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent);
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b));

    let first = sortedArray[0];
    let middle = sortedArray[2];
    let last = sortedArray[4];

    let firstArray = [];
    let middleArray = [];
    let lastArray = [];

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
      let sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      threeKind.textContent = sum;
    } else {
      threeKind.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreFourKind = () => {
  let fourKind = document.getElementById('four-kind')
  if (fourKind.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))

    let first = sortedArray[0]
    let last = sortedArray[4]

    let firstArray = []
    let lastArray = []

    for (let number of sortedArray) {
      if (number === first) {
        firstArray.push(number)
      }
      if (number === last) {
        lastArray.push(number)
      }
    }
    if (firstArray.length >= 4 || lastArray.length >= 4) {
      let sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      fourKind.textContent = sum
    } else {
      fourKind.textContent = '0'
    }
    resetRollNumber()
  }
};


const scoreFullHouse = () => {
  let fullHouse = document.getElementById('full-house')
  if (fullHouse.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))

    let first = sortedArray[0]
    let last = sortedArray[4]

    let firstArray = []
    let lastArray = []

    for (let number of sortedArray) {
      if (number === first) {
        firstArray.push(number)
      }
      if (number === last) {
        lastArray.push(number)
      }
    }
    if ((firstArray.length === 3 && lastArray.length === 2) || (firstArray.length === 2 && lastArray.length === 3)) {
      fullHouse.textContent = '25'
    } else {
      fullHouse.textContent = '0'
    }
    resetRollNumber()
  }
};


const scoreSmallStraight = () => {
  let smallStraight = document.getElementById('small-straight')
  if (smallStraight.textContent === '') {

    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))
    let uniqueItems = [...new Set(sortedArray)]
    if (uniqueItems.length === 5) {
      let firstFour = sortedArray.slice(0, 4).join('')
      let lastFour = sortedArray.slice(1, 5).join('')

      let smallStraight = document.getElementById('small-straight')

      if (
        firstFour == '1234' ||
        firstFour == '2345' ||
        firstFour == '3456' ||
        lastFour == '1234' ||
        lastFour == '2345' ||
        lastFour == '3456'
      ) {
        console.log('score small straight')
        smallStraight.textContent = '30'
      } else {
        smallStraight.textContent = '0'
      }
    } else if (uniqueItems.length === 4) {
      let joinedUnique = uniqueItems.join('')

      if (
        joinedUnique == '1234' ||
        joinedUnique == '2345' ||
        joinedUnique == '3456'
      ) {
        smallStraight.textContent = '30'
      } else {
        smallStraight.textContent = '0'
      }
    } else {
      smallStraight.textContent = '0'
    }
    resetRollNumber()
  }
};


const scoreLargeStraight = () => {
  const winningArrays = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6]
  ]
  let largeStraight = document.getElementById('large-straight')
  if (largeStraight.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))
    if (winningArrays[0].join('') === sortedArray.join('') || winningArrays[1].join('') === sortedArray.join('')) {
      largeStraight.textContent = '40'
    } else {
      largeStraight.textContent = '0'
    }
    resetRollNumber()
  }
};

const scoreYahtzee = () => {
  let yahtzee = document.getElementById('yahtzee')
  if (yahtzee.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let scoreArray = [];
    for (let i = 1; i < (diceArray.length + 1); i++) {
      if (diceArray[0] === diceArray[i]) {
        scoreArray.push(diceArray[i])
      }
    }
    if (scoreArray.length === 4 && scoreArray[0] !== '0') {
      yahtzee.textContent = '50'
    } else {
      yahtzee.textContent = '0'
    }
    resetRollNumber()
  }
};

const scoreChance = () => {
  let chanceDiv = document.getElementById('chance')
  if (chanceDiv.textContent === '') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let sum = diceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    chanceDiv.textContent = sum;
    resetRollNumber()
  }
};


const scoreBonus = () => {
  let bonusDiv = document.getElementById('bonus')
  let yahtzee = document.getElementById('yahtzee')
  if (bonusDiv.textContent === '' && yahtzee.textContent === '50') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      diceArray.push(die.textContent)
    }
    let scoreArray = [];
    for (let i = 1; i < (diceArray.length + 1); i++) {
      if (diceArray[0] === diceArray[i]) {
        scoreArray.push(diceArray[i])
      }
    }
    if (scoreArray.length === 4 && scoreArray[0] !== '0') {
      bonusDiv.textContent = '100'
    } else {
      bonusDiv.textContent = '0'
    }
    resetRollNumber()
  }
};

const reset = () => {
  let dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = '0'
    die.style = 'border: 1px solid black;'
    die.className = 'die'
  }
  let scoreSpans = document.getElementsByClassName('score-span');
  for (let span of scoreSpans) {
    span.textContent = ''
  }
  rollNumber = 0
  turnNumber = 0
  let rollDiv = document.getElementById('rollDiv')
  rollDiv.textContent = rollNumber
  let totalDiv = document.getElementById('total')
  totalDiv.textContent = 'Total: '
  let rollBtn = document.getElementById('roll-btn')
  rollBtn.disabled = false
};
