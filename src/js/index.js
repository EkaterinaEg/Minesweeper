import PageContent from './page.js';
import Cell from './cell.js';

const boardSize = 10;
const ladyBugs = 10;
let timer;
let clickNumber = 0;

// create PageContent
const renderPageContent = () => {
  const content = new PageContent();
  content.buildElements();
  // return Content;
};
// ______________________________________
// Create page
renderPageContent();
// __________________________________________
// Create game field (board)

function createBoard(size) {
  const boardArray = [];
  for (let x = 0; x < size; x += 1) {
    const row = [];
    for (let y = 0; y < size; y += 1) {
      const element = new Cell();
      element.buildElements(x, y);
      element.setAttribute();

      row.push(element);
    }
    boardArray.push(row);
  }
  return boardArray;
}

// _____________________________________________

createBoard(boardSize, ladyBugs);
// __________________________________________________
const clickNumbersLabel = document.querySelector('.info__clickNumbers');
clickNumbersLabel.textContent = clickNumber;
const button = document.querySelector('.game-status__button');
const cells = document.querySelectorAll('.board__cell');
const labelTimer = document.querySelector('.info__timer');
const bugsLabel = document.querySelector('.info__bugsLeft');
bugsLabel.textContent = ladyBugs;
const screen = document.querySelector('.page__screen');

// ________________________________________________
// create ladybugs

function getBugPositions(size, bugs) {
  const positions = [];
  while (positions.length < bugs) {
    const coordinates = {
      x: Math.abs(Math.ceil(Math.random() * size - 1)),
      y: Math.abs(Math.ceil(Math.random() * size - 1)),
    };

    if (
      !positions.some(
        (position) => position.x === coordinates.x && position.y === coordinates.y,
      )
    ) {
      positions.push(coordinates);
    }
  }

  return positions;
}

const cellsCoord = [];
cells.forEach((cell) => cellsCoord.push(cell.getAttribute('data-coord')));

const bugsCoor = getBugPositions(boardSize, ladyBugs);

// Place ladybugs in board
function addBugsToBoard() {
  for (let i = 0; i < cells.length; i += 1) {
    bugsCoor.forEach((bug) => {
      if (
        Number(cells[i].getAttribute('data-x')) === bug.x
        && Number(cells[i].getAttribute('data-y')) === bug.y
      ) {
        cells[i].classList.add('bugged');
      }
    });
  }
}
addBugsToBoard();

cells.forEach((cell) => cell.addEventListener('click', (event) => {
  if (!timer) {
    timer = setTimer();
  }
  // _________________________________________
  // const a = Number(event.target.getAttribute("data-x"));
  // const b = Number(event.target.getAttribute("data-y"));
  // positions.push({ x: a, y: b });

  // ________________________________________________
  if (event.target.classList.contains('bugged')) {
    clickNumbersLabel.textContent = `${clickNumber}`;
    // screen.textContent = "Game over. Try again";
    if (!event.target.classList.contains('marked')) {
      clickNumber += 1;
      cells.forEach((el) => {
        el.classList.remove('closed');
        el.classList.remove('marked');
        el.classList.add('opened');

        screen.textContent = 'Game over. Try again';
        if (timer) clearInterval(timer);

        if (el.classList.contains('bugged')) {
          // eslint-disable-next-line no-param-reassign
          el.textContent = '🐞';
        }
      });
    }
  } else {
    if (
      event.target.classList.contains('closed')
        && !event.target.classList.contains('marked')
    ) {
      clickNumber += 1;
      clickNumbersLabel.textContent = `${clickNumber}`;

      event.target.classList.remove('closed');
      event.target.classList.remove('marked');
      event.target.classList.add('opened');
      checkWin();
      revealEmptyCells(event.target);
    }
    if (
      event.target.classList.contains('closed')
        && event.target.classList.contains('marked')
    ) {
      return;
    }
    if (
      event.target.classList.contains('numbered')
        && !event.target.classList.contains('marked')
    ) {
      // eslint-disable-next-line no-param-reassign
      event.target.style.fontSize = '3rem';
    }
  }
}));

// right mouse button
cells.forEach((cell) => {
  cell.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (!timer) {
      timer = setTimer();
    }
    if (event.target.classList.contains('closed')) {
      event.target.classList.toggle('marked');
      numberBugsLeft();
    }
  });
});
// addBugsToBoard();
const buggedCells = document.querySelectorAll('.bugged');
// console.log(buggedCells);
// implement numbers (bugs around)

