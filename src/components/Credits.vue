<script setup lang="ts">
import useStore from "../store.ts";
import Restart from "./Restart.vue";

const { start, leaves, totalTouched, clicks } = useStore();

const elapsed = new Intl.DateTimeFormat(undefined, {
    timeStyle: "medium",
    hour12: false,
    timeZone: "UTC"
}).format(new Date(Date.now() - start));
</script>

<template>
    <h2>Welcome Back 💻</h2>
    <div>
        <h1>🍁 touch leaves 🍂</h1>
        <span>
            A game by Axwabo
            <br>
            Music by cal
            <br>
            Inspired by <q>The Last Meadow</q>
        </span>
    </div>
    <h2>
        You completed the game in <span class="stat">{{ elapsed }}</span>
        <br>
        Total clicks: <span class="stat">{{ clicks }}</span>
        <br>
        Total leaves touched: <span class="stat">{{ totalTouched }}</span>
        <br>
        Final leaf count: <span class="stat">{{ leaves }}</span>
    </h2>
    <Restart />
</template>

<style scoped>
h2 {
    margin: 0;
    text-align: center;
}

div {
    text-align: center;
}

.stat {
    color: #d4ff95;
}

.restart button {
    font-size: 2rem;
    border-radius: 1rem;
}
</style>