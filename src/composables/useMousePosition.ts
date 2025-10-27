import useWindowEvent from "./useWindowEvent.ts";

export default function useMousePosition(callback: (x: number, y: number) => void) {
    useWindowEvent("mousemove", mouse);
    useWindowEvent("touchmove", touch);

    function mouse(ev: MouseEvent) {
        callback(ev.clientX, ev.clientY);
    }

    function touch(ev: TouchEvent) {
        callback(ev.touches[0]!.clientX, ev.touches[0]!.clientY);
    }
}