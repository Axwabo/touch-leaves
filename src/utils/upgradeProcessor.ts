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
    if (index === -1)
        return;
    store.visibleUpgrades.splice(index, 1);
    const remaining = store.remainingUpgrades.shift();
    if (remaining)
        store.visibleUpgrades.push(remaining);
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
        case "Levéls":
            store.level = 1;
            break;
        case "Pest Remover":
            store.pestRemover = true;
            break;
        case "Rainbow Leaves":
            store.rainbow = true;
            store.markiplier *= definition.Markiplier;
            break;
        case "Nice Words":
            store.niceWords = true;
            store.markiplier *= definition.Markiplier;
            break;
    }
}
