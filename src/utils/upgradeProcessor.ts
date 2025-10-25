import type { EntityUpgrade, UpgradeDefinition } from "../types/upgradeDefinition.ts";
import type { Store } from "../store.ts";
import { Squirrel } from "../types/entities/squirrel.ts";

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
        case "entity":
            addEntity(definition, store);
            break;
    }
}

function addEntity(definition: EntityUpgrade, store: Store) {
    switch (definition.entity) {
        case "squirrel":
            store.entities.push(new Squirrel());
            break;
    }
}
