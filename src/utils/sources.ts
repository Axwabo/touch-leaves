import leaf1 from "../assets/audio/leaf1.ogg";
import leaf2 from "../assets/audio/leaf2.ogg";
import leaf3 from "../assets/audio/leaf3.ogg";
import leaf4 from "../assets/audio/leaf4.ogg";
import leaf5 from "../assets/audio/leaf5.ogg";
import purchase from "../assets/audio/purchase.ogg";
import { item } from "./random.ts";

const leaves = [ leaf1, leaf2, leaf3, leaf4, leaf5 ];

function playPooled(src: string, container: HTMLElement | null) {
    if (!container)
        return;
    const available = Array.from(container.querySelectorAll("audio")).find(e => e.ended && e.src === src);
    if (available) {
        available.currentTime = 0;
        void available.play();
        return;
    }
    const source = document.createElement("audio");
    source.autoplay = true;
    source.src = src;
    container.append(source);
}

export function playLeafSound() {
    playPooled(item(leaves)!, document.getElementById("leafSoundContainer"));
}

export function playPurchaseSound() {
    playPooled(purchase, document.getElementById("purchaseSoundContainer"));
}