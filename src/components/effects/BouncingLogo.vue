<script setup lang="ts">
import useStore from "../../store.ts";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import { computed, onMounted, type Ref, ref, useTemplateRef } from "vue";

const { icon, amount } = defineProps<{ icon: string; amount: number; }>();

const { touch } = useStore();

const logo = useTemplateRef("logo");

const x = ref(0);
const y = ref(0);
const angle = ref(45);

const translate = computed(() => `${x.value}px ${y.value}px`);

onMounted(() => {
    x.value = Math.random() * (window.innerWidth - (logo.value?.getBoundingClientRect().width ?? 0));
    y.value = Math.random() * (window.innerHeight - (logo.value?.getBoundingClientRect().height ?? 0));
});

const top = ref(false);
const right = ref(false);
const bottom = ref(false);
const left = ref(false);

function bounce(elementBorder: number, windowBorder: number, lastHit: Ref<boolean>, negativeThreshold: number) {
    const outOfBounds = windowBorder === 0 ? elementBorder < 0 : elementBorder > windowBorder;
    if (!outOfBounds) {
        lastHit.value = false;
        return false;
    }
    if (lastHit.value)
        return;
    angle.value = angle.value + (angle.value % 360 === negativeThreshold ? 270 : 90) % 360;
    lastHit.value = true;
    touch(amount);
}

useAnimationFrame(delta => {
    if (!logo.value)
        return;
    step(delta);
    const rect = logo.value.getBoundingClientRect();
    bounce(rect.top, 0, top, 225);
    bounce(rect.right, window.innerWidth, right, 315);
    bounce(rect.bottom, window.innerHeight, bottom, 45);
    bounce(rect.left, 0, left, 135);
});

function step(delta: number) {
    x.value += delta * Math.cos(angle.value / 180 * Math.PI) * 200;
    y.value += delta * Math.sin(angle.value / 180 * Math.PI) * 200;
}
</script>

<template>
    <span class="bouncing-logo emoji" ref="logo">{{ icon }}</span>
</template>

<style scoped>
.bouncing-logo {
    position: absolute;
    font-size: 3rem;
    pointer-events: none;
    top: 0;
    left: 0;
    translate: v-bind(translate);
}
</style>