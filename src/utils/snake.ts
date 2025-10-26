import { item } from "./random.ts";

export const gridSize = 20;

export type Orientation = 0 | 90 | 180 | 270;

export interface SnakeEngine {
    snake: SnakeSegment[];
    foodX: number;
    foodY: number;
    headX: number;
    headY: number;
    moving: Orientation;
}

export interface SnakeSegment {
    x: number;
    y: number;
    orientation: Orientation;
    type: "body" | "tail";
}

function getFreeCells(engine: SnakeEngine) {
    const freeCells: boolean[] = new Array(gridSize * gridSize).fill(true);
    for (const segment of engine.snake)
        freeCells[index(segment.x, segment.y)] = false;
    return freeCells;
}

function index(x: number, y: number) {
    return y * gridSize + x;
}

function randomizeFood(engine: SnakeEngine) {
    const freeCells = getFreeCells(engine);
    freeCells[index(engine.foodX, engine.foodY)] = false;
    if (freeCells.length === 0) {
        restart(engine);
        return;
    }
    const target = item(freeCells.filter(e => e).map((_, i) => i))!;
    engine.foodX = target % gridSize;
    engine.foodY = Math.floor(target / gridSize);
}

export function restart(engine: SnakeEngine) {
    engine.moving = 90;
    engine.headX = gridSize / 2;
    engine.headY = gridSize / 2;
    engine.snake = [ { x: gridSize / 2 - 1, y: gridSize / 2, type: "tail", orientation: 90 } ];
    randomizeFood(engine);
}

export function step(engine: SnakeEngine) {
    const x = engine.headX + Math.round(Math.cos(engine.moving));
    const y = engine.headY + Math.round(Math.sin(engine.moving));
    const free = getFreeCells(engine);
    if (x < 1 || y < 1 || x > gridSize || y > gridSize || !free[index(x, y)]) {
        restart(engine);
        return;
    }
    const isFood = engine.foodX === x && engine.foodY === y;
    engine.headX = x;
    engine.headY = y;
    const tail = engine.snake[engine.snake.length - 1]!;
    if (isFood)
        engine.snake.unshift({ x: tail.x, y: tail.y, type: "body", orientation: tail.orientation });
    for (let i = engine.snake.length - 1; i >= 0; i--) {
        const previousOrientation = i === 0 ? engine.moving : engine.snake[i - 1]!.orientation;
        const segment = engine.snake[i]!;
        if (!isFood || segment.type !== "tail") {
            segment.x += Math.round(Math.cos(segment.orientation));
            segment.y += Math.round(Math.sin(segment.orientation));
        }
        segment.orientation = previousOrientation;
    }
    if (isFood)
        randomizeFood(engine);
}