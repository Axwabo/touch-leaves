<script setup lang="ts">
const {rotation} = defineProps<{ rotation: number; }>();

const deg = `${rotation}deg`;
</script>

<template>
    <div class="spike-anchor">
        <div class="spike" ref="spike"></div>
    </div>
</template>

<style scoped>
.spike-anchor {
    rotate: v-bind(deg);
    position: absolute;
}

.spike {
    animation: shoot 1s 1s linear forwards;
    border: 1rem solid transparent;
    border-top-color: #aed309;
    translate: 0 5rem;
}

@keyframes shoot {
    to {
        translate: 0 100rem;
    }
}
</style>