import { Components as comp} from "./GlobalEmitterRegister.js"
import { appSettings as appSet } from "../game-settings/app.js"
import { reelsSettings as reelSet } from "../game-settings/reels.js"
import { userSettings as userSet } from "../game-settings/user.js"

export const states = {
    drawGame(){
        console.log("%cState -> Draw Game", appSet.statesLogStyles);
        comp.BackgroundComponent.init(appSet.App.stage)
        comp.ReelsComponent.init(appSet.App.stage)
        comp.UserInterfaceComponent.init(appSet.App.stage)
    },
    userIncreaseBet(){
        console.log("%cState -> Increase Bet", appSet.statesLogStyles);
        if (userSet.totalWinAmount > 0 && !reelSet.assetsMoving){
            userSet.bet += 1
            userSet.totalWinAmount -= 1
            comp.UserInterfaceComponent.betAmount.text = `${userSet.bet} $`
            comp.UserInterfaceComponent.totalWin.text = `${userSet.totalWinAmount} $`
        }

    },
    userDecreaseBet(){
        console.log("%cState -> Decrease Bet", appSet.statesLogStyles);
        if (userSet.bet > 0 && !reelSet.assetsMoving){
            userSet.bet -= 1
            userSet.totalWinAmount += 1
            comp.UserInterfaceComponent.betAmount.text = `${userSet.bet} $`
            comp.UserInterfaceComponent.totalWin.text = `${userSet.totalWinAmount} $`
        }
    },
    spinReels(){
        console.log("%cState -> Reels Spin", appSet.statesLogStyles);
        
        if (!reelSet.assetsMoving){
            comp.ReelsComponent.spinReels()
        }
        else {
            comp.ReelsComponent.stopReels()
        }
    },
    reelsHasStopped(){
        console.log("%cState -> Reels Stopped", appSet.statesLogStyles);
        comp.WinManagerComponent.accumulateWin(
            reelSet.reelsAssets, 
            reelSet.assetsStopPositions,
            reelSet.visibleAssets,
            userSet.totalWinAmount
        )
        if (userSet.totalWinAmount === 0){
            comp.UserInterfaceComponent.setPlayBtnTexture(appSet.USER_INTERFACE[userSet.playBtnDisabledName])
        }
    },
    updateWinAmount(win){
        console.log("%cState -> Update Win Amount", appSet.statesLogStyles);
        comp.UserInterfaceComponent.updateWinAmount(win)
    }
}