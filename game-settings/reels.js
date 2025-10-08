export const reelsSettings = {
    reelsFramePosition: {
       x: 980,
       y: 300
    },
    reelsFrameWidth: 130,
    reelsFrameHeight: 300,
    assetsStopPositions: {},
    /**
     * Reels Assets
    */
   reelAssetLabel: "reels-view",
   reelsAssets: [],
   assetWidth: 100,
   assetHeight: 100,
   assetXOffset: 15,
   assetYOffset: 1,
   /**
    * Reels
   */
    numberOfReels: 1,
    numberOfassetsPerReel: 7,
    visibleAssets: 3,
    posNumOfRandomTextures: 7,
    reelsInitTextures: [
        [ "romb", "pentagon", "square", "star", "circle", "romb", "romb"],
    ],
    reelsTextures: ["romb", "pentagon", "square", "star", "circle", "WIN"],
    /**
     * Reels spining
     */
    orderOfSpining: [0],// idex of the reel : 0,1,2,3......
    stopMoving: false,
    assetsMoving: 0,
    /**
     * Mask
     */
    mask:{
        x: 980, 
        y: 309,
        width: 130,
        height: 284,
        name: "reels-frame-mask",
        fill: 0xffffff
    },
    /**
     * Reels Frame
     */
    frameAssetlabel:"reels-frame"
}

export const reelsSpinSettings = {
    duration: 1, 
    ease:"power1.inOut"
}