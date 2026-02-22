import {
  GRID_SIZE,
  createInitialState,
  setDirection,
  stepState,
  togglePause,
} from './snakeLogic.mjs';

const TICK_MS = 140;

const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');

let state = createInitialState(GRID_SIZE);

function buildBoard() {
  boardEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
  boardEl.innerHTML = '';

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    boardEl.appendChild(cell);
  }
}

function render() {
  const cells = boardEl.children;
  for (const cell of cells) {
    cell.classList.remove('snake', 'food');
  }

  for (const segment of state.snake) {
    const idx = segment.y * GRID_SIZE + segment.x;
    cells[idx]?.classList.add('snake');
  }

  const foodIdx = state.food.y * GRID_SIZE + state.food.x;
  cells[foodIdx]?.classList.add('food');

  scoreEl.textContent = String(state.score);
  if (state.isGameOver) {
    statusEl.textContent = 'Game Over';
  } else if (state.isPaused) {
    statusEl.textContent = 'Paused';
  } else {
    statusEl.textContent = 'Running';
  }

  pauseBtn.textContent = state.isPaused ? 'Resume' : 'Pause';
}

function restartGame() {
  state = createInitialState(GRID_SIZE);
  render();
}

function onDirectionInput(direction) {
  state = setDirection(state, direction);
}

document.addEventListener('keydown', (event) => {
  const map = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    a: 'left',
    s: 'down',
    d: 'right',
  };

  if (event.code === 'Space') {
    state = togglePause(state);
    render();
    return;
  }

  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const direction = map[key];
  if (direction) {
    event.preventDefault();
    onDirectionInput(direction);
  }
});

document.querySelectorAll('[data-dir]').forEach((button) => {
  button.addEventListener('click', () => onDirectionInput(button.dataset.dir));
});

restartBtn.addEventListener('click', restartGame);
pauseBtn.addEventListener('click', () => {
  state = togglePause(state);
  render();
});

setInterval(() => {
  state = stepState(state);
  render();
}, TICK_MS);

buildBoard();
render();
