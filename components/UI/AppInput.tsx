import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import Flex from "../flex/Flex";
import {Button, StyleSheet, TextInput} from "react-native";
import AppButton from "./AppButton";
import {Styles} from "../../constants/Styles";
import {Colors} from "../../constants/Colors";
import {Space} from "../../constants/Spaces";

const AppInput = ({ value, setValue, placeholder, onSave }: {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    onSave?: () => {}
}) => {

    const inputRef = useRef<TextInput>(null)

    const styles = StyleSheet.create({
        main: {
            backgroundColor: Colors.white,
            ...Styles.rounded
        },
        input: {
            flex: 1,
            fontSize: 20,
            fontWeight: "500",
            padding: Space.md,
            borderRadius: 999,
            outlineWidth: 0,
        }
    })

    return (
        <Flex align={"center"} padding={0} width={'100%'}>
            <Flex style={styles.main} padding={"sm"} align={"center"} width={'100%'}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.darkGrey}
                    onChange={val => setValue(val.nativeEvent.text)}
                />
            </Flex>
        </Flex>
    );
};

export default AppInput;