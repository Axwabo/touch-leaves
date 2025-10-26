import { defineStore, type Store as PiniaStore, type StoreDefinition } from "pinia";
import type TouchedLeafData from "./types/touchedLeafData.ts";
import { reactive, shallowReactive } from "vue";
import { playLeafSound } from "./utils/sources.ts";
import { allUpgrades, type UpgradeDefinition } from "./types/upgradeDefinition.ts";
import type { EntityType } from "./types/entityData.ts";

interface State {
    leaves: number;
    touchedThisSecond: number;
    manuallyTouched: number;
    markiplier: number;
    touched: TouchedLeafData[];
    entities: EntityType[];
    visibleUpgrades: UpgradeDefinition[];
    remainingUpgrades: UpgradeDefinition[];
    speed: boolean;
    rainbow: boolean;
    music: boolean;
    level: number;
    pestRemover: boolean;
    niceWords: boolean;
    snake: boolean;
}

const maxVisible = 4;

const store = defineStore("touch-leaves", {
    state: (): State => ({
        leaves: 0,
        touchedThisSecond: 0,
        manuallyTouched: 0,
        markiplier: 1,
        touched: reactive([]),
        entities: reactive([]),
        visibleUpgrades: shallowReactive([ ...allUpgrades.slice(0, maxVisible) ]),
        remainingUpgrades: allUpgrades.slice(maxVisible),
        speed: false,
        rainbow: false,
        music: false,
        level: 1,
        pestRemover: false,
        niceWords: false,
        snake: false
    }),
    actions: {
        touch(amount: number, manual?: boolean) {
            amount = Math.floor(amount);
            if (amount === 0)
                return;
            if (amount > 0)
                this.touchedThisSecond += amount;
            this.leaves += amount;
            if (!manual)
                return;
            if (amount > 0) {
                playLeafSound();
                this.manuallyTouched += amount;
            }
            for (const e of this.touched) {
                if (!e.completed)
                    continue;
                e.completed = false;
                e.amount = amount;
                return;
            }

            if (this.touched.length < 100)
                this.touched.push({ amount, completed: false, id: performance.now().toString(16) });
        }
    }
});

export type Store = typeof store extends StoreDefinition<infer Id, infer S, infer G, infer A> ? PiniaStore<Id, S, G, A> : never;

export default function useStore() {
    return store();
}