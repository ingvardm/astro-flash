import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Animated } from 'react-native'
import { Flashlight, Compass, Level } from '../widgets'
import { gyro } from '../sensors'
import KeepAwake from 'react-native-keep-awake'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = { flashlightOn: false }
    }

    componentDidMount() {
        this.initializeSensors()
    }

    componentWillUnmount(){
        gyro.stop()
    }

    async initializeSensors(){
        let gyroAvailable = await gyro.init()
        if(gyroAvailable) gyro.subscribe(this.handleGyroUpdate)
    }

    handleGyroUpdate = ({x,y,z}) => {
        let flashlightOn = this.state.flashlightOn ? z < 7 : z < -7

        if(flashlightOn) KeepAwake.activate()
        else KeepAwake.deactivate()

        this.setState({ flashlightOn })
    }

    Content = () => {
        if(this.state.flashlightOn){
            return <Flashlight />
        }

        return <View style={styles.container}>
            <Compass />
        </View>
    }

    render() {
        return <View style={styles.container}>
            <StatusBar hidden/>
            <this.Content/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})
