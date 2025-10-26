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
        <template v-if="upgrade">
            <span class="popup-anchor">
                <span class="popup">
                    <i>{{ upgrade.type === "entity" ? upgrade.entity : upgrade.type }}</i>
                    <br>
                    {{ upgrade.description }}
                    <br>
                    <span v-if="entity">+{{ entity.leavesPerSecond }} 🍂/s</span>
                </span>
            </span>
            <span class="content">
                <span class="icon">{{ entity && "icon" in entity ? entity.icon : upgrade.icon ?? upgrade.type }}</span>
                {{ upgrade.cost }} 🍂
            </span>
        </template>
    </button>
</template>

<style scoped>
.upgrade-card {
    display: grid;
    grid-template-rows: 0 1fr;
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

.content {
    transition: opacity 0.2s;
    display: grid;
    grid-template-rows: 1fr auto;
}

.upgrade-card[disabled] .content {
    opacity: 0.5;
}

.icon {
    font-size: 4em;
    margin-bottom: 0.5rem;
    align-self: end;
}

.popup-anchor {
    position: relative;
    pointer-events: none;
}

.popup {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    translate: -50% 0;
    width: max-content;
    padding: 1em;
    background-color: #323232;
    border: 3px solid gray;
    opacity: 0;
    transition: opacity 0.2s;
    line-height: 1.5;
}

.upgrade-card:hover .popup {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .popup, .content {
        transition: none;
    }
}
</style>