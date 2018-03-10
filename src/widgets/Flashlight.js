import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions
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
        this.lastVolumeValue = 0
        this.initialVolumeValue =  0
        this.volumeListener = null
        this.volumeButtonsDisabled = false
        this.volumeButtonsDisabledTimer = null
    }

    componentWillMount() {
        this.getPersistentData()
        this.getDeviceVolume()
        this.captureVolumeButtons()
    }

    async getDeviceVolume(){
        let volume = await SystemSetting.getVolume('system')
        this.initialVolumeValue = volume
    }

    async getPersistentData(){
        let persistentBrightness = parseFloat(await localStorage.load(PERSISTENT_BRIGHTNESS_NAME) || INITIAL_BRIGHTNESS)
        this.lastVolumeValue = persistentBrightness
        this.state.brightness.setValue(persistentBrightness)
        
    }

    async captureVolumeButtons() {
        this.initialVolumeValue = await SystemSetting.getVolume('system')
        this.volumeListener = SystemSetting.addVolumeListener(({system}) => {
            // if(this.volumeButtonsDisabled) return
            // this.volumeButtonsDisabled = true
            let delta = system - this.initialVolumeValue
            let value = this.lastVolumeValue

            if(delta <= 0) value -= BRIGHTNESS_STEP
            else value += BRIGHTNESS_STEP

            if(value < MIN_BRIGHTNESS) value = MIN_BRIGHTNESS
            else if(value > MAX_BRIGHTNESS) value = MAX_BRIGHTNESS

            this.lastVolumeValue = value

            SystemSetting.setVolume(this.initialVolumeValue, {
                type: 'system',
                playSound: false,
                showUI: false
            })
            this.state.brightness.setValue(value)
            // setTimeout(() => {
            //     this.volumeButtonsDisabled = false
            // }, VOLUME_BUTTONS_INTERVAL)
        })
    }

    componentWillUnmount (){
        SystemSetting.removeVolumeListener(this.volumeListener)
        localStorage.save(PERSISTENT_BRIGHTNESS_NAME, this.lastVolumeValue)
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