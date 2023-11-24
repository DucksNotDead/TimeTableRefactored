import React, {ReactNode} from 'react';
import Flex from "./Flex";
import {ScrollView, StyleSheet} from "react-native";
import {Colors} from "../../constants/Colors";

const Content = ({ absolute=false, style, children, scrollable=false, height="auto" }: {
    absolute?: boolean,
    style?: StyleSheet|{},
    height?: number|"auto",
    scrollable?: boolean,
    children: ReactNode,
}) => {

    const styles = StyleSheet.create({
        abs: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    })
    return (
        <ScrollView scrollEnabled={scrollable} style={{ height }}>
            <Flex justify={"center"} padding={0} style={absolute? styles.abs : { height: "auto" }}>
                <Flex column padding={"sm"} style={{
                    width: '100%',
                    maxWidth: 700,
                    position: "relative",
                    ...style
                }}>
                    { children }
                </Flex>
            </Flex>
        </ScrollView>
    );
};

export default Content;