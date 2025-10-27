<script setup lang="ts">
import useStore from "../../store.ts";
import CricketList from "./CricketList.vue";
import Wind from "./Wind.vue";
import { storeToRefs } from "pinia";
import NiceWords from "./NiceWords.vue";
import SnakeDisplay from "./snake/SnakeDisplay.vue";
import BouncingLogo from "./BouncingLogo.vue";

const { entities, bouncingLogos } = useStore();

const { pestRemover, niceWords, snake } = storeToRefs(useStore());
</script>

<template>
    <Wind v-if="entities.includes('Wind')" />
    <SnakeDisplay v-if="snake" />
    <NiceWords v-if="niceWords" />
    <BouncingLogo v-for="logo in bouncingLogos" :icon="logo.icon" :amount="logo.leavesPerBounce" />
    <CricketList v-if="!pestRemover" />
</template>