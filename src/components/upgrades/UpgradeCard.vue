<script setup lang="ts">
import type { UpgradeDefinition } from "../../types/upgradeDefinition.ts";
import useStore from "../../store.ts";
import { storeToRefs } from "pinia";
import processUpgrade from "../../utils/upgradeProcessor.ts";
import { allEntities } from "../../types/entityData.ts";
import { computed } from "vue";

const { upgrade } = defineProps<{ upgrade: UpgradeDefinition | null; }>();

const entity = computed(() => upgrade?.type === "entity" ? allEntities[upgrade.entity] : null);

const store = useStore();

const { leaves } = storeToRefs(store);
</script>

<template>
    <button class="upgrade-card" :disabled="!upgrade || leaves < upgrade.cost" v-on:click="processUpgrade(upgrade, store)">
        <span v-if="upgrade" class="content">
            <span class="icon">{{ entity && "icon" in entity ? entity.icon : upgrade.type }}</span>
            <br>
            <br>
            {{ upgrade.cost }} 🍂
        </span>
    </button>
</template>

<style scoped>
.upgrade-card {
    border: none;
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 0.5em;
    padding: 1em;
    text-align: center;
    cursor: pointer;
}

.upgrade-card[disabled] {
    cursor: not-allowed;
}

.upgrade-card[disabled] .content {
    opacity: 0.5;
}

.icon {
    font-size: 4em;
}
</style>