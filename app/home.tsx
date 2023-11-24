import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/core";
import {AppDataType, Timepoint} from "../constants/Types";
import {Colors} from "../constants/Colors";
import Flex from "../components/flex/Flex";
import {Dimensions, Image, StatusBar, View} from "react-native";
import Font from "../components/text/Font";
import HomeFooterTabs from "../components/home-footer/block"
import CreateButton from "../components/home-header/CreateButton";
import Content from "../components/flex/Content";
import {useLayout} from "../hooks/useLayout";
import Title from "../components/text/Title";


const Home = () => {

    const navigation = useNavigation()
    const screenHeight = Dimensions.get("window").height
    const dimensions = useLayout()
    const [tabsHeight, setTabsHeight] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [mode, setMode] = useState<AppDataType>('days')

    const statusBarHeight = StatusBar.currentHeight

    useEffect(() => {
        setTimeout(() => setMode('timepoints'), 150)
    }, [])

    //HOME_HEADER
    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({
            header: () => (
                <View onLayout={e => setHeaderHeight(dimensions(e).height)}>
                    <Flex
                        justify={"space-between"}
                        align={"center"}
                        padding={"md"}
                        style={{
                            marginTop: statusBarHeight,
                            backgroundColor: Colors.white
                        }}
                    >
                        <Flex padding={0}>
                            <Image source={require('../assets/images/logo.png')} />
                            <Font size={24} weight={"500"} >TimeTable</Font>
                        </Flex>
                        <CreateButton mode={mode}/>
                    </Flex>
                </View>
            ),
        })
    }, [mode])
    //////

    const [val, setVal] = useState<Timepoint>({
        dayId: 'day_1',
        todos: [
            {id: 'todo_1', checked: false, title: 'todo_1'},
            {id: 'todo_2', checked: true, title: 'todo_2'},
            {id: 'todo_3', checked: false, title: 'todo_3'},
        ],
        timeInterval: [['12', '15'], ['22', '30']]
    })

    return (
        <>
            <Content scrollable height={screenHeight - (tabsHeight + headerHeight) + (statusBarHeight? statusBarHeight : 0)}>
                <Title>Home</Title>
            </Content>
            <View onLayout={e => setTabsHeight(dimensions(e).height)}>
                <HomeFooterTabs mode={mode} setMode={setMode}/>
            </View>
        </>
    );
};

export default Home;