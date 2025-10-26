<script setup lang="ts">
import useStore from "../store.ts";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const { touch } = useStore();

const { leaves, level } = storeToRefs(useStore());

const base = ref(0);

const required = computed(() => Math.floor(level.value * 150 * Math.cbrt(level.value)) + 500);

const reward = computed(() => Math.floor(Math.pow(2.3, Math.sqrt(Math.log(level.value) * 10) + 3)));

const current = computed(() => leaves.value - base.value);

watch(level, () => base.value = leaves.value);
</script>

<template>
    <div id="level" v-if="level !== 0">
        <div id="progress">
            <span class="left">Levél {{ level }}</span>
            <span>{{ current }}/{{ required }} 🍂</span>
            <progress :max="required" :value="current"></progress>
        </div>
        <button :class="{ hidden: current < required }" v-on:click="touch(reward, true); level++;">Claim leaves +{{ reward }} 🍂</button>
    </div>
</template>

<style scoped>
#level {
    position: absolute;
    text-align: right;
    translate: 0 3rem;
}

#progress {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 10rem 15rem;
    padding: 0.5em;
    background-color: rgba(30, 30, 30, 0.3);
}

.left {
    text-align: left;
}

#progress progress {
    grid-column: span 2;
    width: 100%;
}

#level button {
    border-radius: 0.5em;
    background-color: #4d2a00;
    transition: background-color 0.2s;
}

#level button:hover {
    background-color: #663800;
}

.hidden {
    visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
    #level button {
        transition: none;
    }
}
</style>