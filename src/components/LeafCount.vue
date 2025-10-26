<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../store.ts";
import { ref } from "vue";
import useInterval from "../composables/useInterval.ts";

const { leaves, speed } = storeToRefs(useStore());

let previous = 0;

const perSecond = ref(0);

useInterval(() => {
    perSecond.value = leaves.value - previous;
    previous = leaves.value;
});
</script>

<template>
    <div id="leafCount">
        <h2><span class="zeroes">{{ "0".repeat(8 - (leaves === 0 ? 0 : Math.ceil(Math.log10(leaves)))) }}</span>{{ leaves }}</h2>
        <span :class="{ speed }">{{ perSecond }} {{ perSecond === 1 ? "leaf" : "leaves" }} touched per second</span>
    </div>
</template>

<style scoped>
#leafCount {
    display: grid;
}

#leafCount h2 {
    margin: 0;
    font-size: 3em;
    text-align: center;
}

#leafCount > span {
    visibility: hidden;
    text-align: center;
}

.zeroes {
    opacity: 0.7;
}

#leafCount .speed {
    visibility: visible;
}
</style>