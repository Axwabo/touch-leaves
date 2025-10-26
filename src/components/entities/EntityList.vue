<script setup lang="ts">
import useStore from "../../store.ts";
import Entity from "./Entity.vue";

const { entities } = useStore();
</script>

<template>
    <div id="entities">
        <hr>
        <Entity v-for="type in entities" :type :key="type" />
    </div>
</template>

<style scoped>
#entities {
    position: relative;
    width: 100vw;
}
</style>