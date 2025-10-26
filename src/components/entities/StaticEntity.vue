<script setup lang="ts">
import { computed } from "vue";

const { offset, icon } = defineProps<{ offset: number, icon: string; }>();

const x = computed(() => `${offset}rem`);
</script>

<template>
    <span class="simple-entity">{{ icon }}</span>
</template>

<style scoped>
.simple-entity {
    translate: calc(v-bind(x) - 50%) -80%;
    font-family: "Segoe UI Emoji", sans-serif;
}
</style>