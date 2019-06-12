const url = 'http://roll.diceapi.com/json/d6';
let turnNumber = 0;
let rollNumber = 0;

// animate.css animation
document.querySelector('#page-wrap').classList.add('animated', 'bounceInDown');

// change dice images when dice are rolled
const updateDice = (id, roll) => {
  const dieDiv = document.querySelector(`#${id}`);
  switch (roll) {
    case 1:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="1" src="diefaces1.png"/>';
      break;
    case 2:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="2" src="diefaces2.png"/>';
      break;
    case 3:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="3" src="diefaces3.png"/>';
      break;
    case 4:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="4" src="diefaces4.png"/>';
      break;
    case 5:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="5" src="diefaces5.png"/>';
      break;
    case 6:
      dieDiv.innerHTML = '<img style="width: 34px; z-index: 2;" id="6" src="diefaces6.png"/>';
      break;
  }
};

// roll all available dice
const rollAll = () => {
  if (rollNumber < 3) {
    const diceRoll = document.createElement('audio');
    diceRoll.src = 'diceRoll.mp3';
    diceRoll.play();
    setTimeout(async () => {
      const dice = document.querySelectorAll('.die');
      for (const die of dice) {
        if (die.className !== 'die active') {
          const response = await axios.get(url);
          const result = response.data.dice[0];
          const roll = result.value;
          updateDice(die.id, roll);
        }
      }
      const rollSpan = document.getElementById('rollSpan');
      rollNumber += 1;
      rollSpan.textContent = rollNumber;
    }, 1000);
  }
};

// hold selected dice
const lockDie = (id) => {
  const die = document.querySelector(`#${id}`);
  if (die.innerHTML !== '') {
    if (die.className === 'die active') {
      die.style = 'border: 1px solid black;';
      die.className = 'die';
    } else {
      die.style = 'border: 2px solid rgb(255, 0, 0);';
      die.className += ' active';
    }
  }
};

const resetRollNumber = () => {
  rollNumber = 0;
  turnNumber += 1;
  const rollSpan = document.getElementById('rollSpan');
  rollSpan.textContent = rollNumber;
  const dice = document.querySelectorAll('.die');
  for (const die of dice) {
    die.innerHTML = '';
    die.style = 'border: 2px solid black;';
    die.className = 'die';
  }
  const upperSectionScore = document.querySelectorAll('.top-scores');
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
    endGame();
  }
};

function endGame() {
  const scoreSpans = document.querySelectorAll('.score-span');
  const totalScoresArray = [];
  for (const span of scoreSpans) {
    if (span.textContent === '') {
      span.textContent = '0';
    }
    totalScoresArray.push(span.textContent);
  }
  let totalSum = totalScoresArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

  const topSection = document.querySelectorAll('.top-scores');
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

  setTimeout(() => {
    Swal.fire({
      title: 'Game Over!',
      animation: false,
      customClass: {
        popup: 'animated zoomIn',
      },
    });

    document.querySelector('.swal2-confirm').addEventListener('click', () => {
      document.location.reload();
    });
  }, 750);
}

const sortDiceArray = (number) => {
  if (number === 'none') {
    const dice = document.querySelectorAll('.die');
    const diceArray = [];
    for (const die of dice) {
      const child = (die.firstElementChild || die.firstChild);
      diceArray.push(child.id);
    }
    const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return sortedArray;
  }
  const dice = document.getElementsByClassName('die');
  const diceArray = [];
  for (const die of dice) {
    const child = (die.firstElementChild || die.firstChild);
    if (child.id == number) {
      diceArray.push(child.id);
    }
  }
  const sortedArray = diceArray.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  return sortedArray;
};

const scoreTop = (divID, number) => {
  const div = document.querySelector(`#${divID}`);
  if (div.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray(number);
    const sum = sortedDiceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    div.textContent = sum;
    resetRollNumber();
  }
};

