<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import { checkCollision } from "../../utils/collision.ts";

const { vulnerable, index, leaf } = defineProps<{ vulnerable?: boolean; index: number; leaf: HTMLElement | null }>();

const emit = defineEmits([ "hit" ]);

const box = useTemplateRef("box");

const top = computed(() => `${index * 15 + 10}%`);

useAnimationFrame(() => {
    if (leaf && box.value && checkCollision(box.value, leaf))
        emit("hit");
});
</script>

<template>
    <svg viewBox="0 0 100 20" class="branch">
        <path d="M0 10 L98 20 L98 2 L0 10" fill="green" stroke-width="2" :class="{ vulnerable }"></path>
        <rect x="80" y="0" height="20" width="20" fill="none" ref="box"></rect>
    </svg>
</template>

<style scoped>
.vulnerable {
    stroke: red;
}

.branch {
    top: v-bind(top);
}
</style>