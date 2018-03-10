import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Level extends PureComponent {
    render(){
        return <View>
            <Text style={styles.text}>X = {this.props.x}</Text>
            <Text style={styles.text}>Y = {this.props.y}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#ff0000',
        backgroundColor: 'black',
        padding: 5,
        fontFamily: 'Roboto',
        fontSize: 10
    }
})