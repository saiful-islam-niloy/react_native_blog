import React from 'react';
import { View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import customStyle from '../asset/styles/AuthStyle';


const SignUpScreen = (props) => {
    return (
        <View style={customStyle.viewStyle}>
            <Card>
                <Card.Title>Welcome to My BLog App</Card.Title>
                <Card.Divider />
                <Input
                    placeholder="Name" />
                <Input
                    placeholder="Student ID" />
                <Input
                    placeholder="Email Address" />
                <Input
                    placeholder="Password"
                    secureTextEntry={true} />
                <Button title="Sign Up" />
                <Button
                    type="clear"
                    title="Already have an account? Click here"
                    onPress={function () { props.navigation.navigate("SignInScreen") }} />


            </Card>
        </View>
    );
}


export default SignUpScreen;