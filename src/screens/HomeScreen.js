import React from "react";
import { View } from "react-native";
import { Header } from 'react-native-elements';
import { AuthContext } from '../providers/AuthProvider';
import Blog from '../components/Blog';
import Post from '../components/Post';
import { getBlogJson, clearEverything } from '../functions/BlogFunction';
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (<View>
                <Header
                    leftComponent={{ icon: "menu", color: "#fff", onPress: function () { props.navigation.toggleDrawer() } }}
                    centerComponent={{ text: "My Blog App", onPress: function () { clearEverything(); } }}
                    rightComponent={{ icon: "lock-outline", color: "#fff", onPress: function () { auth.setIsLoggedIn(false); auth.setCurrentUser({}); } }}
                />

                <Post />
                <Blog />
            </View>)}
        </AuthContext.Consumer>
    );
}

export default HomeScreen;