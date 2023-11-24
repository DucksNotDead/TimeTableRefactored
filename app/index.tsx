import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Layout from './layout'
import {SafeAreaProvider} from "react-native-safe-area-context";
import {enableLegacyWebImplementation, GestureHandlerRootView} from "react-native-gesture-handler";
import AppContext from "../context/AppContext";

enableLegacyWebImplementation(true);

const App = () => {
    return (
        <AppContext>
            <SafeAreaProvider>
                <NavigationContainer >
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Layout />
                    </GestureHandlerRootView>
                </NavigationContainer>
            </SafeAreaProvider>
        </AppContext>
    );
};

export default App;