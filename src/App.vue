<script setup lang="ts">
import PWABadge from "./components/PWABadge.vue"
import ClickPanel from "./components/ClickPanel.vue";
import LeafCount from "./components/LeafCount.vue";
import LeafPopupContainer from "./components/LeafPopupContainer.vue";
import UpgradesPanel from "./components/upgrades/UpgradePanel.vue";
import EntityList from "./components/entities/EntityList.vue";
</script>

<template>
    <LeafPopupContainer />
    <ClickPanel />
    <LeafCount />
    <EntityList />
    <UpgradesPanel />
    <PWABadge />
</template>
