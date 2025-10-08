import * as PIXI from './node_modules/pixi.js/dist/pixi.mjs';
import { MANIFEST } from './manifest.js';
import { emitterFactory } from './main/GlobalEmitterRegister.js';
import { appSettings } from './game-settings/app.js';
//----------------------  IMPORTS -------------------------------------^

/**
 *  Application starter
 */
export async function START_APP(){
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *              Create Application
     * -----------------------------------------------
     */
    const app = new PIXI.Application()
    await app.init(
        {
            width: appSettings.appWidth,
            height: appSettings.appHeight,
            backgroundColor: appSettings.appBackgroundColor,
        }
    )
    appSettings.App = app
    globalThis.__PIXI_APP__ = app;
    app.id = appSettings.appId;
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *          Load MANIFEST with all bundles
     * -----------------------------------------------
     */
    const manifest = MANIFEST
    await PIXI.Assets.init({manifest})
    appSettings.SPRITES = await PIXI.Assets.loadBundle(appSettings.bundles[0])
    appSettings.BACKGROUNDS_REELS = await PIXI.Assets.loadBundle(appSettings.bundles[1])
    appSettings.USER_INTERFACE = await PIXI.Assets.loadBundle(appSettings.bundles[2])
    /**
     * Init all components
     */
    await emitterFactory()
    /** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     *        Dock Application to index.html
     * -----------------------------------------------
     */
    app.renderer.resize(appSettings.appWidth, appSettings.appHeight);
    document.body.appendChild(app.canvas)
    return Promise.resolve()
}