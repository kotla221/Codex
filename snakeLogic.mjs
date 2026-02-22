export const GRID_SIZE = 16;

export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

export function createInitialState(gridSize = GRID_SIZE) {
  const mid = Math.floor(gridSize / 2);
  const snake = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];

  return {
    gridSize,
    snake,
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    isGameOver: false,
    isPaused: false,
    food: placeFood(snake, gridSize),
  };
}

export function setDirection(state, direction) {
  if (!DIRECTIONS[direction]) return state;
  if (OPPOSITES[state.direction] === direction) return state;
  return { ...state, nextDirection: direction };
}

export function togglePause(state) {
  if (state.isGameOver) return state;
  return { ...state, isPaused: !state.isPaused };
}

export function stepState(state) {
  if (state.isGameOver || state.isPaused) return state;

  const direction = state.nextDirection;
  const vector = DIRECTIONS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + vector.x, y: head.y + vector.y };

  if (isOutOfBounds(nextHead, state.gridSize)) {
    return { ...state, direction, isGameOver: true };
  }

  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const baseBody = ateFood ? state.snake : state.snake.slice(0, -1);

  if (hitsBody(nextHead, baseBody)) {
    return { ...state, direction, isGameOver: true };
  }

  const nextSnake = [nextHead, ...baseBody];
  const nextScore = ateFood ? state.score + 1 : state.score;
  const food = ateFood ? placeFood(nextSnake, state.gridSize) : state.food;

  return {
    ...state,
    snake: nextSnake,
    direction,
    score: nextScore,
    food,
  };
}

export function placeFood(snake, gridSize = GRID_SIZE) {
  const occupied = new Set(snake.map((segment) => `${segment.x}:${segment.y}`));
  const freeCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const key = `${x}:${y}`;
      if (!occupied.has(key)) freeCells.push({ x, y });
    }
  }

  if (freeCells.length === 0) return snake[0];

  const index = Math.floor(Math.random() * freeCells.length);
  return freeCells[index];
}

function isOutOfBounds(point, gridSize) {
  return point.x < 0 || point.y < 0 || point.x >= gridSize || point.y >= gridSize;
}

function hitsBody(head, body) {
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}
