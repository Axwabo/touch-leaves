<script setup lang="ts">
import useStore from "../store.ts";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const { leaves } = storeToRefs(useStore());

const enabled = ref(false);

const hide = ref(false);

watch(leaves, value => enabled.value = value >= 5000 || enabled.value);
</script>

<template>
    <div id="alert" v-show="enabled && !hide">
        Reminder that there's no leaf touching after November.
        <button v-on:click="hide = true">X</button>
    </div>
</template>

<style scoped>
#alert {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: red;
    color: white;
}

#alert button {
    background-color: transparent;
}
</style>