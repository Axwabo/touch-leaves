<script setup lang="ts">
import useStore from "../store.ts";
import useInterval from "../composables/useInterval.ts";
import type { EntityData } from "../types/entityData.ts";

const { entity } = defineProps<{ entity: EntityData; }>();

const { touch } = useStore();

useInterval(() => touch(entity.leavesPerSecond));

const icon = entity.type === "squirrel" ? "🐿" : "what";

const x = entity.x + "rem";
</script>

<template>
    <span class="entity">{{ icon }}</span>
</template>

<style scoped>
.entity {
    position: absolute;
    top: 0;
    left: 50%;
    translate: calc(v-bind(x) - 50%) -80%;
    font-size: 3em;
}
</style>