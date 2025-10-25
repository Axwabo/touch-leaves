<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from "vue";
import type TouchedLeafData from "../types/touchedLeafData.ts";

const { data } = defineProps<{ data: TouchedLeafData; }>();

const popup = useTemplateRef("popup");

const icon = Math.random() < 0.5 ? "🍁" : "🍂";

const keyframes = [ { top: "0", opacity: "1" }, { top: "-1em", opacity: "0.8" }, { top: "-2em", opacity: "0" } ];

onMounted(animate);

watch(() => data.completed, value => !value && animate());

function animate() {
    if (!popup.value)
        return;
    popup.value.getAnimations()[0]?.cancel();
    popup.value.animate(keyframes, {
        duration: 500,
        easing: "ease-out",
        fill: "forwards"
    }).addEventListener("finish", () => data.completed = true);
}
</script>

<template>
    <span :class="{'leaf-popup': true, positive: data.amount > 0}" ref="popup">
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