<script setup lang="ts">
import { createSnakeEngine, gridSize, handleKey, step } from "../../../utils/snake.ts";
import { computed } from "vue";
import useInterval from "../../../composables/useInterval.ts";
import useKeyListener from "../../../composables/useKeyListener.ts";
import SnakeSegmentRenderer from "./SnakeSegmentRenderer.vue";
import useStore from "../../../store.ts";

const { touch } = useStore();

const cells = gridSize;

const engine = createSnakeEngine();

const foodX = computed(() => engine.foodX);
const foodY = computed(() => engine.foodY);

useInterval(() => step(engine, () => touch(10)), 500);

useKeyListener(key => handleKey(key, engine));
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