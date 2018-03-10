import { Accelerometer } from 'react-native-sensors'

const G = null

var callbacks = []

function runCallbacks(data){
    callbacks.forEach(callback => callback(data))
}

export async function init(){
    if(!G) G = await new Accelerometer({ updateInterval: 100 })
        .catch(e => console.log('Gyroscope not evailable', e))
    return !!G
}

export function subscribe(callback){
    if(!G) return
    callbacks.push(callback)
    G.subscribe(runCallbacks)
}

export function unsubscribe(callback){
    if(!G) return
    callbacks.splice(Array.indexOf(callback),1)
    if(!callbacks.length) G.stop()
}