import { DeviceEventEmitter } from 'react-native'
import ReactNativeHeading from 'react-native-heading'

export async function init(){
    let available = await ReactNativeHeading.start(1)
    return !!available
}

export function subscribe(callback) {
    DeviceEventEmitter.addListener('headingUpdated', callback)

}
export function stop() {
    ReactNativeHeading.stop();
    DeviceEventEmitter.removeAllListeners('headingUpdated')
}