import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs';

/**
 * PIXI factory object
 */
export const constructorObject = {
    Sprite(txt){
        return new PIXI.Sprite(txt);
    },
    Container(){
        return new PIXI.Container();
    },
    Texture(path){
        return PIXI.Texture.from(path);
    },
    Graphics(){
        return new PIXI.Graphics();
    },
    Text(text){
        return new PIXI.Text({text})
    }
}