export function item<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

export function icon() {
    return Math.random() < 0.5 ? "🍁" : "🍂";
}