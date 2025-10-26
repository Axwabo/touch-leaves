<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import useWind from "../../composables/useWind.ts";

const particle = useTemplateRef("particle");

const top = ref("");
const left = ref("");

useWind(particle, top, left);
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