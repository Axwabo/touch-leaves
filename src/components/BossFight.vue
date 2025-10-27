<script setup lang="ts">
import MainLeaf from "./boss/MainLeaf.vue";
import BossBar from "./boss/BossBar.vue";
import { ref } from "vue";

const hidden = ref(false);
</script>

<template>
    <BossBar />
    <h1 :class="{ hidden }">Drag the leaf and avoid the tree!</h1>
    <div id="bossFight">
        <hr>
    </div>
    <MainLeaf v-on:dragging="hidden = true" />
</template>

<style scoped>
#bossFight {
    position: relative;
    margin-top: 30vh;
    width: 100vw;
}

.hidden {
    visibility: hidden;
}
</style>