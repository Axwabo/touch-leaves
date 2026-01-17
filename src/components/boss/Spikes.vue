<script setup lang="ts">
import {onMounted, useTemplateRef} from "vue";
import {storeToRefs} from "pinia";
import useStore from "../../store.ts";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import {checkCollision} from "../../utils/collision.ts";

const {leaf} = defineProps<{ leaf: HTMLElement | null; }>();

const {lives, stage} = storeToRefs(useStore());

const spikes = useTemplateRef("spikes");

onMounted(() => {
    const {x, y, width, height} = leaf!.getBoundingClientRect();
    const parent = pinecone.value!.parentElement!.getBoundingClientRect();
    const left = x - parent.x + width * 0.5 + "px";
    return pinecone.value!.animate([{visibility: "visible", top: "50%", left: "50%"}, {top: "50%", left: "50%"}, {
        top: y - parent.y + height * 0.5 + "px",
        left
    }, {
        top: parent.bottom + height + "px",
        left
    }], {duration: 2500});
});

useAnimationFrame(() => {
    if (!leaf || !spikes.value)
        return;
    
    if (--lives.value === 0)
        stage.value = "dead";
});
</script>

<template>
    <div id="spikes" ref="spikes"></div>
</template>

<style scoped>
#spikes {
    
}
</style>