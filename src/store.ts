import { defineStore } from "pinia";
import type TouchedLeafData from "./types/touchedLeafData.ts";
import { reactive } from "vue";

interface State {
    leaves: number;
    touched: TouchedLeafData[];
}

const store = defineStore("touch-leaves", {
    state: (): State => ({ leaves: 0, touched: reactive([]) }),
    actions: {
        touch(amount: number) {
            amount = Math.floor(amount);
            if (amount === 0)
                return;
            this.leaves += amount;
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