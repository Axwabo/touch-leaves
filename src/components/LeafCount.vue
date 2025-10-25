<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../store.ts";
import { ref } from "vue";
import useInterval from "../composables/useInterval.ts";

const { leaves } = storeToRefs(useStore());

let previous = 0;

const perSecond = ref(0);

useInterval(() => {
    perSecond.value = leaves.value - previous;
    previous = leaves.value;
});
</script>

<template>
    <h2 id="leafCount"><span class="zeroes">{{ "0".repeat(8 - Math.ceil(Math.log10(leaves))) }}</span>{{ leaves }}</h2>
    <span>{{ perSecond }} {{ perSecond === 1 ? "leaf" : "leaves" }} touched per second</span>
</template>

<style scoped>
.zeroes {
    opacity: 0.7;
}
</style>