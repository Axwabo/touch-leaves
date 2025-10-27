import { item } from "./random.ts";
import { reactive } from "vue";

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
    return (y - 1) * gridSize + (x - 1);
}

function randomizeFood(engine: SnakeEngine) {
    const freeCells = getFreeCells(engine);
    freeCells[index(engine.foodX, engine.foodY)] = false;
    if (freeCells.length === 0) {
        restart(engine);
        return;
    }
    const target = item(freeCells.map((e, i) => ({ e, i })).filter(e => e.e))!.i;
    engine.foodX = (target) % gridSize + 1;
    engine.foodY = Math.floor((target) / gridSize) + 1;
}

function orientX(orientation: Orientation) {
    return Math.round(Math.cos(orientation / 180 * Math.PI));
}

function orientY(orientation: Orientation) {
    return Math.round(Math.sin(orientation / 180 * Math.PI));
}

function turn(orientation: Orientation, engine: SnakeEngine) {
    if (orientation !== (engine.head.orientation + 180) % 360)
        engine.nextMove = orientation;
}

function defaultHead(): SnakeSegment {
    return { x: gridSize / 2, y: gridSize / 2, type: "head", orientation: 0 };
}

export function restart(engine: SnakeEngine) {
    engine.nextMove = 0;
    engine.head = defaultHead();
    engine.foodX = 1;
    engine.foodY = 1;
    engine.snake = [
        { x: gridSize / 2 - 2, y: gridSize / 2, type: "tail", orientation: 0 },
        { x: gridSize / 2 - 1, y: gridSize / 2, type: "body", orientation: 0 }
    ];
    randomizeFood(engine);
}

export function step(engine: SnakeEngine, eatCallback: () => void) {
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
    if (!isFood)
        return;
    randomizeFood(engine);
    eatCallback();
}

export function handleKey(key: string, engine: SnakeEngine) {
    switch (key) {
        case "ArrowRight":
        case "D":
            turn(0, engine);
            break;
        case "ArrowUp":
        case "W":
            turn(90, engine);
            break;
        case "ArrowLeft":
        case "A":
            turn(180, engine);
            break;
        case "ArrowDown":
        case "S":
            turn(270, engine);
            break;
    }
}

export function createSnakeEngine() {
    const engine: SnakeEngine = reactive({ foodX: 1, foodY: 1, snake: [], head: defaultHead(), nextMove: 0 });
    restart(engine);
    return engine;
}