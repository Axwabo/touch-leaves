import { item } from "./random.ts";

export const gridSize = 16;

export type Orientation = 0 | 90 | 180 | 270;

export interface SnakeEngine {
    snake: SnakeSegment[];
    foodX: number;
    foodY: number;
    head: SnakeSegment;
    nextMove: Orientation;
}

export interface SnakeSegment {
    x: number;
    y: number;
    orientation: Orientation;
    type: "head" | "body" | "tail";
}

function getFreeCells(engine: SnakeEngine) {
    const freeCells: boolean[] = new Array(gridSize * gridSize).fill(true);
    freeCells[index(engine.head.x, engine.head.y)] = false;
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

export function defaultHead(): SnakeSegment {
    return { x: gridSize / 2, y: gridSize / 2, type: "head", orientation: 0 };
}

export function restart(engine: SnakeEngine) {
    engine.nextMove = 0;
    engine.head = defaultHead();
    engine.snake = [
        { x: gridSize / 2 - 2, y: gridSize / 2, type: "tail", orientation: 0 },
        { x: gridSize / 2 - 1, y: gridSize / 2, type: "body", orientation: 0 }
    ];
    randomizeFood(engine);
}

function orientX(orientation: Orientation) {
    return Math.round(Math.cos(orientation / 180 * Math.PI));
}

function orientY(orientation: Orientation) {
    return Math.round(Math.sin(orientation / 180 * Math.PI));
}

export function step(engine: SnakeEngine) {
    const x = engine.head.x + orientX(engine.nextMove);
    const y = engine.head.y - orientY(engine.nextMove);
    const free = getFreeCells(engine);
    if (x < 1 || y < 1 || x > gridSize || y > gridSize || !free[index(x, y)]) {
        restart(engine);
        return;
    }
    const isFood = engine.foodX === x && engine.foodY === y;
    const tail = engine.snake[0]!;
    if (isFood) {
        tail.type = "body";
        engine.snake.unshift({ x: tail.x, y: tail.y, type: "tail", orientation: tail.orientation });
    }
    for (let i = 0; i < engine.snake.length; i++) {
        const next = engine.snake[i + 1] ?? engine.head;
        const segment = engine.snake[i]!;
        if (isFood && segment.type === "tail")
            continue;
        segment.x = next.x;
        segment.y = next.y;
        segment.orientation = next.orientation;
    }
    engine.head.x = x;
    engine.head.y = y;
    engine.head.orientation = engine.nextMove;
    if (isFood)
        randomizeFood(engine);
}