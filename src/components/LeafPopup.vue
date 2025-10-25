<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import type TouchedLeafData from "../types/touchedLeafData.ts";
import src from "../assets/audio/leaf.ogg";

const { data } = defineProps<{ data: TouchedLeafData; }>();

const text = useTemplateRef("text");

const sound = useTemplateRef("audio");

function getIcon() {
    return Math.random() < 0.5 ? "🍁" : "🍂";
}

const icon = ref(getIcon());

const keyframes = [ { top: "0", opacity: "1" }, { top: "-1em", opacity: "0.8" }, { top: "-2em", opacity: "0" } ];

onMounted(animate);

watch(() => data.completed, value => !value && animate());

function animate() {
    const span = text.value;
    const audio = sound.value;
    if (!span || !audio)
        return;
    if (audio.currentTime >= audio.duration) {
        audio.currentTime = 0;
        void audio.play();
    }
    icon.value = getIcon();
    span.getAnimations()[0]?.cancel();
    span.animate(keyframes, {
        duration: 500,
        easing: "ease-out",
        fill: "forwards"
    }).addEventListener("finish", () => data.completed = true);
}
</script>

<template>
    <audio :src="src" ref="audio" autoplay></audio>
    <span :class="{'leaf-popup': true, positive: data.amount > 0}" ref="text">
        {{ icon }}
        <span class="amount">{{ data.amount }}</span>
    </span>
</template>

<style scoped>
.leaf-popup {
    position: absolute;
    top: 0;
    left: 0;
    translate: -50% 0;
    white-space: nowrap;
    color: red;
}

.leaf-popup.positive {
    color: #0f0;
}

.leaf-popup.positive .amount::before {
    content: "+";
}
</style>