export function checkCollision(collider: Element, leaf: HTMLElement) {
    const boxRect = collider.getBoundingClientRect();
    const leafRect = leaf.getBoundingClientRect();
    const x = (leafRect.left + leafRect.right) * 0.5;
    const y = (leafRect.top + leafRect.bottom) * 0.5;
    return boxRect.left < x && boxRect.right > x && boxRect.top < y && boxRect.bottom > y;
}