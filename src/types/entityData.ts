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

export type EntityType = keyof typeof entities;

export type EntityData = BaseEntity | EmojiEntity | StaticEntity;

export const allEntities = entities as Record<EntityType, EntityData>;
