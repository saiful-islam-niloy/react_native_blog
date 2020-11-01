import React from "react";
import {View, Text, SafeAreaView} from "react-native";
import {Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";
import Notification from "../components/Notification";

const NotificationScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {
                (auth) =>
                    (
                        <View>
                            <Header
                                leftComponent={{
                                    icon: "menu", color: "#fff", onPress: function () {
                                        props.navigation.toggleDrawer()
                                    }
                                }}
                                centerComponent={{text: "My Blog App"}}
                                rightComponent={{
                                    icon: "lock-outline", color: "#fff", onPress: function () {
                                        auth.setIsLoggedIn(false);
                                        auth.setCurrentUser({});
                                    }
                                }}
                            />
                            <Notification currentUserName={auth.currentUser.name}/>
                        </View>
                    )
            }
        </AuthContext.Consumer>
    );
}

export default NotificationScreen;