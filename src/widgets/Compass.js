import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Animated, Dimensions, NativeAnimatedModule } from 'react-native'
import { colors } from '../theme'
import { heading } from '../sensors'
import { CrossHair, Wrapper } from '../components'

export default class Compass extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            heading: new Animated.Value(0),
            value: 0
        }
        this.animating = false
    }

    componentWillMount(){
        this.onFocusListener = this.props.navigation.addListener('didFocus',  this.initializeSensors)
        this.onBlureListener = this.props.navigation.addListener('didBlur', heading.stop)
    }

    componentWillUnmount(){
        this.onFocusListener.remove()
        this.onBlureListener.remove()
        heading.stop()
    }

    initializeSensors = async _=> {
        let compasAvailable = await heading.init()
        if(compasAvailable) heading.subscribe(this.handleHeadingUpdate)
    }

    handleHeadingUpdate = heading => {
        if(this.animating) return
        this.animating = true
        this.setState({value: heading})
        Animated.timing(
            this.state.heading,
            {
                toValue: heading,
                duration: 50,
                useNativeDriver: true
            }
        ).start(_=> this.animating = false)
    }

    render(){
        return (
            <Wrapper>
                <View style={styles.container}>
                    <CrossHair heading={this.state.heading}/>
                    <Text style={styles.text}>{this.state.value}</Text>
                </View>
            </Wrapper>
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