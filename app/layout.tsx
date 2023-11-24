import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from './home'
import CreateScreen from './create/index'
import {Colors} from "../constants/Colors";
import {Space} from "../constants/Spaces";
import {Image, StatusBar, View} from "react-native";
import Flex from "../components/flex/Flex";
import * as NavigationBar from 'expo-navigation-bar';
import ModalView from "../components/popups/ModalView";
import {hidden} from "colorette";
import Modals from "./modals";

const Layout = ({  }) => {

    const Stack = createStackNavigator()
    StatusBar.setBackgroundColor(Colors.white)
    NavigationBar.setBackgroundColorAsync(Colors.white).then()
    NavigationBar.setButtonStyleAsync("dark").then()

    return (
        <View style={{ overflow: "hidden", flex: 1, position: "relative" }}>

            <Stack.Navigator
                screenOptions={{
                    animationEnabled: true,
                    animationTypeForReplace: "pop",
                    headerStyle: {
                        borderBottomWidth: 0
                    },
                    cardStyle: {
                        backgroundColor: Colors.lightGrey
                    },
                }}
            >
                <Stack.Screen name={'home'} component={HomeScreen} options={{
                    title: 'Time Table'
                }}/>
                <Stack.Screen name={'create'}  component={CreateScreen} options={{
                    title: 'Создать'
                }}/>
            </Stack.Navigator>

            <Modals/>

        </View>
    );
};

export default Layout;