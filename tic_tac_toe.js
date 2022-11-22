const boardId = 'board';
const boardNum = 3;

let turn = true; // true -> Player 'O' false -> Player 'X'
let gameStop = false;
let state = [];

// 전체 초기화 함수
function init() {
  stateInit();
  boardInit();
}

// state 초기화 해주는 함수
function stateInit() {
  state = [];

  for (let i = 0; i < boardNum; i++) {
    let col = [];
    for (let j = 0; j < boardNum; j++) {
      col.push(0);
    }
    state.push(col);
  }
}

// 게임판 초기화
function boardInit() {
  const board = document.getElementById(boardId)
  board.innerHTML = '';
  const cells = makeCells();

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[0].length; j++) {
      board.append(cells[i][j]);
    }
  }
  board.style.width = boardNum * 100 + 'px';
  board.style.height = boardNum * 100 + 'px'
}

// 게임판 Cell을 만들어주는 함수
function makeCells() {
  const cells = [];
  for (let i = 0; i < boardNum; i++) {
    let col = [];
    for (let j = 0; j < boardNum; j++) {
      const cell = document.createElement('div')

      cell.onclick = function () {
        return onCellClick(i, j, cell);
      };
      cell.classList.add('cell')
      col.push(cell);
    }
    cells.push(col)
  }

  return cells;
}

// Cell을 클릭했을 때 실행되는 함수
function onCellClick(i, j, $el) {
  if (gameStop) return;
  if (state[i][j]) return;

  state[i][j] = currentPlayer();
  $el.innerHTML = currentPlayer();

  setTimeout(function () {
    if (checkWinner(i, j)) {
      alert(currentPlayer() + ' win!');
      gameStop = true;

      showResetButton();
    } else {
      turn = !turn;
    }
  });
}

// 현재 유저를 확인하는 함수
function currentPlayer() {
  if (turn) return 'O';
  else return 'X';
}

// 승리 조건을 확인하는 함수
function checkWinner(x, y) {
  // col
  for (let i = 0; i < boardNum; i++) {
    if (state[x][i] !== currentPlayer()) break;
    if (i === boardNum - 1) return true;
  }

  // col
  for (let i = 0; i < boardNum; i++) {
    if (state[i][y] !== currentPlayer()) break;
    if (i === boardNum - 1) return true;
  }

  // 정대각
  if (x === y) {
    for (let i = 0; i < boardNum; i++) {
      if (state[i][i] !== currentPlayer()) break;
      if (i === boardNum - 1) return true;
    }
  }

  // 역대각
  if (x + y === boardNum - 1) {
    for (let i = 0; i < 3; i++) {
      if (state[i][boardNum - 1 - i] !== currentPlayer()) break;
      if (i === boardNum - 1) return true;
    }
  }
}

// 게임을 초기화 하는 함수
function reset() {
  turn = true;
  gameStop = false;
  stateInit();
  boardInit(boardId);

  // hide button
  const btn = document.getElementById('reset-btn')
  btn.style.visibility = 'hidden';
}

// 게임 다시하기 버튼을 보여주는 함수
function showResetButton() {
  const btn = document.getElementById('reset-btn');
  if (btn) {
    btn.style.visibility = 'visible';
    return;
  }

  const button = document.createElement('button');
  button.id = 'reset-btn';
  button.textContent = '다시하기';
  button.onclick = reset;

  document.body.append(button);
}

init();
