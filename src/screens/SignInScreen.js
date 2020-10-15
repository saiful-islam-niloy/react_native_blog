import React from 'react';
import { View } from 'react-native';
import { Input, Button, Card, Text } from 'react-native-elements';
import { FontAwesome } from 'react-native-vector-icons';
import customStyle from '../asset/styles/AuthStyle';
import { AuthContext } from '../providers/AuthProvider'

const SignInScreen = (props) => {
    return (
        <AuthContext.Consumer>
            {(auth)=>(<View style={customStyle.viewStyle}>
                <Card>
                    <Card.Title>Welcome to My BLog App</Card.Title>
                    <Card.Divider />
                    <Input
                        placeholder="Email Address" />
                    <Input
                        placeholder="Password"
                        secureTextEntry={true} />
                    <Button
                        title="Sign In"
                        onPress={function () { auth.setIsLoggedIn(true)}} />
                    <Button
                        type="clear"
                        title="Don't have an account? Click here"
                        onPress={function () { props.navigation.navigate("SignUpScreen") }} />
                </Card>
            </View>)}
        </AuthContext.Consumer>
    );
}

export default SignInScreen;