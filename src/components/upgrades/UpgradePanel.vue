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
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    font-size: 0.5em;
}
</style>