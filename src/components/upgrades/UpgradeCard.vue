<script setup lang="ts">
import type { UpgradeDefinition } from "../../types/upgradeDefinition.ts";
import useStore from "../../store.ts";
import { storeToRefs } from "pinia";

const { upgrade } = defineProps<{ upgrade: UpgradeDefinition | null; }>();

const { leaves } = storeToRefs(useStore());
</script>

<template>
    <div class="upgrade-card" :class="{ disabled: leaves < (upgrade?.cost ?? 0) }">
        <div v-if="upgrade" class="content">
            {{ upgrade.type }}
            {{ upgrade.entity }}
            <br>
            {{ upgrade.cost }} 🍂
        </div>
    </div>
</template>

<style scoped>
.upgrade-card {
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 0.5em;
    padding: 1em;
    text-align: center;
    cursor: pointer;
}

.disabled {
    cursor: not-allowed;
}

.disabled .content {
    opacity: 0.5;
}
</style>