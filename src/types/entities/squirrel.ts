import type { BaseEntity } from "../entityData.ts";

export class Squirrel implements BaseEntity {
    readonly leavesPerSecond: number = 5;
    readonly x: number = 20;
    readonly type = "squirrel";
}