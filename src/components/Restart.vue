<script setup lang="ts">
import useStore from "../store.ts";
</script>

<template>
    <div class="restart">
        →
        <button v-on:click="useStore().$reset()">RESTART</button>
        ◄
    </div>
</template>

<style scoped>
.restart {
    font-size: 3rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.restart button {
    font-size: 2rem;
    border-radius: 1rem;
}
</style>