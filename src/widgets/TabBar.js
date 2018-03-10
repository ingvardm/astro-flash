import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Compass, Level } from './'
import { colors } from '../theme'

export default TabNavigator(
{
    Compass: { screen: Compass },
    Level: { screen: Level },
},
{
    initialRouteName: 'Compass',
    tabBarOptions: {
        activeTintColor: colors.black,
        activeBackgroundColor: colors.red,
        inactiveTintColor: colors.red,
        inactiveBackgroundColor: colors.black,
        style:{
            height:40,
            borderTopWidth: 0,
            opacity: 0.75,
            backgroundColor: colors.black
        },
        tabStyle:{
            height:40,
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        labelStyle:{
            lineHeight: 40,
            fontFamily: 'Roboto',
            fontSize: 16
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
})