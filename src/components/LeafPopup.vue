<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import type TouchedLeafData from "../types/touchedLeafData.ts";
import { icon } from "../utils/random.ts";

const { data } = defineProps<{ data: TouchedLeafData; }>();

const text = useTemplateRef("text");

const leaf = ref(icon());

const keyframes = [ { top: "0", opacity: "1" }, { top: "-1em", opacity: "0.8" }, { top: "-2em", opacity: "0" } ];

onMounted(animate);

watch(() => data.completed, value => !value && animate());

function animate() {
    const span = text.value;
    if (!span)
        return;
    leaf.value = icon();
    span.getAnimations()[0]?.cancel();
    span.animate(keyframes, {
        duration: 500,
        easing: "ease-out",
        fill: "forwards"
    }).addEventListener("finish", () => data.completed = true);
}
</script>

<template>
    <span :class="{'leaf-popup': true, positive: data.amount > 0}" ref="text">
        {{ leaf }}
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
    font-size: 1.5rem;
}

.leaf-popup.positive {
    color: #0f0;
}

.leaf-popup.positive .amount::before {
    content: "+";
}
</style>