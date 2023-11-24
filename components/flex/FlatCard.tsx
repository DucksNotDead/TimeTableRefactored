import React from 'react';
import {StyleSheet} from "react-native";
import {Colors} from "../../constants/Colors";
import {Styles} from "../../constants/Styles";
import Flex from "./Flex";
import {FlexType} from "../../constants/Types";
import Title from "../text/Title";
import title from "../text/Title";
import {Space} from "../../constants/Spaces";
import SubTitle from "../text/SubTitle";

const FlatCard = (props:FlexType & {
    title?: string
}) => {

    const styles = StyleSheet.create({
        main: {
            backgroundColor: Colors.white,
            ...Styles.rounded,
            ...props.style
        },
    })

    return (
        <Flex style={styles.main} gap={"md"} column align={props.align} width={props.width} margin={props.margin}>
            {props.title&& <SubTitle>{props.title}</SubTitle>}
            <Flex column padding={0} width={"100%"}>
                { props.children }
            </Flex>
        </Flex>
    );
};

export default FlatCard;