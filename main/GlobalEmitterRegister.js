import * as AllEmitters from "../components/emitters.js"

export const Components = {}

/**
 * Function that initializes all components classes.
 */
export async function emitterFactory(){
    /**
     * Loop over all emitterClass in components dir
     */
    for (let [name , emitterClass] of Object.entries(AllEmitters)){
        /**
         * Get emitterClass instance
         */
        const instance = new emitterClass()
        /**
         * Register class components
         */
        Components[name] = instance
    }
    return Promise.resolve()
}