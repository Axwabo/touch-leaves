<script setup lang="ts">
import useStore from "../../store.ts";
import UpgradeCard from "./UpgradeCard.vue";

const { visibleUpgrades } = useStore();
</script>

<template>
    <div class="upgrades">
        <UpgradeCard v-for="upgrade in visibleUpgrades" :upgrade />
    </div>
</template>

<style scoped>
.upgrades {
    display: grid;
    grid-template-columns: repeat(4, 7em);
    gap: 1em;
    padding: 1em;
    height: 8em;
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 1rem;
}
</style>