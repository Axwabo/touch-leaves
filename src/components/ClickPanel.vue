<script setup lang="ts">
import useStore from "../store.ts";

const { touch } = useStore();
</script>

<template>
    <div id="touch" v-on:click="touch(1)">
        <h1>touch<br>leaves</h1>
    </div>
</template>

<style scoped>
#touch {
    cursor: pointer;
}

#touch h1 {
    user-select: none;
}
</style>