import leaf1 from "../assets/audio/leaf1.ogg";
import leaf2 from "../assets/audio/leaf2.ogg";
import leaf3 from "../assets/audio/leaf3.ogg";
import leaf4 from "../assets/audio/leaf4.ogg";
import leaf5 from "../assets/audio/leaf5.ogg";
import purchase from "../assets/audio/purchase.ogg";
import nice1 from "../assets/audio/nice1.ogg";
import nice2 from "../assets/audio/nice2.ogg";
import nice3 from "../assets/audio/nice3.ogg";
import nice4 from "../assets/audio/nice4.ogg";
import { item } from "./random.ts";

const leaves = [ leaf1, leaf2, leaf3, leaf4, leaf5 ];

const nice = [ nice1, nice2, nice3, nice4 ];

function playPooled(src: string, container: HTMLElement | null) {
    if (!container)
        return;
    const available = Array.from(container.querySelectorAll("audio")).filter(e => e.ended && e.src === src);
    if (container.querySelectorAll("audio").length > 30)
        return;
    const first = available[0];
    if (first) {
        first.currentTime = 0;
        void first.play();
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

export function playNiceSound() {
    playPooled(item(nice)!, document.getElementById("niceSoundContainer"));
}