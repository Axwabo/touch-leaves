<script setup lang="ts">
import useStore from "../store.ts";

const { touch } = useStore();
</script>

<template>
    <div id="touch" v-on:click="touch(1)">
        <span class="leaf">🍁</span>
        <h1>touch<br>leaves</h1>
        <span class="leaf">🍂</span>
    </div>
</template>

<style scoped>
#touch {
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
</style>