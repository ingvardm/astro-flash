import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native'
import { Wrapper, ImageBackground } from '../components'
import { colors } from '../theme'
import { gyro } from '../sensors'

const containerSize = Dimensions.get('window').width * 0.8

const bubbleInterpolation = {
    inputRange:[-2.5,2.5],
    outputRange:[containerSize / 2, containerSize / -2],
    extrapolate: 'clamp'
}

export default class Level extends PureComponent {
    constructor(props){
        super(props)
        this.state ={
            x: new Animated.Value(0),
            y: new Animated.Value(0)
        }
    }

    componentDidMount(){
        this.initializeSensors()
    }

    async initializeSensors(){
        let gyroAvailable = await gyro.init()
        if(gyroAvailable) gyro.subscribe(this.handleGyroUpdate)
    }

    handleGyroUpdate = ({x,y}) => {
        this.state.x.setValue(-x)
        this.state.y.setValue(y)
    }

    render(){
        return <Wrapper>
            <View style={styles.markings}>
                <ImageBackground source={require('../assets/images/level.png')}/>
            </View>

            <Animated.View style={[styles.dot, { transform: [{ 
                translateX: this.state.x.interpolate(bubbleInterpolation)
            }]}]}/>

            <Animated.View style={[styles.dot, { transform: [{ 
                translateY: this.state.y.interpolate(bubbleInterpolation)
            }]}]}/>
        </Wrapper>
    }
}


const styles = StyleSheet.create({
    markings: {
        width: containerSize,
        height: containerSize
    },
    dot: {
        width: 20,
        height: 20,
        backgroundColor: colors.red,
        borderRadius: 10,
        position: 'absolute'
    },
    text: {
        color: colors.red,
        backgroundColor: colors.black,
        padding: 5,
        fontFamily: 'Roboto',
        fontSize: 10
    }
})