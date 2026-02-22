import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialState,
  setDirection,
  stepState,
  placeFood,
} from '../snakeLogic.mjs';

test('snake moves one tile on step', () => {
  const state = createInitialState(10);
  const next = stepState(state);
  assert.deepEqual(next.snake[0], { x: state.snake[0].x + 1, y: state.snake[0].y });
  assert.equal(next.snake.length, state.snake.length);
});

test('snake grows and score increments when eating food', () => {
  const state = createInitialState(10);
  const foodState = {
    ...state,
    food: { x: state.snake[0].x + 1, y: state.snake[0].y },
  };
  const next = stepState(foodState);

  assert.equal(next.score, 1);
  assert.equal(next.snake.length, state.snake.length + 1);
});

test('reversing direction is ignored', () => {
  const state = createInitialState(10);
  const attempted = setDirection(state, 'left');
  assert.equal(attempted.nextDirection, 'right');
});

test('hitting wall triggers game over', () => {
  const state = {
    ...createInitialState(5),
    snake: [{ x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }],
    direction: 'right',
    nextDirection: 'right',
  };

  const next = stepState(state);
  assert.equal(next.isGameOver, true);
});

test('food placement never lands on snake', () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];

  for (let i = 0; i < 100; i += 1) {
    const food = placeFood(snake, 4);
    const overlaps = snake.some((segment) => segment.x === food.x && segment.y === food.y);
    assert.equal(overlaps, false);
  }
});
