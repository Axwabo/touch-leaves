import entities from "../assets/data/entities.json";

interface BaseEntity {
    readonly leavesPerSecond: number;
    readonly x: number;
}

interface EmojiEntity extends BaseEntity {
    readonly icon: string;
}

export type EntityType = keyof typeof entities;

export type EntityData = BaseEntity | EmojiEntity;

export const allEntities = entities as Record<EntityType, EntityData>;
