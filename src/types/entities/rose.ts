import type { BaseEntity } from "../entityData.ts";

export class Rose implements BaseEntity {
    readonly leavesPerSecond: number = 3;
    readonly x: number = 25;
    readonly type = "rose";
}