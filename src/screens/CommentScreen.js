import React, {useState} from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Header, Button, Card } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import { getBlogJson } from '../functions/BlogFunction';




const getBlogInfo= async (id) =>{
    let i;
    try{
        let data = JSON.parse(await AsyncStorage.getItem("blogList"));
        console.log("data:"+data)
        for (i = 0; i < data.post.length; i++){
            if(data.post[i]["blogId"] == id){
                console.log(data.post[i])
                return data.post[i]
            }
        }
            
    }catch(error){
        alert(error)
    }
}

const CommentScreen = (props) =>{
    const blogId = props.route.params.blogId
    const data = getBlogInfo(blogId+"")
    console.log(data)
    const [name, setName] = useState("");
    setName(data.authorName)
    return(
        <View>
             <Header
                    leftComponent={{ icon: "menu", color: "#fff", onPress: function () { props.navigation.toggleDrawer() } }}
                    centerComponent={{ text: "Comments"}}
                    rightComponent={{ icon: "lock-outline", color: "#fff", onPress: function () { auth.setIsLoggedIn(false); auth.setCurrentUser({}); } }}
                />

           <ScrollView>
               <Card>
                   <Card.Title>
                        {name}
                   </Card.Title>
               </Card>
           </ScrollView>
        </View>
    )
}

export default CommentScreen;