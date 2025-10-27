import { onMounted, onUnmounted } from "vue";

export default function useWindowEvent<K extends keyof WindowEventMap>(name: K, callback: (ev: WindowEventMap[K]) => void) {
    onMounted(() => window.addEventListener(name, callback));
    onUnmounted(() => window.removeEventListener(name, callback));
}