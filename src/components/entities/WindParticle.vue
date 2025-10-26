<script setup lang="ts">
import { useTemplateRef } from "vue";
import useWind from "../../composables/useWind.ts";

const particle = useTemplateRef("particle");

const top = `${Math.random() * 100 - 50}vh`;
const left = `${Math.random() * 100}vw`;

useWind(particle);
</script>

<template>
    <span class="wind-particle" ref="particle">🍃</span>
</template>

<style scoped>
.wind-particle {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    top: v-bind(top);
    left: v-bind(left);
    filter: hue-rotate(-60deg);
}
</style>