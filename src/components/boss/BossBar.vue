<script setup lang="ts">
import useStore from "../../store.ts";
import { storeToRefs } from "pinia";

const { bossHealth: max } = useStore();

const { bossHealth } = storeToRefs(useStore());
</script>

<template>
    <progress id="bossHealth" :max :value="bossHealth"></progress>
</template>

<style>
#bossHealth {
    width: 40vw;
    accent-color: red;
    pointer-events: none;
}
</style>