import leaf1 from "../assets/audio/leaf1.ogg";
import leaf2 from "../assets/audio/leaf2.ogg";
import leaf3 from "../assets/audio/leaf3.ogg";
import leaf4 from "../assets/audio/leaf4.ogg";
import leaf5 from "../assets/audio/leaf5.ogg";
import { item } from "./random.ts";

const leaves = [ leaf1, leaf2, leaf3, leaf4, leaf5 ];

export function playLeafSound() {
    const container = document.getElementById("leafSoundContainer");
    if (!container)
        return;
    const src = item(leaves)!;
    const available = Array.from(container.querySelectorAll("audio")).filter(e => e.ended && e.src === src);
    if (available.length) {
        const source = available[0]!;
        source.currentTime = 0;
        void source.play();
        return;
    }
    const source = document.createElement("audio");
    source.autoplay = true;
    source.src = src;
    container.append(source);
}