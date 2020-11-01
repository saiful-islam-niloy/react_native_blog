import "react-native-gesture-handler";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import CommentScreen from './src/screens/CommentScreen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import {faHome} from "@fortawesome/free-solid-svg-icons";

import {AuthProvider, AuthContext} from './src/providers/AuthProvider';


const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: "Home Page"}}></HomeStack.Screen>
        </HomeStack.Navigator>
    );
}

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
            <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{title: "Sign In"}}/>
            <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{title: "Sign Up"}}/>
        </AuthStack.Navigator>
    );
}

const HomeTabScreen = () => {
    return (
        <HomeTab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <HomeTab.Screen name="Home" component={HomeScreen} options={{
                title: "Home Screen",
                tabBarIcon: ({focused}) =>
                    focused ? (<FontAwesomeIcon icon={faHome} size={25} color={"white"}/>)
                        : (<FontAwesomeIcon icon={faHome} size={20} color={"lightgray"}/>)
            }}/>
            <HomeTab.Screen name="Notification" component={NotificationScreen} options={{
                title: "Notification",
                tabBarIcon: ({focused}) =>
                    focused ? (<FontAwesomeIcon icon={faBell} size={25} color={"white"}/>)
                        : (<FontAwesomeIcon icon={faBell} size={20} color={"lightgray"}/>)
            }}/>
        </HomeTab.Navigator>
    );
}


const AppDrawerScreen = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeTabScreen} options={{title: "Home"}}/>
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{title: "Profile"}}/>
            <Drawer.Screen name="Comment" component={CommentScreen} options={{title: "Comments"}}/>
        </Drawer.Navigator>
    );
}

function App() {
    return (
        <AuthProvider>
            <AuthContext.Consumer>
                {(auth) => (<NavigationContainer>
                    {auth.isLoggedIn ? <AppDrawerScreen/> : <AuthStackScreen/>}
                </NavigationContainer>)}
            </AuthContext.Consumer>
        </AuthProvider>
    );
}

export default App;