function nearbyCell(tile) {
  const bugsNumber = [];
  for (let a = -1; a <= 1; a += 1) {
    for (let b = -1; b <= 1; b += 1) {
      const x = Number(tile.getAttribute('data-x')) + a;
      const y = Number(tile.getAttribute('data-y')) + b;
      const c = `${x}${y}`;
      // let c = { tile };
      if (x >= 0 && y >= 0 && x < 10 && y < 10) {
        bugsNumber.push([c, x, y]);
      }
    }
  }
  return bugsNumber;
}

const nearbyCells = [];
buggedCells.forEach((cell) => {
  nearbyCells.push(nearbyCell(cell));
});
// console.log(nearbyCells);
const mappingNearbyCells = []; // only data-coord around bugs in Array

for (let i = 0; i < nearbyCells.length; i += 1) {
  nearbyCells[i].forEach((el) => mappingNearbyCells.push(el[0]));
}
// calculate how many times cell is included in every group of nearby cells
const numberBugsAround = mappingNearbyCells.reduce((acc, el) => {
  acc[el] = (acc[el] || 0) + 1;
  return acc;
}, {});
// console.log(numberBugsAround);
// Place numbers in board

cells.forEach((el) => {
  if (
    numberBugsAround[el.getAttribute('data-coord')]
    && !el.classList.contains('bugged')
  ) {
    el.classList.add('numbered');

    // eslint-disable-next-line no-param-reassign
    el.textContent = numberBugsAround[el.getAttribute('data-coord')];
    // eslint-disable-next-line no-use-before-define
    colorNumbers(el);
  } else {
    // eslint-disable-next-line no-param-reassign
    el.textContent = '';
  }
});

function colorNumbers(cell) {
  if (cell.textContent === '1') {
    // eslint-disable-next-line no-param-reassign
    cell.style.color = 'dark-green';
  }
  if (cell.textContent === '2') {
    // eslint-disable-next-line no-param-reassign
    cell.style.color = 'blue';
  }
  if (cell.textContent === '3') {
    // eslint-disable-next-line no-param-reassign
    cell.style.color = 'red';
  }
  if (cell.textContent === '4') {
    // eslint-disable-next-line no-param-reassign
    cell.style.color = 'yellow';
  }
  if (cell.textContent >= '5') {
    // eslint-disable-next-line no-param-reassign
    cell.style.color = 'white';
  }
}

// Open cells around clicked cell to bugged or marked cell
function revealEmptyCells(cell) {
  const d = [];
  cells.forEach((element) => {
    nearbyCell(cell).forEach((el) => {
      if (element.getAttribute('data-coord') === el[0]) {
        d.push(element); // list of cells nearby with correct names
      }
    });
  });
  const bugged = d.filter(
    (el) => el.classList.contains('bugged') || el.classList.contains('marked'),
  ).length;
  // console.log(bugged);
  if (bugged === 0) {
    d.forEach((elem) => {
      if (!elem.classList.contains('checked')) {
        elem.classList.add('checked');
        elem.classList.remove('closed');
        elem.classList.add('opened');
        // eslint-disable-next-line no-param-reassign
        elem.style.fontSize = '3rem';
        revealEmptyCells(elem);
      }
    });
  }
}
// _____________________________________________
function checkWin() {
  const markedBuggs = Array.from(buggedCells).every((el) => el.classList.contains('marked'));
  const numberClosedLeft = Array.from(cells).filter((cell) => cell.classList.contains('closed')).length;

  if (markedBuggs && numberClosedLeft === ladyBugs) {
    screen.textContent = 'You win!!!!!';
    if (timer) clearInterval(timer);
  }
}
// Create timer

function setTimer() {
  let time = 0;
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    time += 1;
  }

  tick();
  const timerEl = setInterval(tick, 1000);

  return timerEl;
}
// Calculate how many bugs left after each marked cell
function numberBugsLeft() {
  const bugsCount = Array.from(cells).filter((cell) => cell.classList.contains('marked')).length;
  // console.log(bugsCount);
  bugsLabel.textContent = ladyBugs - `${bugsCount}`;
}

// left mouse button

// button New game
button.addEventListener('click', () => {
  if (timer) clearInterval(timer);
  timer = setTimer();
});
