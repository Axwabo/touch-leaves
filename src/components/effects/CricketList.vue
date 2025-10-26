<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../../store.ts";
import useInterval from "../../composables/useInterval.ts";
import Cricket from "./Cricket.vue";
import { reactive } from "vue";
import { createInstance, type Instance } from "../../utils/instance.ts";

const crickets: Instance[] = reactive([]);

const { level } = storeToRefs(useStore());

useInterval(() => setTimeout(spawnCricket, Math.random() * 5000), 10000);

function spawnCricket() {
    if (level.value !== 0)
        createInstance(crickets);
}
</script>

<template>
    <template v-for="(cricket, index) in crickets" :key="cricket.id">
        <Cricket v-if="!cricket.deleted" v-on:click="crickets.splice(index, 1)" />
    </template>
</template>