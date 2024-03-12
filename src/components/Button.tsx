import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from "../components/GlobalText"
import color from '../configurations/config/color.config'

interface button {
    title?: string
    MV?: number
    onPressFunc?: () => void
}

const Button = ({ title, MV, onPressFunc }: button) => {
    return (
        <TouchableOpacity onPress={onPressFunc} style={[styles.button, { marginVertical: MV }]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: color.SECONDARY_COLOR,
        borderRadius: 8,
        height: 50,
        justifyContent: 'center'
    },
    buttonText: {
        color: color.PRIMARY_COLOR,
        textAlign: 'center',
        fontWeight: "400",
        fontSize: 18,
    },
})