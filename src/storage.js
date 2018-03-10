import { AsyncStorage } from 'react-native'

const storageName = '@userSettings:'

function getStorageName(key){
    return storageName + key
}

export function save(key, val){
    return AsyncStorage.setItem(getStorageName(key), String(val))
}

export function load(key){
    return AsyncStorage.getItem(getStorageName(key))
}