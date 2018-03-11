import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { Compass, Level } from './'
import { colors } from '../theme'
import Icon from 'react-native-vector-icons/Feather'

export default TabNavigator(
{
    Compass: { 
        screen: Compass,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="compass" size={45} style={{color:tintColor}}/>,
        }
    },
    Level: {
        screen: Level,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name="anchor" size={45} style={{color:tintColor}} />,
        }
    },
},
{
    initialRouteName: 'Compass',
    tabBarOptions: {
        activeTintColor: colors.red,
        activeBackgroundColor: colors.black,
        inactiveTintColor: colors.red_50_opacity,
        inactiveBackgroundColor: colors.black,
        showIcon: true,
        showLabel: false,
        style:{
            height:70,
            borderTopWidth: 0,
            opacity: 0.75,
            backgroundColor: colors.black
        },
        tabStyle:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
})