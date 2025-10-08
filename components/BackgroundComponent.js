import {constructorObject}from "../main/Utils.js"
import { appSettings } from "../game-settings/app.js";
import { backgroundSettings as backSet } from "../game-settings/background.js";

export class BackgroundComponent{
    view;

    constructor(){
        this.view = constructorObject.Container();
        this.view.label = backSet.backgroundViewName
    }

    init(parent){
        this.background = constructorObject.Sprite(
            appSettings.BACKGROUNDS_REELS[backSet.backgroundName]
        )
        this.background.label = backSet.backgroundName
        this.background.width = backSet.width
        this.background.height = backSet.height
        this.view.addChild(this.background)
        parent.addChild(this.view)
    }
}