import type { UpgradeDefinition } from "../types/upgradeDefinition.ts";
import type { Store } from "../store.ts";
import { playPurchaseSound } from "./sources.ts";

export default function processUpgrade(definition: UpgradeDefinition | null, store: Store) {
    if (definition == null)
        return;
    applyUpgrade(definition, store);
    store.leaves -= definition.cost;
    playPurchaseSound();
    const index = store.visibleUpgrades.indexOf(definition);
    if (index !== -1)
        store.visibleUpgrades[index] = store.remainingUpgrades.shift() || null;
}

function applyUpgrade(definition: UpgradeDefinition, store: Store) {
    switch (definition.type) {
        case "entity":
            store.entities.push(definition.entity);
            break;
        case "Music":
            store.music = true;
            break;
        case "Speed":
            store.speed = true;
            break;
        case "Rainbow Leaves":
            store.rainbow = true;
            break;
    }
}