const scoreThreeKind = () => {
  const threeKind = document.querySelector('#three-kind');
  if (threeKind.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');

    const first = sortedDiceArray[0];
    const middle = sortedDiceArray[2];
    const last = sortedDiceArray[4];

    const firstArray = [];
    const middleArray = [];
    const lastArray = [];

    for (const number of sortedDiceArray) {
      switch (number) {
        case first:
          firstArray.push(number);
          break;
        case middle:
          middleArray.push(number);
          break;
        case last:
          lastArray.push(number);
          break;
      }
    }
    if (firstArray.length >= 3 || middleArray.length >= 3 || lastArray.length >= 3) {
      const sum = sortedDiceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
      threeKind.textContent = sum;
    } else {
      threeKind.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreFourKind = () => {
  const fourKind = document.querySelector('#four-kind');
  if (fourKind.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');

    const first = sortedDiceArray[0];
    const last = sortedDiceArray[4];

    const firstArray = [];
    const lastArray = [];

    for (const number of sortedDiceArray) {
      switch (number) {
        case first:
          firstArray.push(number);
          break;
        case last:
          lastArray.push(number);
          break;
      }
    }
    if (firstArray.length >= 4 || lastArray.length >= 4) {
      const sum = sortedDiceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
      fourKind.textContent = sum;
    } else {
      fourKind.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreFullHouse = () => {
  const fullHouse = document.querySelector('#full-house');
  if (fullHouse.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');

    const first = sortedDiceArray[0];
    const last = sortedDiceArray[4];

    const firstArray = [];
    const lastArray = [];

    for (const number of sortedDiceArray) {
      switch (number) {
        case first:
          firstArray.push(number);
          break;
        case last:
          lastArray.push(number);
          break;
      }
    }
    if ((firstArray.length === 3 && lastArray.length === 2) || (firstArray.length === 2 && lastArray.length === 3)) {
      fullHouse.textContent = '25';
    } else {
      fullHouse.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreSmallStraight = () => {
  const smallStraight = document.querySelector('#small-straight');
  if (smallStraight.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');
    const uniqueItems = [...new Set(sortedDiceArray)];

    if (uniqueItems.length === 1) {
      const firstFour = sortedDiceArray.slice(0, 4).join('');
      const lastFour = sortedDiceArray.slice(1, 5).join('');

      const smallStraight = document.getElementById('small-straight');

      if (
        firstFour === '1234' ||
        firstFour === '2345' ||
        firstFour === '3456' ||
        lastFour === '1234' ||
        lastFour === '2345' ||
        lastFour === '3456'
      ) {
        smallStraight.textContent = '30';
      } else {
        smallStraight.textContent = '0';
      }
    } else if (uniqueItems.length === 1) {
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
  if (largeStraight.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');
    if (winningArrays[0].join('') === sortedDiceArray.join('') || winningArrays[1].join('') === sortedDiceArray.join('')) {
      largeStraight.textContent = '40';
    } else {
      largeStraight.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreYahtzee = () => {
  const yahtzee = document.querySelector('#yahtzee');
  if (yahtzee.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');
    const uniqueItems = [...new Set(sortedDiceArray)];
    if (uniqueItems.length === 1) {
      yahtzee.textContent = '50';
    } else {
      yahtzee.textContent = '0';
    }
    resetRollNumber();
  }
};

const scoreChance = () => {
  const chanceDiv = document.querySelector('#chance');
  if (chanceDiv.textContent === '' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');
    const sum = sortedDiceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    chanceDiv.textContent = sum;
    resetRollNumber();
  }
};

const scoreBonus = () => {
  const bonusDiv = document.querySelector('#bonus');
  const yahtzee = document.querySelector('#yahtzee');
  if (bonusDiv.textContent === '' && yahtzee.textContent === '50' && rollNumber > 0) {
    const sortedDiceArray = sortDiceArray('none');
    const uniqueItems = [...new Set(sortedDiceArray)];
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '100';
    } else {
      bonusDiv.textContent = '0';
    }
    resetRollNumber();
  } else if (bonusDiv.textContent === '100') {
    const sortedDiceArray = sortDiceArray('none');
    const uniqueItems = [...new Set(sortedDiceArray)];
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '200';
    }
    resetRollNumber();
  } else if (bonusDiv.textContent === '200') {
    const sortedDiceArray = sortDiceArray('none');
    const uniqueItems = [...new Set(sortedDiceArray)];
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '300';
    }
    resetRollNumber();
  }
};

const reset = () => {
  const dice = document.querySelectorAll('.die');
  for (const die of dice) {
    die.textContent = '';
    die.style = 'border: 2px solid black;';
    die.className = 'die';
  }
  const scoreSpans = document.querySelectorAll('.score-span');
  for (const span of scoreSpans) {
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