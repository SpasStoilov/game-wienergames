import { states } from "../main/states.js";

export class WinManagerComponent{
    constructor(){}
    accumulateWin(reelsAssets, reelPos, visibleTiles, totalWin){
        const visibleAssets = {}
        
        // Count tiles
        for (let r = 0; r < reelsAssets.length; r++) {

            const reel = reelsAssets[r];
            const positions = reelPos[r]
            
            for (let c = 0; c < reel.length; c++) {
                const tile = reel[c];
                const isVisible = tile.y >= positions[1] && tile.y <= positions[visibleTiles] ? true : false
                
                if (isVisible){
                    if (!Object.keys(visibleAssets).includes(tile.name)){
                        visibleAssets[tile.name] = 0
                    }
                    visibleAssets[tile.name] += 1
                }

            }
        }
       
        const repTiles = Object.values(visibleAssets).sort((a,b)=>b-a)[0]
        
        let win = totalWin

        if (repTiles > 1){
            win = totalWin + repTiles
        }
        
        states.updateWinAmount(win)
    }
}