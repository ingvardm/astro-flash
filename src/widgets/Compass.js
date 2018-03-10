import React, { PureComponent } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class Compass extends PureComponent {
    render(){
        return <Text style={styles.text}>{this.props.heading}</Text>
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#ff0000',
        backgroundColor: 'black',
        padding: 20,
        fontFamily: 'Roboto',
        fontSize: 80
    }
})