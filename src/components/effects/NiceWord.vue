<script setup lang="ts">
import { item } from "../../utils/random.ts";
import { onMounted, useTemplateRef } from "vue";

const emit = defineEmits([ "complete" ]);

const word = useTemplateRef("word");

const initial = { top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 };

onMounted(() => word.value?.animate([
    initial,
    { opacity: 0.8, scale: 1 },
    initial
], { duration: 500, fill: "forwards" }).addEventListener("finish", () => emit("complete")));
</script>

<template>
    <span class="nice" ref="word">{{ item([ "Nice!", "Good Work!", "Amazing!", "Well Done!" ]) }}</span>
</template>

<style scoped>
.nice {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    font-size: 4rem;
    white-space: nowrap;
}
</style>