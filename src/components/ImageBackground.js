import React, { PureComponent } from 'react'
import { Image, StyleSheet } from 'react-native'

export default class ImageBackground extends PureComponent {
    render(){
        return <Image {...this.props} style={styles.image}/>
    }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
})