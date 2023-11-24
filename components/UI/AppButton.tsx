import React from 'react';
import {AppIconsType, ColorsType} from "../../constants/Types";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Colors} from "../../constants/Colors";
import Flex from "../flex/Flex";
import {Pressable} from "react-native";
import Font from "../text/Font";
import AppIcon from "./AppIcon";
import {Styles} from "../../constants/Styles";

export interface AppButtonProps {
    color?: ColorsType
    icon?: AppIconsType
    label?:string
    big?:boolean
    round?: boolean
    fullWidth?: boolean
    width?: number,
    flat?: boolean,
    onPress?: () => void
}

const AppButton = (props: AppButtonProps) => {

    const defaultColor = props.color? props.color : "primary"

    const scaleProgress = useSharedValue(1)
    const pressDuration = 50

    const onPressStart = () => {
        scaleProgress.value = withTiming(.85, {
            duration: pressDuration
        })
    }

    const onPressEnd = () => {
        props.onPress && props.onPress()
        setTimeout(() => {
            scaleProgress.value = withSpring(1, {
                stiffness: 500,
            })
        }, pressDuration)
    }

    const aPress = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleProgress.value
                }
            ]
        }
    })

    const contentColor = props.flat? defaultColor : 'white'

    return (
        <Flex padding={0} width={props.fullWidth? '100%' : "auto"}>
            <Pressable onPressIn={onPressStart} onPressOut={onPressEnd} style={props.fullWidth&& {
                width: '100%'
            }}>
                <Animated.View style={[
                    aPress,
                    props.round? Styles.round : Styles.rounded, {
                        width: '100%',
                        backgroundColor: props.flat? 'transparent' : Colors[defaultColor],
                    }
                ]}>
                    <Flex justify={"center"} align={"center"} width={'100%'} style={{
                        width: props.width
                    }}>
                        {props.label&&
                            <Font
                                color={contentColor}
                                size={props.big? 44 : 18}
                                weight={"500"}
                            >{props.label }</Font>}

                        {props.icon&&
                            <AppIcon
                                color={contentColor}
                                size={props.big? 50 : 26}
                                name={props.icon}
                            />}
                    </Flex>
                </Animated.View>
            </Pressable>
        </Flex>
    );
};

export default AppButton;