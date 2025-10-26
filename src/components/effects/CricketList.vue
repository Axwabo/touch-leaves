<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../../store.ts";
import useInterval from "../../composables/useInterval.ts";
import Cricket from "./Cricket.vue";

const { crickets } = useStore();

const { level } = storeToRefs(useStore());

useInterval(() => setTimeout(spawnCricket, Math.random() * 5000), 10000);

function spawnCricket() {
    if (level.value === 0)
        return;
    for (const cricket of crickets) {
        if (!cricket.deleted)
            continue;
        cricket.deleted = false;
        cricket.id = Math.random().toString();
        return;
    }
    crickets.push({ id: Math.random().toString(), deleted: false });
}
</script>

<template>
    <template v-for="(cricket, index) in crickets" :key="cricket.id">
        <Cricket v-if="!cricket.deleted" v-on:click="crickets.splice(index, 1)" />
    </template>
</template>