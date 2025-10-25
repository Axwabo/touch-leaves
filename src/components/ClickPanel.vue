<script setup lang="ts">
import useStore from "../store.ts";

const { touch } = useStore();
</script>

<template>
    <button id="touch" v-on:click="touch(1, true)">
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
    height: 6em;
    transition: opacity 0.2s;
}

#touch.rainbow {
    color: transparent;
    background-image: linear-gradient(to right, #E40303, #FF8C00, #FFED00, #008026, #004CFF, #732982, #E40303);
    background-clip: text;
    animation: background 2s linear infinite;
    background-size: 5em 100%;
    filter: brightness(1.5);
}

#touch:hover {
    opacity: 0.8;
}

.leaf {
    line-height: 0;
    font-size: 5em;
}

.title {
    font-size: 5rem;
}

@keyframes background {
    from {
        background-position-x: 0;
    }
    to {
        background-position-x: 5em;
    }
}

@supports (background-image:  linear-gradient(in oklab to right, red, red)) {
    #touch.rainbow {
        background-image: linear-gradient(in oklab to right, #E40303, #FF8C00, #FFED00, #008026, #004CFF, #732982, #E40303);
    }
}

@media (prefers-reduced-motion: reduce) {
    #touch {
        transition: none;
        animation: none !important;
    }
}
</style>