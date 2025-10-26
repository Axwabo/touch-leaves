<script setup lang="ts">
import useStore from "../store.ts";
import { storeToRefs } from "pinia";
import { ref, useTemplateRef, watch } from "vue";
import src from "../assets/audio/music.ogg";

const { music } = storeToRefs(useStore());

const muted = ref(false);

const volume = ref(0.3);

const sound = useTemplateRef("audio");

watch(volume, apply);

watch(music, () => apply(volume.value), { flush: "post" });

function apply(value: number) {
    if (sound.value)
        sound.value.volume = value;
}
</script>

<template>
    <div class="music" v-if="music">
        <button v-on:click="muted = !muted">{{ muted ? "🔇" : "🔊" }}</button>
        <input type="range" v-model="volume" min="0" max="1" step="0.01">
        <span>{{ (volume * 100).toFixed(0) }}%</span>
        <audio :src="src" autoplay loop :muted ref="audio"></audio>
    </div>
</template>

<style scoped>
.music {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: grid;
    text-align: center;
}

.music button {
    background-color: transparent;
    font-size: 2rem;
    padding: 1rem;
}

.music input {
    flex: 0;
    min-width: 0;
    width: 5rem;
}
</style>