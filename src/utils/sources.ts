import leaf1 from "../assets/audio/leaf1.ogg";
import leaf2 from "../assets/audio/leaf2.ogg";
import { item } from "./random.ts";

const leaves = [ leaf1, leaf2 ];

export function playLeafSound() {
    const container = document.getElementById("leafSoundContainer");
    if (!container)
        return;
    const available = Array.from(container.querySelectorAll("audio")).filter(e => e.ended);
    if (available.length) {
        const source = item(available)!;
        source.currentTime = 0;
        void source.play();
        return;
    }
    const source = document.createElement("audio");
    source.autoplay = true;
    source.src = item(leaves)!;
    container.append(source);
}