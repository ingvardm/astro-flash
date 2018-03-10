import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'
import { colors } from '../theme'
import ImageBackground from './ImageBackground'

const crossHairWidth = 2
const crossHairLength = 20

const rotationInterpolation = {
    inputRange:[0,359],
    outputRange:['0deg', '-359deg']
}

export default class Compass extends PureComponent {
    render(){
        return (
            <Animated.View style={[styles.crossHairWrapper, {
                transform: [{ rotate: this.props.heading.interpolate(rotationInterpolation)}]
            }]}>
                <ImageBackground source={require('../assets/images/compass.png')}/>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    crossHairWrapper: {
        ...StyleSheet.absoluteFillObject
    },
    northMark: {
        position: 'absolute',
        top: crossHairLength * 1.5,
        color: colors.red,
        fontSize: 26,
        fontFamily: 'Roboto'
    },
    crossHair:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    crossHairHorizontal:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    crossHairLine: {
        backgroundColor: colors.red
    },
    crossHairLineVertical: {
        height: crossHairLength,
        width: crossHairWidth
    },
    crossHairLineHorizontal: {
        height: crossHairWidth,
        width: crossHairLength
    }
})