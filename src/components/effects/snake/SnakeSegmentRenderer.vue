<script setup lang="ts">
import type { SnakeSegment } from "../../../utils/snake.ts";
import { computed } from "vue";

const { segment, next } = defineProps<{ segment: SnakeSegment; next: SnakeSegment | null; }>();

const x = computed(() => segment.x);
const y = computed(() => segment.y);
const type = computed(() => segment.type);
const rotate = computed(() => `${-segment.orientation}deg`);

const side = computed(() => (segment.orientation + 90) % 360 === next?.orientation
    ? "left"
    : (segment.orientation + 270) % 360 === next?.orientation
        ? "right"
        : "");
</script>

<template>
    <span :class="['segment', type, side]"></span>
</template>

<style scoped>
.segment {
    --color: #6a9e1c;
    display: inline-block;
    grid-row: v-bind(y);
    grid-column: v-bind(x);
    rotate: v-bind(rotate);
}

.tail {
    border: 1rem solid transparent;
    border-right-color: var(--color);
}

.tail.left {
    border-top-color: var(--color);
}

.tail.right {
    border-bottom-color: var(--color);
}

.body {
    width: 100%;
    height: 100%;
    background-color: var(--color);
}

.head {
    border: 1rem solid transparent;
    border-left-color: var(--color);
    position: relative;
}

.head::before {
    content: ":";
    position: absolute;
    color: black;
    top: 0;
    left: 0;
    translate: -1rem -50%;
}

.head::after {
    content: "";
    position: absolute;
    background-color: #ff5b94;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.2rem;
    translate: -75% -50%;
}
</style>