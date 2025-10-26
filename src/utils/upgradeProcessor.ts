import type { UpgradeDefinition } from "../types/upgradeDefinition.ts";
import type { Store } from "../store.ts";

export default function processUpgrade(definition: UpgradeDefinition | null, store: Store) {
    if (definition == null)
        return;
    applyUpgrade(definition, store);
    const index = store.visibleUpgrades.indexOf(definition);
    if (index !== -1)
        store.visibleUpgrades[index] = store.remainingUpgrades.shift() || null;
}

function applyUpgrade(definition: UpgradeDefinition, store: Store) {
    switch (definition.type) {
        case "Speed":
            store.speed = true;
            break;
        case "entity":
            store.entities.push(definition.entity);
            break;
    }
}
