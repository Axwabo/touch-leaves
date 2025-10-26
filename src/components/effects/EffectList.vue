<script setup lang="ts">
import useStore from "../../store.ts";
import CricketList from "./CricketList.vue";
import Wind from "./Wind.vue";
import { storeToRefs } from "pinia";

const { entities } = useStore();

const { pestRemover } = storeToRefs(useStore());
</script>

<template>
    <CricketList v-if="!pestRemover" />
    <Wind v-if="entities.includes('Wind')" />
</template>