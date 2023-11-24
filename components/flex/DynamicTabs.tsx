import React, {ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import Content from "./Content";
import {Colors} from "../../constants/Colors";
import {Styles} from "../../constants/Styles";
import AppButton from "../UI/AppButton";
import Flex from "./Flex";
import Title from "../text/Title";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {Dimensions, Platform, ScrollView, TouchableOpacity, View} from "react-native";
import FlatCard from "./FlatCard";
import {HandlerStateChangeEvent, PanGestureHandler} from "react-native-gesture-handler";
import {Space} from "../../constants/Spaces";

type AppTab = {
    title: string
    component: ReactNode
    onDone?: (props?: any ) => void
    onAppear?: (props?: any ) => void
}

const DynamicTabs = ({ items, swipeEnabled=true, form=false, activeTab, setActiveTab, onSave }: {
    activeTab: string
    setActiveTab:(screen:string)=>void
    items: AppTab[]
    swipeEnabled?: boolean
    form?: boolean
    onSave?: () => void
}) => {

    const [parentWidth, setParentWidth] = useState(0)

    const validIndex = useMemo(() => {
        const index = items.findIndex(item => item.title === activeTab)
        return index===-1? 0 : index
    }, [activeTab])


    const scrollViewRef = useRef<ScrollView>(null)
    const [activeIndex, setActiveIndex] = useState<number>(validIndex)

    const tabHeights = useRef<number[]>([])
    const currentDimensions = useSharedValue(0)
    const animatedTabHeight = useAnimatedStyle(() => {
        return {
            height: currentDimensions.value
        }
    })
    const transformTabHeight = (to:number) => {
        currentDimensions.value = withTiming(to + Space.sm)
    }

    const flyTo = (index: number) => {
        scrollViewRef.current?.scrollTo({
            x: index * parentWidth,
            animated: true
        })
    }

    const setTab = (difference:number) => {
        setActiveTab(items[activeIndex+difference].title)
    }

    const next = () => setTab(1)

    const previous = () => setTab(-1)

    const onSwipe = (e:  HandlerStateChangeEvent) =>  {
        const x = Number(e.nativeEvent.translationX)
        const divider = 100
        if (activeIndex < items.length && x < -divider) next()
        else if (activeIndex>0 && x > divider) previous()
    }

    useEffect(() => {
        const newIndex = items.findIndex(item => item.title === activeTab)
        const appearAction = items[activeIndex].onAppear
        const doneAction = items[activeIndex].onDone
        newIndex > activeIndex && doneAction&& doneAction()
        newIndex!==-1&& transformTabHeight(tabHeights.current[newIndex])
        appearAction&& appearAction()
        flyTo(newIndex)
        setActiveIndex(newIndex)
    }, [activeTab])


    return (
        <View style={{ width: "100%" }} onLayout={e => {
            if (Platform.OS !== "web") e.persist()
            setParentWidth(e.nativeEvent.layout.width)
        }}>
            <Flex column padding={0} gap={0}>
                <Content>
                    <Title>{ activeTab }</Title>
                </Content>
                <Animated.View style={animatedTabHeight}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {items.map((tab, index) => (
                            <Flex column key={tab.title} width={parentWidth}  padding={0}>
                                {tab.component&&
                                    <Content>
                                        <PanGestureHandler
                                            enabled={!form&&swipeEnabled}
                                            onEnded={(e) => onSwipe(e)}
                                            cancelsTouchesInView={false}
                                        >
                                            <Animated.View
                                                onLayout={e => {
                                                    if (Platform.OS !== "web") e.persist()
                                                    const height = e.nativeEvent.layout.height
                                                    tabHeights.current[index] = height
                                                    index===activeIndex&& transformTabHeight(height)
                                                }}
                                            >
                                                <FlatCard>
                                                    { tab.component }
                                                </FlatCard>
                                            </Animated.View>
                                        </PanGestureHandler>
                                    </Content>
                                }
                            </Flex>
                        ))}
                    </ScrollView>
                </Animated.View >
                <Flex width={"100%"} padding={"md"} style={{ paddingTop: Space.lg }} gap={"md"} justify={"center"}>
                    {!form&& items.map((navPoint, index) => (
                        <TouchableOpacity key={navPoint.title} onPress={() => {
                            setActiveTab(navPoint.title)
                        }} style={{
                            padding: Space.xs
                        }}>
                            <View style={{
                                width: 12,
                                height: 12,
                                backgroundColor: index === activeIndex? Colors.primary : Colors.darkGrey,
                                ...Styles.round
                            }}/>
                        </TouchableOpacity>
                    ))}
                    {form&& (
                        <>
                            {activeIndex>0&& <AppButton onPress={previous} icon={"arrow-left"} flat/>}
                            {activeIndex<items.length-1&& <AppButton onPress={next} icon={"arrow-right"} flat/>}
                            {activeIndex===items.length-1&& <AppButton onPress={() => onSave&& onSave()} icon={"check-circle"}/>}
                        </>
                    )}
                </Flex>
            </Flex>
        </View>
    );
};

export default DynamicTabs;