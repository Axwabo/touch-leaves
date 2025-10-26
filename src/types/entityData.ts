import entities from "../assets/data/entities.json";

interface BaseEntity {
    readonly leavesPerSecond: number;
}

interface EmojiEntity extends BaseEntity {
    readonly icon: string;
}

interface StaticEntity extends EmojiEntity {
    readonly x: number;
}

interface ShuttlingEntity extends EmojiEntity {
    readonly y: number;
    readonly speed: number;
    readonly invert?: boolean;
}

interface EffectEntity extends BaseEntity {
    readonly type: "wind";
}

export type EntityType = keyof typeof entities;

export type EntityData = BaseEntity | EmojiEntity | StaticEntity | ShuttlingEntity | EffectEntity;

export const allEntities = entities as Record<EntityType, EntityData>;
