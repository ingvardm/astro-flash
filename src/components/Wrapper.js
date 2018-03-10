import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

export default class Wrapper extends PureComponent {
    render(){
        return <View {...this.props} style={styles.wrapper}/>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})