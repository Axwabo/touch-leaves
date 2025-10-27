<script setup lang="ts">
import PWABadge from "./components/PWABadge.vue"
import Music from "./components/Music.vue";
import AudioPools from "./components/AudioPools.vue";
import Game from "./components/Game.vue";
import { storeToRefs } from "pinia";
import useStore from "./store.ts";
import Credits from "./components/Credits.vue";
import BossFight from "./components/BossFight.vue";
import FullScreenButton from "./FullScreenButton.vue";

const { stage } = storeToRefs(useStore());
</script>

<template>
    <AudioPools />
    <Game v-if="stage === 'leaves'" />
    <BossFight v-else-if="stage === 'boss'" />
    <Credits v-else-if="stage === 'completed'" />
    <FullScreenButton />
    <Music />
    <PWABadge />
</template>
