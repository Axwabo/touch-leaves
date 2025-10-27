import useWindowEvent from "./useWindowEvent.ts";

export default function useKeyListener(callback: (key: string) => void) {
    const listener = (ev: KeyboardEvent) => callback(ev.key);
    useWindowEvent("keydown", listener);
}