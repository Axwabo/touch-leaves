import type { BaseEntity } from "../entityData.ts";

export class Squirrel implements BaseEntity {
    readonly leavesPerSecond: number = 5;
    readonly x: number = 10;
    readonly type = "squirrel";
}