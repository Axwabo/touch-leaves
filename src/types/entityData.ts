interface BaseEntityData {
    leavesPerSecond: number;
}

interface Squirrel extends BaseEntityData {
    type: "squirrel";
}

export type EntityData = Squirrel;

export type EntityType = EntityData["type"];