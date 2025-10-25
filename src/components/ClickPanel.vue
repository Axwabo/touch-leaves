<script setup lang="ts">
import useStore from "../store.ts";

const { touch } = useStore();
</script>

<template>
    <button id="touch" v-on:click="touch(1)">
        <span class="leaf">🍁</span>
        <span class="title">touch<br>leaves</span>
        <span class="leaf">🍂</span>
    </button>
</template>

<style scoped>
#touch {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    user-select: none;
    font-size: 2em;
}

.leaf {
    line-height: 0;
    font-size: 5em;
}

.title {
    font-weight: bold;
    font-size: 5rem;
}
</style>