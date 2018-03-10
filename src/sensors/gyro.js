import { Accelerometer } from 'react-native-sensors'

const G = null

export async function init(){
    G = await new Accelerometer({ updateInterval: 100 })
        .catch(e => console.log('Gyroscope not evailable', e))
    return !!G
}

export function subscribe(callback){
    G && G.subscribe(callback)
}

export function stop(){
    G && G.stop()
}