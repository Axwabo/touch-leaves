<script setup lang="ts">
import useStore from "../../store.ts";
import CricketList from "./CricketList.vue";
import Wind from "./Wind.vue";
import { storeToRefs } from "pinia";
import NiceWords from "./NiceWords.vue";

const { entities } = useStore();

const { pestRemover, niceWords } = storeToRefs(useStore());
</script>

<template>
    <Wind v-if="entities.includes('Wind')" />
    <NiceWords v-if="niceWords" />
    <CricketList v-if="!pestRemover" />
</template>