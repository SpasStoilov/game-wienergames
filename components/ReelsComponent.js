import { constructorObject }from "../main/Utils.js"
import { appSettings as appSet } from "../game-settings/app.js";
import { reelsSpinSettings as reelSpinSet } from "../game-settings/reels.js";
import { reelsSettings as reelSet } from "../game-settings/reels.js";
import { gsap } from "../node_modules/gsap/gsap-core.js";
import { states } from "../main/states.js";
import { userSettings as userSet } from "../game-settings/user.js";

export class ReelsComponent{
    parent = null;
    view;
    reelsContainer;

    constructor(){
        this.view = constructorObject.Container();
        this.reelsContainer = constructorObject.Container();
        this.view.label = reelSet.reelAssetLabel
        this.reelsContainer.label = reelSet.reelsContainerLabel
        this.reelsContainer.x = reelSet.reelsContainerX
        this.reelsContainer.y = reelSet.reelsContainerY
    }
    init(parent){
        this.parent = parent
        this.createReelsFrame()
        this.createReels()
        this.setMaks()
        this.reelsContainer.addChild(this.view)
        this.parent.addChild(this.reelsContainer)
    }
    createReelsFrame(){
        this.reelsFrame = constructorObject.Sprite(appSet.BACKGROUNDS_REELS[reelSet.frameAssetlabel])
        this.reelsFrame.label = reelSet.frameAssetlabel
        this.reelsFrame.width = reelSet.reelsFrameWidth
        this.reelsFrame.height = reelSet.reelsFrameHeight
        this.reelsFrame.position.set(reelSet.reelsFramePosition.x, reelSet.reelsFramePosition.y)
        this.reelsContainer.addChild(this.reelsFrame)
    }
    setMaks(){
        const mask = constructorObject.Graphics()
        mask.name = reelSet.mask.name
        mask.rect(
            reelSet.mask.x, 
            reelSet.mask.y,
            reelSet.mask.width,
            reelSet.mask.height
        );
        mask.fill(reelSet.mask.fill);
        this.view.mask = mask
        this.reelsContainer.addChild(mask)
    }
    createReels(){
        for(let i of Array.from({ length: reelSet.numberOfReels }, (_, i) => i)){
            this.createReel(i)
        }
    }
    createReel(reelIndex){
        for (let slotIndex = 0; slotIndex < reelSet.numberOfassetsPerReel; slotIndex++){
            const txt = reelSet.reelsInitTextures[reelIndex][
                Math.floor(
                    Math.random()*(reelSet.posNumOfRandomTextures)
                )
            ]
            const asset = constructorObject.Sprite(appSet.SPRITES[txt])
            asset.name = reelSet.reelsInitTextures[reelIndex][slotIndex]
            asset.width = reelSet.assetWidth
            asset.height = reelSet.assetHeight
            const x = reelSet.reelsFramePosition.x + reelSet.assetXOffset + reelSet.assetWidth*reelIndex
            const y = reelSet.reelsFramePosition.y + reelSet.assetYOffset + reelSet.assetHeight*(slotIndex-1) //- 9000
            asset.position.set(x, y)
            if (!reelSet.reelsAssets[reelIndex]){
                reelSet.reelsAssets[reelIndex] = []
            }
            if (!reelSet.assetsStopPositions[reelIndex]){
                reelSet.assetsStopPositions[reelIndex] = []
            }
            reelSet.reelsAssets[reelIndex].push(asset)
            reelSet.assetsStopPositions[reelIndex].push(y)
            this.view.addChild(asset)
        }
    }
    changeRandomTexture(asset){
        const randomIndex = Math.round(Math.random()*(reelSet.reelsTextures.length-1))
        this.setTexture(asset, appSet.SPRITES[reelSet.reelsTextures[randomIndex]], reelSet.reelsTextures[randomIndex])
    }
    setTexture(asset, texture, txtName){
        asset.texture = texture
        asset.name = txtName
    }
    spinReels(){
        
        if (!userSet.bet)return;
        
        const self = this
        reelSet.stopMoving = false
        let takenSnapPos = []

        for(let reelIndex of reelSet.orderOfSpining){
            takenSnapPos.push([])
            const sortedAssetsByPos = reelSet.reelsAssets[reelIndex].sort((a, b)=> a.y - b.y)

            const topYPos = sortedAssetsByPos[0].y
            
            const snapPositions = reelSet.assetsStopPositions[reelIndex]
            
            for (let asset of sortedAssetsByPos) {
                const i = sortedAssetsByPos.indexOf(asset)
                const initPos = topYPos + reelSet.assetHeight*i
                const maxDY = reelSet.assetHeight * reelSet.numberOfassetsPerReel

                gsap.defaults(reelSpinSet);
                
                let windowWrap = gsap.utils.wrap(
                    topYPos, 
                    topYPos + maxDY
                )

                const t = gsap.to(asset, {
                    y: initPos + maxDY,
                    onUpdateParams: [asset, reelIndex],
                    modifiers: {
                        y: (y) => {
                            let r = windowWrap(parseFloat(y))
                            return r
                        }
                    },
                    onUpdate: function(asset) {
                        // Snap Position
                        // NOTES: Util function in gsap dose not work ok! So custom is build.
                        const lastStopPos = reelSet.assetsStopPositions[reelIndex][reelSet.numberOfassetsPerReel-1]

                        if (reelSet.stopMoving){
                            let occupiedPositions = takenSnapPos[reelIndex].sort((a,b)=> a - b)

                            let posiblePos = snapPositions
                                .filter(p => !occupiedPositions.includes(p))
                            
                            let dy = null
                            let snapPos = null
                            
                            posiblePos.forEach(p => {
                                const diff = Math.abs(p - asset.y)
                                if (dy === null || dy > diff){
                                    dy = diff
                                    snapPos = p
                                }
                            })

                            asset.y = snapPos
                            takenSnapPos[reelIndex].push(asset.y)
                            reelSet.assetsMoving -= 1
                            reelSet.assetsMoving || states.reelsHasStopped()
                            t.kill()
                        }
                        if (asset.y <= topYPos || asset.y >= lastStopPos){
                            self.changeRandomTexture(asset)
                        }
                    },
                    onComplete:()=>{
                        reelSet.assetsMoving -= 1
                        reelSet.assetsMoving || states.reelsHasStopped()
                    }
                });

                reelSet.assetsMoving += 1
                
            }
        }
    }
    stopReels(){
        reelSet.stopMoving = true
    }
}