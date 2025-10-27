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
import Died from "./components/Died.vue";

const { stage } = storeToRefs(useStore());
</script>

<template>
    <AudioPools />
    <Game v-if="stage === 'leaves'" />
    <BossFight v-else-if="stage === 'boss'" />
    <Died v-else-if="stage === 'dead'" />
    <Credits v-else-if="stage === 'completed'" />
    <FullScreenButton />
    <Music />
    <PWABadge />
</template>
