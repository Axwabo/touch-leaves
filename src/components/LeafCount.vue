<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "../store.ts";

const { leaves } = storeToRefs(useStore());
</script>

<template>
    <h2 id="leafCount">{{ leaves.toString().padStart(8, "0") }}</h2>
</template>

<style scoped>

</style>