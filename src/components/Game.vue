<script setup lang="ts">
import Level from "./Level.vue";
import EffectList from "./effects/EffectList.vue";
import LeafCount from "./LeafCount.vue";
import ClickPanel from "./ClickPanel.vue";
import EntityList from "./entities/EntityList.vue";
import LeafPopupContainer from "./LeafPopupContainer.vue";
import UpgradesPanel from "./upgrades/UpgradePanel.vue";
import Alert from "./Alert.vue";
</script>

<template>
    <LeafPopupContainer />
    <ClickPanel />
    <Level />
    <LeafCount />
    <EffectList />
    <EntityList />
    <UpgradesPanel />
    <Alert />
</template>