<script setup lang="ts">
import useStore from "../store.ts";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const { touch } = useStore();

const { leaves, level } = storeToRefs(useStore());

const base = ref(0);

const required = computed(() => Math.floor(level.value * 200 * Math.cbrt(level.value)) + 1000);

const reward = computed(() => Math.floor(Math.pow(2.2, Math.sqrt(Math.log(level.value) * 10) + 3)));

const current = computed(() => leaves.value - base.value);

watch(level, () => base.value = leaves.value);
</script>

<template>
    <div id="level" v-if="level !== 0">
        <div id="progress">
            <span>Levél {{ level }}</span>
            <span class="right">{{ current }}/{{ required }} 🍂</span>
            <progress :max="required" :value="current"></progress>
        </div>
        <button v-show="current > required" v-on:click="level++; touch(reward, true)">Claim leaves +{{ reward }} 🍂</button>
    </div>
</template>

<style scoped>
#level {
    text-align: right;
}

#progress {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 15rem;
}

.right {
    text-align: right;
}

#progress progress {
    grid-column: span 2;
    width: 100%;
}

#level button {
    border-radius: 0.5em;
    background-color: #934f00;
}
</style>