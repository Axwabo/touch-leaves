import type { Squirrel } from "./entities/squirrel.ts";

export interface BaseEntity {
    readonly leavesPerSecond: number;
    readonly x: number;
}

export type EntityData = Squirrel;

export type EntityType = EntityData["type"];