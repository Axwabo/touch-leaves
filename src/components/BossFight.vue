<script setup lang="ts">
import MainLeaf from "./boss/MainLeaf.vue";
import BossBar from "./boss/BossBar.vue";
import { ref, useTemplateRef } from "vue";
import Tree from "./boss/Tree.vue";
import { storeToRefs } from "pinia";
import useStore from "../store.ts";

const hidden = ref(false);

const leaf = useTemplateRef("leaf");

const { bossHealth } = storeToRefs(useStore());
</script>

<template>
    <BossBar />
    <h1 :class="{ hidden: hidden && bossHealth > 200 }">{{ bossHealth <= 200 ? "Keep attacking!" : "Drag the leaf and avoid the tree's attacks! Break the branches!" }}</h1>
    <div id="space"></div>
    <div id="bossFight">
        <Tree :leaf="leaf?.leaf ?? null" />
        <hr>
    </div>
    <MainLeaf v-on:dragging="hidden = true" ref="leaf" />
</template>

<style scoped>
h1 {
    text-align: center;
}

#bossFight {
    position: relative;
    width: 100vw;
}

#space {
    margin-bottom: 30vh;
}

.hidden {
    visibility: hidden;
}
</style>