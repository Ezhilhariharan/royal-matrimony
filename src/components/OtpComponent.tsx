import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Text from './GlobalText'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Dispatch, SetStateAction } from 'react';
import color from '../configurations/config/color.config'
import { useFocusEffect } from '@react-navigation/native'

interface OTP {
    code?: any;
    count?: any;
    settingCount: Dispatch<SetStateAction<any>>;
    settingCode: Dispatch<SetStateAction<any>>;
    reSend: () => void
}

const OtpComponent = ({ code, count, settingCount, settingCode, reSend }: OTP) => {
    const totalCount: number = 120

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            settingCount(count - 1);
        }, 1000);

        count == 0 && clearTimeout(timeoutId);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [count]);

    return (
        <>
            <View style={styles.row}>
                <OTPInputView
                    style={{ width: '100%', height: 100 }}
                    pinCount={6}
                    code={code}
                    onCodeChanged={code => { settingCode(code) }}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                // onCodeFilled={(code) => {}}
                />
            </View>
            <View style={styles.Contentrow}>
                {count === 0 ?
                    <TouchableOpacity onPress={reSend}>
                        <Text style={styles.primaryColor}>Resend</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.bold}>Resend </Text>
                }
                <Text style={styles.bold}>code in</Text>
                <Text style={styles.primaryColor}>{count}</Text>
                <Text style={styles.bold}>s</Text>
            </View>
        </>
    )
}

export default OtpComponent

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        width: "100%",
        flexDirection: 'row',
    },
    underlineStyleBase: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 12,
        height: 60,
        color: color.P_TEXT,
        backgroundColor: '#FAFAFA'
    },
    underlineStyleHighLighted: {
        borderWidth: 1,
        borderColor: color.SECONDARY_COLOR,
        borderRadius: 12,
        height: 60,
        color: color.SECONDARY_COLOR,
        backgroundColor: 'rgba(255, 77, 103, 0.08)',
    },
    bold: {
        fontSize: 15,
        fontWeight: '500',
        color: color.P_TEXT,
    },
    primaryColor: {
        fontSize: 15,
        fontWeight: '500',
        color: color.SECONDARY_COLOR,
        marginHorizontal: 4
    },
    Contentrow: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 10,
    }
})