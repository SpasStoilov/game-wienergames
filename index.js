import { START_APP } from "./root.js";
import { states } from "./main/states.js";

async function INIT() {
    await START_APP()
    states.drawGame()
}

INIT()