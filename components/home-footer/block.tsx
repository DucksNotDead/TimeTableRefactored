import React from 'react';
import {Text, View} from "react-native";
import {AppDataType} from "../../constants/Types";
import Flex from "../flex/Flex";
import TabButton from "./button";
import {Colors} from "../../constants/Colors";

const Block = (props: {
    mode: AppDataType
    setMode: (mode:AppDataType) => void
}) => {
    return (
        <Flex justify={"space-between"} align={"center"} padding={"md"} style={{
            backgroundColor: Colors.white,
        }}>
            <TabButton
                icon={"calendar"}
                color={"days"}
                isActive={props.mode==="days"}
                onPress={() => props.setMode("days")}
            />
            <TabButton
                icon={"list"}
                color={"timepoints"}
                isActive={props.mode==="timepoints"}
                onPress={() => props.setMode("timepoints")}
            />
        </Flex>
    );
};

export default Block;