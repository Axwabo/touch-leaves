<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { storeToRefs } from "pinia";
import useStore from "../../store.ts";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import { checkCollision } from "../../utils/collision.ts";

const { leaf } = defineProps<{ leaf: HTMLElement | null; }>();

const { lives, stage } = storeToRefs(useStore());

const pinecone = useTemplateRef("pinecone");

onMounted(() => pinecone.value?.animate([ { visibility: "visible", top: "50%", left: "50%" }, { top: "50%", left: "50%" }, {
    top: leaf!.getBoundingClientRect().y + "px",
    left: leaf!.getBoundingClientRect().x + "px"
} ], { duration: 1500 }));

useAnimationFrame(() => {
    if (!leaf || !pinecone.value || !checkCollision(pinecone.value, leaf))
        return;
    if (--lives.value === 0)
        stage.value = "dead";
});
</script>

<template>
    <div id="pinecone" ref="pinecone"></div>
</template>

<style scoped>
#pinecone {
    width: 3rem;
    height: 3rem;
    background-color: saddlebrown;
    border: 2px solid red;
    border-radius: 3rem;
    position: absolute;
    translate: -50% -50%;
    visibility: hidden;
}
</style>