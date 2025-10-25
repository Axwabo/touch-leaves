import { defineStore } from "pinia";
import type TouchedLeafData from "./types/touchedLeafData.ts";
import { reactive, shallowReactive, type ShallowReactive } from "vue";
import { playLeafSound } from "./utils/sources.ts";
import { allUpgrades, type UpgradeDefinition } from "./types/upgradeDefinition.ts";
import type { EntityData } from "./types/entityData.ts";

interface State {
    leaves: number;
    touched: TouchedLeafData[];
    entities: EntityData[];
    visibleUpgrades: ShallowReactive<(UpgradeDefinition | null)[]>;
    remainingUpgrades: UpgradeDefinition[];
}

const maxVisible = 4;

function initialVisibleUpgrades() {
    return [ ...allUpgrades.slice(0, maxVisible), ...new Array(Math.max(0, maxVisible - allUpgrades.length)).fill(null) ];
}

const store = defineStore("touch-leaves", {
    state: (): State => ({
        leaves: 0,
        touched: reactive([]),
        entities: reactive([]),
        visibleUpgrades: shallowReactive(initialVisibleUpgrades()),
        remainingUpgrades: [ ...allUpgrades ]
    }),
    actions: {
        touch(amount: number, manual?: boolean) {
            amount = Math.floor(amount);
            if (amount === 0)
                return;
            this.leaves += amount;
            if (!manual)
                return;
            if (amount > 0)
                playLeafSound();
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

export default function useStore() {
    return store();
}