import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Animated, Dimensions, NativeAnimatedModule } from 'react-native'
import { colors } from '../theme'
import { heading } from '../sensors'
import { CrossHair } from '../components'

const headingUpdateThreshold = 50

export default class Compass extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            compasAvailable: false,
            heading: new Animated.Value(0),
            value: 0
        }
        this.lastHeadingUpdate = 0
    }

    componentDidMount() {
        this.initializeSensors()
    }

    componentWillUnmount(){
        heading.stop()
    }

    async initializeSensors(){
        let compasAvailable = await heading.init()
        if(compasAvailable) heading.subscribe(this.handleHeadingUpdate)
        this.setState({compasAvailable})
    }

    handleHeadingUpdate = heading => {
        let now = Date.now()
        if(now < this.lastHeadingUpdate + headingUpdateThreshold) return
        this.lastHeadingUpdate = now
        this.setState({value: heading})
        Animated.timing(
            this.state.heading,
            {
                toValue: heading,
                duration: 1,
                useNativeDriver: true
            }
        ).start()
    }

    render(){
        return (
            <View style={styles.container}>
                <CrossHair heading={this.state.heading}/>
                <Text style={styles.text}>{this.state.value}</Text>
            </View>
        )
    }
}

const containerSize = Dimensions.get('window').width * 0.8

const styles = StyleSheet.create({
    container: {
        width: containerSize,
        height: containerSize,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.red,
        fontFamily: 'Roboto',
        fontSize: 70
    }
})