import React from 'react';
import {StyleSheet, Text} from 'react-native'
import {Colors} from "../../constants/Colors";
import {FontType} from "../../constants/Types";

const Font = (props: FontType) => {



    const styles = StyleSheet.create({
        main: {
            width: "auto",
            color: Colors[props.color? props.color : "black"],
            fontSize: props.size? props.size : 18,
            fontWeight: props.weight? props.weight : "400",
            textAlign: props.align? props.align : "left",
        }
    })

    return (
        <Text style={{...styles.main}}>{ props.children }</Text>
    );
};

export default Font;