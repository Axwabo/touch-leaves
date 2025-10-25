<script setup lang="ts">
import useStore from "../store.ts";
import Entity from "./Entity.vue";

const { entities } = useStore();
</script>

<template>
    <div id="entities">
        <hr>
        <Entity v-for="entity in entities" :entity />
    </div>
</template>

<style scoped>
#entities {
    position: relative;
    width: 100vw;
}
</style>