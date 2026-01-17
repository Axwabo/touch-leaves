<script setup lang="ts">
import useStore from "../../store.ts";
import { storeToRefs } from "pinia";

const { bossHealth: max } = useStore();

const { bossHealth } = storeToRefs(useStore());
</script>

<template>
    <div id="bossHealthContainer">
        <span>{{ bossHealth }}</span>
        <br>
        <progress id="bossHealth" :max :value="bossHealth"></progress>
    </div>
</template>

<style>
#bossHealthContainer {
    text-align: center;
}

#bossHealth {
    width: 40vw;
    accent-color: red;
    pointer-events: none;
}
</style>