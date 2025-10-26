import { onMounted, onUnmounted } from "vue";

export default function useInterval(callback: () => void, timeout: number = 1000) {
    let interval = 0;
    onMounted(() => interval = setInterval(callback, timeout));
    onUnmounted(() => clearInterval(interval));
}