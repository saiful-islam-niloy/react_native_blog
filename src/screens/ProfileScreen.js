import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../providers/AuthProvider';


const ProfileScreen = () => {
    return (
       <AuthContext.Consumer>
           {
               (auth)=>(
                   <SafeAreaView>
                       <Header
                           leftComponent={{ icon: "menu", color: "#fff", onPress: function () { props.navigation.toggleDrawer() } }}
                           centerComponent={{text: "My Blog App"}}
                           rightComponent={{ icon: "lock-outline", color: "#fff", onPress: function () { auth.setIsLoggedIn(false); auth.setCurrentUser({}); } }}
                       />
                       <View style={{ alignSelf: "center", margin: 20, borderColor: "red" }}>
                           <Image source={{ height: 200, width: 200, uri: "https://avatars3.githubusercontent.com/u/52848678?s=460&u=c2a7d88fe4a0cef108cf41c8b3b577b5062c8469&v=4" }} />
                       </View>
                       <Text style={{alignSelf:"center", fontSize:25}}>
                           {auth.currentUser.name}
                       </Text>
                       <Text style={{alignSelf:"center", fontSize:15}}>
                           {auth.currentUser.email}
                       </Text>
                       <Text style={{alignSelf:"center", fontSize:15}}>
                           {auth.currentUser.sid}
                       </Text>
                   </SafeAreaView>
               )
           }
       </AuthContext.Consumer>
    );
}

export default ProfileScreen;