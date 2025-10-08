export const MANIFEST = {
    bundles :[
        {
            name:'SPRITES',
            assets: [
                {alias: "romb", src: "./assets/sprites/SYM05.png"},
                {alias: "pentagon", src: "./assets/sprites/SYM06.png"},
                {alias: "square", src: "./assets/sprites/SYM04.png"},
                {alias: "star", src: "./assets/sprites/SYM01.png"},
                {alias: "circle", src: "./assets/sprites/SYM02.png"},
                {alias: "WIN", src: "./assets/sprites/WIN_BG.png"},
            ]
        },
        {
            name:'backgrounds&reels',
            assets: [
                {alias: "reels-frame", src: "./assets/sprites/REEL.png"},
                {alias: "background", src: "./assets/backgrounds/background.png"},
            ]
        },
        {
            name:'userInterface',
            assets: [
                {alias: "play-btn-disabled", src: "./assets/PLAY_DISABLED.png"},
                {alias: "play-btn", src: "./assets/PLAY.png"},
                {alias: "plus-btn", src: "./assets/plus-btn.png"},
                {alias: "minus-btn", src: "./assets/minus-btn.png"},
            ]
        },
    ]
}