import React from "react";
import { View, Text } from "react-native";
import { Button, Header} from 'react-native-elements';
import { AuthContext } from '../providers/AuthProvider';
import Blog from '../components/Blog';
import Post from '../components/Post';

const HomeScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (<View>
                <Header
                    leftComponent={{ icon: "menu", color: "#fff", onPress: function () { props.navigation.toggleDrawer() } }}
                    centerComponent={{text: "My Blog App"}}
                    rightComponent={{ icon: "lock-outline", color: "#fff", onPress: function () { auth.setIsLoggedIn(false); auth.setCurrentUser({}); } }}
                />

                <Post/>

                <Blog />


                {/* <Text>
                    Welcome {auth.currentUser.name} </Text>
                <Button
                    type="outline"
                    title="Log Out"
                    onPress={function () {
                        auth.setIsLoggedIn(false)
                        auth.setCurrentUser({})
                    }} /> */}
            </View>)}
        </AuthContext.Consumer>
    );
}

export default HomeScreen;