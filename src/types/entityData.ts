import type { Squirrel } from "./entities/squirrel.ts";
import type { Rose } from "./entities/rose.ts";

export interface BaseEntity {
    readonly leavesPerSecond: number;
    readonly x: number;
}

export type EntityData = Squirrel | Rose;

export type EntityType = EntityData["type"];