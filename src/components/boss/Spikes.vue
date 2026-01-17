<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from "vue";
import {storeToRefs} from "pinia";
import useStore from "../../store.ts";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import {checkCollision} from "../../utils/collision.ts";
import Spike from "./Spike.vue";

const {leaf} = defineProps<{ leaf: HTMLElement | null; }>();

const {lives, stage} = storeToRefs(useStore());

const spikes = useTemplateRef("spikes");

const rotation = Math.random() * 360 + "deg";

const spikeList = new Array(10).fill(0).map((_, i) => i);

const display = ref(false);

useAnimationFrame(() => {
    if (!leaf || !spikes.value || !display.value)
        return;
    for (const spike of spikes.value!.querySelectorAll(".spike")) {
        if (!checkCollision(spike, leaf))
            continue;
        if (--lives.value === 0)
            stage.value = "dead";
        return;
    }
});

onMounted(() => setTimeout(() => display.value = true, 1000));
</script>

<template>
    <div id="spikes" ref="spikes">
        <div id="spikesAnchor">
            <div id="alarm" v-show="!display"></div>
            <template v-if="display">
                <Spike v-for="spike in spikeList" :rotation="360 / spikeList.length * spike" />
            </template>
        </div>
    </div>
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
}

#spikesAnchor {
    position: relative;
}

#alarm {
    position: absolute;
    top: 0;
    left: 0;
    width: 10rem;
    height: 10rem;
    translate: -50% -50%;
    border: 10px solid red;
    border-radius: 50%;
    animation: blink 0.2s linear infinite alternate;
}

@keyframes blink {
    from {
        opacity: 0;
    }
    to {
        opacity: 1
    }
}
</style>