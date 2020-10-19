import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';


const ProfileScreen = () => {
    return (
        <SafeAreaView>
             <Header
                    leftComponent={{ icon: "menu", color: "#fff", onPress: function () { props.navigation.toggleDrawer() } }}
                    centerComponent={{text: "My Blog App"}}
                    rightComponent={{ icon: "lock-outline", color: "#fff", onPress: function () { auth.setIsLoggedIn(false); auth.setCurrentUser({}); } }}
                />
            <View style={{ alignSelf: "center", margin: 20, borderColor: "red" }}>
                <Image source={{ height: 200, width: 200, uri: "https://avatars3.githubusercontent.com/u/52848678?s=460&u=c2a7d88fe4a0cef108cf41c8b3b577b5062c8469&v=4" }} />
            </View>
            <Text>
                Born on Dhaka
            </Text>
            <Text>
                Address
            </Text>
            <Text>
                Work At
            </Text>
            <View style={{ width: 100, alignSelf: "center", margin: 10 }}>
                <Button title="Delete  " color="red" type="solid" icon={<FontAwesomeIcon icon={faBox} size={20} color={"white"} />} iconRight/>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;