<script setup lang="ts">
import { useTemplateRef } from "vue";
import useMousePosition from "../../composables/useMousePosition.ts";
import useWindowEvent from "../../composables/useWindowEvent.ts";

let dragging = false;

let offsetX = 0;
let offsetY = 0;

const leaf = useTemplateRef("leaf");

useMousePosition((x, y) => {
    if (!dragging || !leaf.value)
        return;
    leaf.value.style.top = `${y - offsetY}px`;
    leaf.value.style.left = `${x - offsetX}px`;
});

useWindowEvent("mouseup", () => dragging = false);
useWindowEvent("touchend", () => dragging = false);

function mouseDown(ev: MouseEvent) {
    offsetX = ev.offsetX;
    offsetY = ev.offsetY;
    dragging = true;
}

function touchStart(ev: TouchEvent) {
    if (dragging)
        return;
    const touch = ev.touches[0]!;
    offsetX = leaf.value ? touch.clientX - leaf.value.getBoundingClientRect().right : 0;
    offsetY = leaf.value ? touch.clientY - leaf.value.getBoundingClientRect().top : 0;
}
</script>

<template>
    <span id="mainLeaf" v-on:mousedown="mouseDown" v-on:touchstart="touchStart" ref="leaf">🍁</span>
</template>

<style scoped>
#mainLeaf {
    position: absolute;
    font-size: 5rem;
    cursor: grab;
    user-select: none;
}

#mainLeaf:active {
    cursor: grabbing;
}
</style>