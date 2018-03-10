import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Flashlight, Compass, Level } from '../widgets'
import { gyro, heading } from '../sensors'
import KeepAwake from 'react-native-keep-awake'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flashlightOn: false,
            gyroAvailable: false,
            compasAvailable: false,
            heading: 0,
            angles: { x:0, y:0 }
        }
    }

    componentDidMount() {
        this.initializeSensors()
    }

    componentWillUnmount(){
        gyro.stop()
        heading.stop()
    }

    async initializeSensors(){
        let [ gyroAvailable, compasAvailable ] = await new Promise.all([
            gyro.init(),
            heading.init()
        ])

        if(gyroAvailable) gyro.subscribe(this.handleGyroUpdate)
        if(compasAvailable) heading.subscribe(this.handleHeadingUpdate)
    }

    handleHeadingUpdate = heading => {
        this.setState({heading})
    }

    handleGyroUpdate = ({x,y,z}) => {
        let flashlightOn = this.state.flashlightOn ? z < 7 : z < -7

        if(flashlightOn){
            KeepAwake.activate()
            heading.stop()
        } else {
            heading.init()
            heading.subscribe(this.handleHeadingUpdate)
            KeepAwake.deactivate()
        }

        this.setState({
            flashlightOn,
            angles:{x,y}
        })
    }

    Content = () => {
        if(this.state.flashlightOn){
            return <Flashlight />
        }

        return <View style={styles.container}>
            <Compass heading={this.state.heading} />
            <Level {...this.state.angles}/>
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
