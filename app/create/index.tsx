import React, {ComponentProps, useState} from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {StyleSheet, View} from "react-native";
import CreateDay from "./CreateDay";
import CreateTimepoint from "./CreateTimepoint";
import {Colors} from "../../constants/Colors";
import {Space} from "../../constants/Spaces";
import {Styles} from "../../constants/Styles";
import AppInput from "../../components/UI/AppInput";
import AppButton from "../../components/UI/AppButton";
import Flex from "../../components/flex/Flex";

const Tab = createMaterialTopTabNavigator()
const CreateScreen = (props: ComponentProps<any>) => {

    const styles = StyleSheet.create({
        doneBtn: {
            position: "absolute",
            bottom: 20,
            left: 12,
            right: 12,

            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        tabBarIndicatorStyle: {
            backgroundColor: Colors.primary,
            height: 5,
            borderRadius: 999,
        },
        tabBarStyle: {
            marginHorizontal: '3%',
            marginVertical: Space.md,
            borderRadius: 999,
            overflow: 'hidden',
            width: '94%',
            maxWidth: 700,
            alignSelf: "center",
            ...Styles.boxShadow
        }
    })

    return (
        <>
            <Tab.Navigator
                initialRouteName={props.route.params.mode==="days"? "День" : "Таймпоинт"}
                style={{
                    backgroundColor: Colors.white,
                }}
                screenOptions={{
                    tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
                    tabBarStyle: styles.tabBarStyle,
                }}
            >
                <Tab.Screen name={"День"} component={CreateDay}/>
                <Tab.Screen name={"Таймпоинт"} component={CreateTimepoint}/>
            </Tab.Navigator>
            <Flex justify={"center"} padding={"lg"} style={{
                backgroundColor: Colors.white
            }}>
                <AppButton icon={"check"} big onPress={() => {}} round/>
            </Flex>
        </>

    );
};

export default CreateScreen;