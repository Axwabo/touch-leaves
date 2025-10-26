import { onMounted, type Ref } from "vue";
import useInterval from "./useInterval.ts";

const keyframes = [
    { opacity: 0, scale: 0 },
    { opacity: 1, scale: 1 },
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0, translate: "10rem 2rem" }
];

export default function useWind(ref: Ref<HTMLElement | null>) {
    useInterval(() => ref.value?.animate(keyframes, { duration: 1000 }), Math.random() * 3000 + 2000);
    if (Math.random() < 0.8)
        onMounted(() => ref.value?.animate(keyframes, { duration: 1000, delay: Math.random() * 2000 }));
}