import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'
import SystemSetting from 'react-native-system-setting'
import * as localStorage from '../storage'

const MIN_BRIGHTNESS = 0.2
const MAX_BRIGHTNESS = 1
const BRIGHTNESS_STEP = 0.2
const INITIAL_BRIGHTNESS = (MAX_BRIGHTNESS - MIN_BRIGHTNESS) / 2
const PERSISTENT_BRIGHTNESS_NAME = 'flashlight_brightness'
const VOLUME_BUTTONS_INTERVAL = 200

export default class Flashlight extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            brightness: new Animated.Value(0),
            ready: false
        }
        this.brightnessFloat = 0
    }

    componentWillMount() {
        this.getPersistentData()
        this.captureVolumeButtons()
    }

    async getPersistentData(){
        let persistentBrightness = parseFloat(await localStorage.load(PERSISTENT_BRIGHTNESS_NAME) || INITIAL_BRIGHTNESS)
        this.brightnessFloat = persistentBrightness
        this.state.brightness.setValue(persistentBrightness)
    }

    async captureVolumeButtons() {
        DeviceEventEmitter.addListener('keyVolumeUp', _=>{
            let value = this.brightnessFloat + BRIGHTNESS_STEP
            if(value > MAX_BRIGHTNESS) value = MAX_BRIGHTNESS
            this.brightnessFloat = value
            this.state.brightness.setValue(value)
        })
        DeviceEventEmitter.addListener('keyVolumeDown', _=>{
            let value = this.brightnessFloat - BRIGHTNESS_STEP
            if(value < MIN_BRIGHTNESS) value = MIN_BRIGHTNESS
            this.brightnessFloat = value
            this.state.brightness.setValue(value)
        })
    }

    componentWillUnmount (){
        SystemSetting.removeVolumeListener(this.volumeListener)
        localStorage.save(PERSISTENT_BRIGHTNESS_NAME, this.brightnessFloat)
    }

    render = () => {
        return <Animated.View
            // {...this._panResponder.panHandlers}
            style={[
                styles.flashlight,
                { opacity: this.state.brightness }
            ]}
        />
    }
}

const styles = StyleSheet.create({
    flashlight: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ff0000'
    }
})