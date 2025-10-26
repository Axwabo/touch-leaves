<script setup lang="ts">
import useStore from "../store.ts";
import LeafPopup from "./LeafPopup.vue";

const { touched } = useStore();
</script>

<template>
    <div id="leafPopupContainer">
        <LeafPopup v-for="data in touched" :data :key="data.id" />
    </div>
</template>

<style scoped>
#leafPopupContainer {
    position: relative;
    justify-self: center;
}
</style>