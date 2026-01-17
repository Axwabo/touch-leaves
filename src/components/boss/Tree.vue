<script setup lang="ts">
import useStore from "../../store.ts";
import {storeToRefs} from "pinia";
import {computed, onUnmounted, reactive, ref, useTemplateRef} from "vue";
import Branch from "./Branch.vue";
import useAnimationFrame from "../../composables/useAnimationFrame.ts";
import {checkCollision} from "../../utils/collision.ts";
import Pinecone from "./Pinecone.vue";
import Spikes from "./Spikes.vue";
import useInterval from "../../composables/useInterval.ts";

const {leaf} = defineProps<{ leaf: HTMLSpanElement | null; }>();

const {bossHealth, stage} = storeToRefs(useStore());

type Attack = "pinecone" | "spikes";

const attacking = ref(false);

const attack = ref<Attack | null>(null);

const critical = ref(false);

const vulnerable = computed(() => attack.value === null);

const low = computed(() => bossHealth.value <= 300);

const tree = useTemplateRef("tree");

let collided = false;

let lowHealthInstantUsed = false;

const leftBranches = reactive(new Array(5).fill(true));
const rightBranches = reactive(new Array(5).fill(true));

let interval = 0;
let timeout = 0;

function damage(amount: number) {
    if (bossHealth.value <= 0 || tree.value?.getAnimations().some(e => e.playState === "running"))
        return false;
    bossHealth.value -= amount;
    critical.value = bossHealth.value <= 200;
    tree.value?.animate([{filter: "sepia(0.6) hue-rotate(-100deg)"}, {filter: "none"}], {duration: 500});
    if (bossHealth.value <= 0)
        setTimeout(() => stage.value = "completed", 2000);
    return true;
}

function hit(branches: boolean[], index: number) {
    if (damage(30))
        branches[index] = false;
}

useAnimationFrame(() => {
    if (!lowHealthInstantUsed && vulnerable.value && low.value) {
        lowHealthInstantUsed = true;
        attack.value = "spikes";
        clearInterval(interval);
        clearTimeout(timeout);
        interval = setInterval(attackIfNotCritical, 4000);
    }
    if (!critical.value || !tree.value || !leaf)
        return;
    const collision = checkCollision(tree.value, leaf);
    if (!collided && collision)
        damage(10);
    collided = collision;
});

useInterval(() => {
    if (low.value && !vulnerable.value)
        performAttack();
}, 2000);

onUnmounted(() => clearInterval(interval));

function performAttack() {
    timeout = setTimeout(() => {
        attack.value = Math.random() < 0.35
            ? null
            : Math.random() < 0.5
                ? "spikes"
                : "pinecone";
    }, Math.random() * 1000 + 1000);
}

function attackIfNotCritical() {
    if (!critical.value)
        performAttack();
}

defineExpose({
    critical,
    beginAttacking() {
        if (attacking.value)
            return;
        performAttack();
        interval = setInterval(attackIfNotCritical, 4000);
        attacking.value = true;
    },
});
</script>

<template>
    <div id="tree" :class="[attack ?? '']" ref="tree">
        <div id="trunk">
            <span id="face">{{ bossHealth <= 0 ? "<" : ">" }}:(</span>
            <Branch v-for="(alive, index) in leftBranches" :class="{ alive }" :index :leaf :vulnerable
                    v-on:hit="alive && hit(leftBranches, index)" />
            <Branch v-for="(alive, index) in rightBranches" :class="{ right: true, alive }" :index :leaf :vulnerable
                    v-on:hit="alive && hit(rightBranches, index)" />
        </div>
    </div>
    <Pinecone v-if="attack === 'pinecone'" :leaf />
    <Spikes v-else-if="attack === 'spikes'" :leaf />
</template>

<style scoped>
#tree {
    position: absolute;
    bottom: 0;
    width: 5rem;
    height: 20rem;
    left: 50%;
    translate: -50% 0;
    display: flex;
}

#trunk {
    position: relative;
    flex: 1;
    border: 2px solid white;
    background-color: #5e3a29;
    display: grid;
    place-items: center;
}

#tree.pinecone {
    animation: shake 1s linear;
}

#tree.spikes {
    animation: spin 1s linear;
}

#face {
    display: inline-block;
    rotate: 90deg;
    font-size: 2em;
    color: red;
}

:deep(.branch) {
    position: absolute;
    width: 10rem;
    height: 2rem;
    translate: -4.5rem 0;
    right: 0;
    filter: grayscale(1);
    opacity: 0.5;
}

:deep(.branch.right) {
    right: unset;
    left: 0;
    translate: 4.5rem 0;
    scale: -1;
}

:deep(.branch.alive) {
    filter: none;
    opacity: 1;
}

@keyframes shake {
    from, to {
        translate: -50% 0;
    }
    10%, 40%, 70% {
        translate: -60% 0;
    }
    30%, 55%, 84% {
        translate: -40% 0;
    }
}

@keyframes spin {
    to {
        rotate: 1turn;
    }
}
</style>