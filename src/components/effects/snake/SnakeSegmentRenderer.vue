<script setup lang="ts">
import type { SnakeSegment } from "../../../utils/snake.ts";
import { computed } from "vue";

const { segment } = defineProps<{ segment: SnakeSegment; }>();

const x = computed(() => segment.x);
const y = computed(() => segment.y);
const rotate = computed(() => `${-segment.orientation}deg`);
</script>

<template>
    <span :class="['segment', segment.type]">→</span>
</template>

<style scoped>
.segment {
    grid-row: v-bind(y);
    grid-column: v-bind(x);
    rotate: v-bind(rotate);
    color: green;
}

.head {

}
</style>