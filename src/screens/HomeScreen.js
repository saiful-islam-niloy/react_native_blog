import React from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';
import { AuthContext } from '../providers/AuthProvider';

const HomeScreen = () => {
    return (
        <AuthContext.Consumer>
            {(auth)=>(<View>
                <Text>Welcome {auth.currentUser.name}</Text>
                <Button
                    type="outline"
                    title="Log Out"
                    onPress={function () {
                         auth.setIsLoggedIn(false)
                         auth.setCurrentUser({}) }} />
            </View>)}
        </AuthContext.Consumer>
    );
}

export default HomeScreen;