import type { EntityType } from "./entityData.ts";
import upgrades from "../assets/data/upgrades.json";

interface BaseUpgrade {
    cost: number;
}

interface EntityUpgrade extends BaseUpgrade {
    type: "entity";
    entity: EntityType;
}

export type UpgradeDefinition = EntityUpgrade;

export const allUpgrades = upgrades as UpgradeDefinition[];