<script setup lang="ts">
import { computed } from "vue";

const { offset, icon } = defineProps<{ offset: number, icon: string; }>();

const y = computed(() => `${offset}rem`);
</script>

<template>
    <span class="shuttling-entity emoji">{{ icon }}</span>
</template>

<style scoped>
.shuttling-entity {
    translate: -50% calc(v-bind(y) - 80%);
    animation: shuttle 30s linear infinite;
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