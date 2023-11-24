import React, {ReactNode, useEffect, useState} from 'react';
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated'
import {Dimensions, Platform, Pressable, StyleSheet, View} from "react-native";
import Flex from "../flex/Flex";
import Title from "../text/Title";
import {Space} from "../../constants/Spaces";
import {Colors} from "../../constants/Colors";
import {Styles} from "../../constants/Styles";
import {useModal} from "../../context/ModalContext";


const ModalView = (props: {
    id: string
    title?: string,
    animationDuration: number,
    close: (id: string) => void
    content: ReactNode,
    index: number,
}) => {

    const modalApi = useModal()

    useEffect(() => {
        open()
    }, [])

    useEffect(() => {
        console.log('update', props.index)
    }, [modalApi.views[props.index]])

    const animationDuration = props.animationDuration

    //DATA
    const screenHeight = Dimensions.get("window").height
    const [contentHeight, setContentHeight] = useState<number>(0)
    const translation = useSharedValue<number>(screenHeight)
    const padding = 100

    const open = () => {
        translation.value = withSpring(padding, {mass: .55})
    }
    const close = () => {
        translation.value = withTiming(screenHeight + contentHeight, {duration: animationDuration})
    }

    const gestureHandler = useAnimatedGestureHandler({
        onActive: (e) => {
            const y = e.translationY
            translation.value = (y > 0? y : y * .05) + padding
        },
        onEnd: (e) => {
            const y = e.translationY
            const safeZone = y > (contentHeight-padding) * (1/3)
            if (safeZone) runOnJS(close)()
            else runOnJS(open)()
        }
    })

    const aCard = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translation.value
                }
            ]
        }
    })

    const styles = StyleSheet.create({
        main: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: screenHeight+padding,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        card: {
            backgroundColor: Colors.white,
            borderTopLeftRadius: Space.lg,
            borderTopRightRadius: Space.lg,
            ...Styles.boxShadow,
            ...Styles.contentBox
        },
        lineBox: {
            height: 60,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center"
        },
        line: {
            backgroundColor: Colors.darkGrey,
            height: 8,
            width: 150,
            borderRadius: Space.lg,
        }
    })

    return (
        <Pressable onPress={close}>
            <Animated.View style={[aCard, styles.main]}>
                <View style={{ width: "100%", alignItems: "center" }} onLayout={e => {
                    if (Platform.OS !== "web") e.persist()
                    setContentHeight(e.nativeEvent.layout.height)
                }}>
                    <Flex padding={0} column align={"center"} style={styles.card}>
                        <Pressable onPress={e => e.preventDefault()} style={{ width: "100%" }}>
                            <PanGestureHandler onGestureEvent={gestureHandler}>
                                <Animated.View style={styles.lineBox}>
                                    <View style={styles.line}/>
                                </Animated.View>
                            </PanGestureHandler>
                            <Flex column align={"center"} padding={0} style={{ width: '100%', paddingBottom: padding + Space.xl }}>
                                {props.title && <Title>{ props.title }</Title>}
                                { props.content }
                            </Flex>
                        </Pressable>
                    </Flex>
                </View>
            </Animated.View>
        </Pressable>
    );
};

export default ModalView;