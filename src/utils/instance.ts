import type { Reactive } from "vue";

export interface Instance {
    id: string;
    deleted: boolean;
}

export function createInstance(instances: Reactive<Instance[]>) {
    for (const instance of instances) {
        if (!instance.deleted)
            continue;
        instance.deleted = false;
        instance.id = Math.random().toString();
        return;
    }
    instances.push({ id: Math.random().toString(), deleted: false });
}