import { onMounted, onUnmounted } from "vue";

const maxDelta = 1 / 15;

export default function useAnimationFrame(callback: (deltaTime: number) => void) {
    let id = 0;
    let now = 0;
    onMounted(request);
    onUnmounted(() => cancelAnimationFrame(id));

    function request() {
        id = requestAnimationFrame(request);
        if (now)
            callback(Math.min(maxDelta, (performance.now() - now) * 0.001));
        now = performance.now();
    }
}