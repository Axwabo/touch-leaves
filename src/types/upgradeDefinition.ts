import { type EntityType } from "./entityData.ts";
import upgrades from "../assets/data/upgrades.json";

interface BaseUpgrade {
    cost: number;
    description: string;
    icon?: string;
}

interface EntityUpgrade extends BaseUpgrade {
    type: "entity";
    entity: EntityType;
}

interface TypeUpgrade<T extends string> extends BaseUpgrade {
    type: T;
}

export type UpgradeDefinition = EntityUpgrade
    | TypeUpgrade<"Speed">
    | TypeUpgrade<"Rainbow Leaves">
    | TypeUpgrade<"Music">
    | TypeUpgrade<"Levéls">
    | TypeUpgrade<"Pest Remover">;

export const allUpgrades = (upgrades as UpgradeDefinition[]).sort((a, b) => a.cost - b.cost);