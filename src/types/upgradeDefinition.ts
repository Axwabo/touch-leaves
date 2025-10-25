import type { EntityType } from "./entityData.ts";

interface BaseUpgrade {
    cost: number;
}

export interface EntityUpgrade extends BaseUpgrade {
    type: "entity";
    entity: EntityType;
}

export type UpgradeDefinition = EntityUpgrade;

export type UpgradeType = UpgradeDefinition["type"];

export const allUpgrades: UpgradeDefinition[] = [
    {
        type: "entity",
        cost: 30,
        entity: "squirrel"
    }
];