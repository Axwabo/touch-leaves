import { onMounted, onUnmounted } from "vue";

export default function useKeyListener(callback: (key: string) => void) {
    const listener = (ev: KeyboardEvent) => callback(ev.key);
    onMounted(() => window.addEventListener("keydown", listener));
    onUnmounted(() => window.removeEventListener("keydown", listener));
}