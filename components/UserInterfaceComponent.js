import {constructorObject}from "../main/Utils.js"
import { appSettings as appSet } from "../game-settings/app.js";
import { states } from "../main/states.js";
import { userSettings as  userSet } from "../game-settings/user.js";

export class UserInterfaceComponent{
    view;
    playBtn;
    plusBtn;
    minusBtn;
    totalWin;
    totalWinFrame;
    betAmount;

    constructor(){
        this.view = constructorObject.Container();
        this.view.label = userSet.viewName
        this.view.y = userSet.viewPosY
        this.view.x = userSet.viewPosX
    }
    init(parent){
        this.createPlayBtn()
        this.createPlusBtn()
        this.createMinusBtn()
        this.createTotalWin()
        this.createBet()
        parent.addChild(this.view)
    }
    createPlayBtn(){
        this.playBtn = constructorObject.Sprite(appSet.USER_INTERFACE[userSet.playBtnName])
        this.playBtn.on('click', states.spinReels);
        // Opt-in to interactivity
        this.playBtn.eventMode = userSet.playBtnEventMode;
        // Shows hand cursor
        this.playBtn.cursor = userSet.playBtnCursor;
        this.playBtn.scale = userSet.playBtnScale
        this.playBtn.label = userSet.playBtnName
        this.view.addChild(this.playBtn)
    }
    createPlusBtn(){
        this.plusBtn = constructorObject.Sprite(appSet.USER_INTERFACE[userSet.plusBtnName])
        this.plusBtn.x = userSet.plusBtnX
        this.plusBtn.on('click', states.userIncreaseBet);
        // Opt-in to interactivity
        this.plusBtn.eventMode = userSet.plusBtnEventMode;
        // Shows hand cursor
        this.plusBtn.cursor = userSet.plusBtnCursor;
        this.plusBtn.scale = userSet.plusBtnScale
        this.plusBtn.label = userSet.plusBtnName
        this.view.addChild(this.plusBtn)
    }
    createMinusBtn(){
        this.minusBtn = constructorObject.Sprite(appSet.USER_INTERFACE[userSet.minusBtnName])
        this.minusBtn.x = userSet.minusBtnX
        this.minusBtn.on('click', states.userDecreaseBet);
        // Opt-in to interactivity
        this.minusBtn.eventMode = userSet.minusBtnEventMode;
        // Shows hand cursor
        this.minusBtn.cursor = userSet.minusBtnCursor;
        this.minusBtn.label = userSet.minusBtnName
        this.view.addChild(this.minusBtn)
        this.minusBtn.scale.set(userSet.minusBtnScale)
    }
    createTotalWin(){
        this.totalWin = constructorObject.Text(`$ ${userSet.totalWinAmount} $`)
        this.totalWin.label = userSet.totalWinName
        this.view.addChild(this.totalWin)
        this.totalWin.y = userSet.totalWinY
        this.totalWin.x = userSet.totalWinX
        this.totalWin.scale.set(userSet.totalWinScale)
        this.totalWin.anchor.set(userSet.totalWinAnchor)
    }
    createBet(){
        this.betAmount = constructorObject.Text(`${userSet.bet} $`)
        this.betAmount.label = userSet.betAmountName
        this.view.addChild(this.betAmount)
        this.betAmount.y = userSet.betAmountY
        this.betAmount.x = userSet.betAmountX
        this.betAmount.scale.set(userSet.betAmountScale)
        this.betAmount.anchor.set(userSet.betAmountAnchor)
    }
    setPlayBtnTexture(texture){
        this.playBtn.texture = texture
    }
    updateWinAmount(win){
        this.betAmount.text = '0'
        this.totalWin.text = `${win} $`
        userSet.bet = 0
        userSet.totalWinAmount = win
    }
}