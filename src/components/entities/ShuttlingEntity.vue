<script setup lang="ts">
import { computed } from "vue";

const { offset, icon, speed, invert } = defineProps<{ offset: number, icon: string; speed: number; invert?: boolean; }>();

const y = computed(() => `${offset}rem`);

const duration = computed(() => `${1 / speed * 400}s`);
</script>

<template>
    <span :class="{ 'shuttling-entity': true, 'emoji': true, invert }">{{ icon }}</span>
</template>

<style scoped>
.shuttling-entity {
    translate: -50% calc(v-bind(y) - 80%);
    animation: shuttle v-bind(duration) linear infinite;
}

.shuttling-entity.invert {
    transform: scaleX(-1);
}

@keyframes shuttle {
    from, to {
        left: 0;
        scale: -1 1;
    }
    50% {
        left: 100%;
        scale: -1 1;
    }
    51% {
        scale: 1 1;
    }
    99% {
        scale: 1 1;
    }
}
</style>