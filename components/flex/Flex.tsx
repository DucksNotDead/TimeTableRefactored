import React from 'react';
import {StyleSheet, View} from "react-native";
import {Space} from "../../constants/Spaces";
import {FlexType} from "../../constants/Types";
import {Colors} from "../../constants/Colors";

const Flex = (
    {
        column=false,
        justify = 'flex-start',
        align = 'stretch',
        gap='sm',
        padding='sm',
        margin,
        width="auto",
        style,
        backgroundColor="transparent",
        absolute=false,
        children
    }: FlexType
) => {

    const styles = StyleSheet.create({
        main: {
            display: "flex",
            backgroundColor: Colors[backgroundColor],
            width: width,
            flexDirection: column? "column" : "row",
            justifyContent: justify,
            alignItems: align,
            gap: Space[gap],
            padding: Space[padding],
            margin: margin? Space[margin] : 0,
        },
        absolute: {
            position: "absolute",
            left: 0,
            right: 0,
            top: absolute==="top"||absolute==="full"? 0 : "auto",
            bottom: absolute==="bottom"||absolute==="full"? 0 : "auto",
            width: "100%"
        }
    })

    return (
        <View style={[styles.main, absolute&& styles.absolute, style]}>
            { children }
        </View>
    );
};

export default Flex;