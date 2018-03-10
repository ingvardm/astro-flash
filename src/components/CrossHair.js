import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'
import { colors } from '../theme'

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
                <View style={styles.crossHair}>
                    <View style={[styles.crossHairLine, styles.crossHairLineVertical]}/>
                    <Text style={styles.northMark}>N</Text>
                    <View style={[styles.crossHair, styles.crossHairHorizontal]}>
                        <View style={[styles.crossHairLine, styles.crossHairLineHorizontal]}/>
                        <View style={[styles.crossHairLine, styles.crossHairLineHorizontal]}/>
                    </View>
                    <View style={[styles.crossHairLine, styles.crossHairLineVertical]}/>
                </View>
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