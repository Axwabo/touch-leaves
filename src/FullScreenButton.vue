<script setup lang="ts">

</script>

<template>
    <button id="fullScreen" onclick="document.body.requestFullscreen();">
        <svg viewBox="0 0 52 52">
            <rect stroke-dasharray="24 24" x="1" y="1" stroke-dashoffset="12" width="48" height="48" stroke="white" stroke-width="8" fill="transparent" />
        </svg>
    </button>
</template>

<style scoped>
#fullScreen {
    position: absolute;
    top: 2rem;
    left: 1em;
    padding: 1em;
    border-radius: 0.5em;
}

#fullScreen svg {
    width: 2em;
    height: 2em;
}
</style>