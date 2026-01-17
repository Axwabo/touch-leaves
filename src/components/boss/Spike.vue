<script setup lang="ts">
import {useTemplateRef} from "vue";
import {checkCollision} from "../../utils/collision.ts";

const spike = useTemplateRef("spike");

defineExpose({
    checkCollision(leaf: HTMLElement) {
        return spike.value && checkCollision(spike.value, leaf);
    },
});
</script>

<template>
<div class="spike-anchor">
    <div class="spike" ref="spike"></div>
</div>
</template>

<style scoped>

</style>