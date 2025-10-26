<script setup lang="ts">
import useStore from "../../store.ts";
import Entity from "./Entity.vue";
import Wind from "./Wind.vue";
import useInterval from "../../composables/useInterval.ts";
import Cricket from "./Cricket.vue";
import { storeToRefs } from "pinia";

const { entities } = useStore();

const { level } = storeToRefs(useStore());

useInterval(() => setTimeout(spawnCricket, Math.random() * 5000), 10000);

function spawnCricket() {
    if (level.value !== 0)
        entities.push("Cricket");
}
</script>

<template>
    <div id="entities">
        <hr>
        <Wind v-if="entities.includes('Wind')" />
        <template v-for="(type, index) in entities">
            <Cricket v-if="type === 'Cricket'" :index />
            <Entity v-else :type :key="type" />
        </template>
    </div>
</template>

<style scoped>
#entities {
    position: relative;
    width: 100vw;
}
</style>