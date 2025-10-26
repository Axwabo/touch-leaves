<script setup lang="ts">
import useInterval from "../../composables/useInterval.ts";
import useStore from "../../store.ts";
import { reactive } from "vue";
import LeafPopup from "../LeafPopup.vue";
import type TouchedLeafData from "../../types/touchedLeafData.ts";

const { index } = defineProps<{ index: number; }>();

const { touch, entities } = useStore();

const top = `${Math.random() * 50 - 25}vh`;
const left = `${Math.random() * 90}vw`;

const data: TouchedLeafData = reactive({
    completed: false,
    amount: -10,
    id: ""
});

useInterval(() => {
    touch(-10);
    data.completed = false;
}, 3000);
</script>

<template>
    <button class="cricket" v-on:click="entities.splice(index, 1)">
        <span class="popup-anchor"><LeafPopup :data /></span>
        <span class="emoji">🦗</span>
    </button>
</template>

<style scoped>
.cricket {
    position: absolute;
    background-color: transparent;
    top: v-bind(top);
    left: v-bind(left);
    display: flex;
    align-items: center;
    flex-direction: column;
}

.popup-anchor {
    position: relative;
}

.emoji {
    font-size: 2.5rem;
}
</style>