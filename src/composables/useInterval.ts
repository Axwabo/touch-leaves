import { onMounted, onUnmounted } from "vue";

export default function useInterval(callback: () => void) {
    let interval = 0;
    onMounted(() => interval = setInterval(callback, 1000));
    onUnmounted(() => clearInterval(interval));
}