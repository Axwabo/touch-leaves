<script setup lang="ts">
import {onMounted, useTemplateRef} from "vue";
import {storeToRefs} from "pinia";
import useStore from "../../store.ts";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import {checkCollision} from "../../utils/collision.ts";

const {leaf} = defineProps<{ leaf: HTMLElement | null; }>();

const {lives, stage} = storeToRefs(useStore());

const spikes = useTemplateRef("spikes");

const rotation = Math.random() * 360 + "deg";

useAnimationFrame(() => {
    if (!leaf || !spikes.value)
        return;
    for (const spike of spikes.value!.querySelectorAll(".spike")) {
        if (!checkCollision(spike, leaf))
            continue;
        if (--lives.value === 0)
            stage.value = "dead";
        return;
    }
});
</script>

<template>
    <div id="spikes" ref="spikes"></div>
</template>

<style scoped>
#spikes {
    rotate: v-bind(rotation);
    animation: clip 1.5s forwards;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% calc(-50% - 10rem);
    width: 100px;
    height: 100px;
}

@keyframes clip {
    66% {
        clip-path: shape(from 50% 0, arc to 0 0 of 50%, arc to 0 0 of 50%);
    }
    100%{
        clip-path: shape(from 50% 0, arc to 50% 100% of 50%, arc to 50% 0 of 50%);
    }
}
</style>