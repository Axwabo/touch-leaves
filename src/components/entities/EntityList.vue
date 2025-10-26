<script setup lang="ts">
import useStore from "../../store.ts";
import Entity from "./Entity.vue";
import Wind from "./Wind.vue";
import useInterval from "../../composables/useInterval.ts";

const { entities } = useStore();

useInterval(() => setTimeout(spawnWeed, Math.random() * 5000), 10000);

function spawnWeed() {

}
</script>

<template>
    <div id="entities">
        <hr>
        <Wind v-if="entities.includes('Wind')" />
        <Entity v-for="type in entities" :type :key="type" />
    </div>
</template>

<style scoped>
#entities {
    position: relative;
    width: 100vw;
}
</style>