<script setup lang="ts">
import { defaultHead, gridSize, type Orientation, restart, type SnakeEngine, step } from "../../../utils/snake.ts";
import { computed, reactive } from "vue";
import useInterval from "../../../composables/useInterval.ts";
import useKeyListener from "../../../composables/useKeyListener.ts";
import SnakeSegmentRenderer from "./SnakeSegmentRenderer.vue";

const cells = gridSize;

const engine: SnakeEngine = reactive({ foodX: 1, foodY: 1, snake: [], head: defaultHead(), nextMove: 0 });

restart(engine);

const foodX = computed(() => engine.foodX);
const foodY = computed(() => engine.foodY);

useInterval(() => step(engine), 500);

useKeyListener(key => {
    switch (key) {
        case "ArrowRight":
        case "D":
            turn(0);
            break;
        case "ArrowUp":
        case "W":
            turn(90);
            break;
        case "ArrowLeft":
        case "A":
            turn(180);
            break;
        case "ArrowDown":
        case "S":
            turn(270);
            break;
    }
});

function turn(orientation: Orientation) {
    if (orientation !== (engine.head.orientation + 180) % 360)
        engine.nextMove = orientation;
}
</script>

<template>
    <div id="snake">
        <span id="food">🍎</span>
        <SnakeSegmentRenderer :segment="engine.head" :next="null" />
        <SnakeSegmentRenderer v-for="(segment, index) in engine.snake" :segment :next="engine.snake[index + 1] ?? engine.head" />
    </div>
</template>

<style scoped>
#snake {
    position: absolute;
    top: 0;
    right: 8rem;
    border: 0.5rem solid red;
    pointer-events: none;
    display: grid;
    place-items: center;
    grid-template-rows: repeat(v-bind(cells), 2rem);
    grid-template-columns: repeat(v-bind(cells), 2rem);
    background-color: #ffcfbd;
}

#food {
    grid-row: v-bind(foodY);
    grid-column: v-bind(foodX);
}
</style>