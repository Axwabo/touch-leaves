<script setup lang="ts">
import useStore from "../../store.ts";
import useInterval from "../../composables/useInterval.ts";
import { allEntities, type EntityType } from "../../types/entityData.ts";
import { computed } from "vue";
import StaticEntity from "./StaticEntity.vue";
import ShuttlingEntity from "./ShuttlingEntity.vue";

const { type } = defineProps<{ type: EntityType; }>();

const entity = computed(() => allEntities[type]);

const { touch } = useStore();

useInterval(() => touch(entity.value.leavesPerSecond));
</script>

<template>
    <StaticEntity v-if="'x' in entity" :offset="entity.x" :icon="entity.icon" class="entity" />
    <ShuttlingEntity v-else-if="'y' in entity" :offset="entity.y" :icon="entity.icon" :speed="entity.speed" :invert="entity.invert" class="entity" />
</template>

<style scoped>
.entity {
    position: absolute;
    top: 0;
    left: 50%;
    font-size: 3em;
}
</style>