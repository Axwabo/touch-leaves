<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../../store.ts";
import { reactive, watch } from "vue";
import { createInstance, type Instance } from "../../utils/instance.ts";
import { playNiceSound } from "../../utils/sources.ts";
import NiceWord from "./NiceWord.vue";

const words: Instance[] = reactive([]);

const { niceWords, manuallyTouched } = storeToRefs(useStore());

let previousTime = 0;

watch(manuallyTouched, (value, previous) => {
    if (!niceWords.value || value <= previous || Date.now() - previousTime < 200)
        return;
    previousTime = Date.now();
    createInstance(words);
    playNiceSound();
});
</script>

<template>
    <template v-for="word in words" :key="word.id">
        <NiceWord v-if="!word.deleted" v-on:complete="word.deleted = true" />
    </template>
</template>