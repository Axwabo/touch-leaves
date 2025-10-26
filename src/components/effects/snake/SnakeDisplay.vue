<script setup lang="ts">
import { restart, type SnakeEngine, step } from "../../../utils/snake.ts";
import { reactive } from "vue";
import useInterval from "../../../composables/useInterval.ts";

const engine: SnakeEngine = reactive({
    foodX: 0,
    foodY: 0,
    snake: []
});

restart(engine);

useInterval(() => step(engine));
</script>

<template>

</template>

<style scoped>

</style>