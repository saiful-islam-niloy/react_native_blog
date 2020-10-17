import React, {useState} from 'react';
import { View } from 'react-native';
import { Input, Button, Card, Text } from 'react-native-elements';
import customStyle from '../asset/styles/AuthStyle';
import { AuthContext } from '../providers/AuthProvider';
import {getDataJson} from "../functions/AsyncStorageFunction";

const SignInScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <AuthContext.Consumer>
            {(auth)=>(<View style={customStyle.viewStyle}>
                <Card>
                    <Card.Title>Welcome to My BLog App</Card.Title>
                    <Card.Divider />
                    <Input
                        placeholder="Email Address" 
                        onChangeText={function (currentInput) { setEmail(currentInput) }} />
                    <Input
                        placeholder="Password"
                        secureTextEntry={true} 
                        onChangeText={function (currentInput) { setPassword(currentInput) }} />
                    <Button
                        title="Sign In"
                        onPress={async function () { 
                            let userData = await getDataJson(email);
                            if(userData.password == password){
                                auth.setIsLoggedIn(true);
                                auth.setCurrentUser(userData);
                            }else{
                                alert("Login Failed!");
                            }
                        }} />
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