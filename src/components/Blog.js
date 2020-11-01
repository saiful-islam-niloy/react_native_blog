import React, {Component} from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import {View, ScrollView, FlatList} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {storeLike} from '../functions/BlogFunction';
import {AuthContext} from "../providers/AuthProvider";

export default class Blog extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        let blogList = await AsyncStorage.getItem('blogList')
        let keys = [];
        let data = [];
        if (blogList !== null){
            for(let key in JSON.parse(blogList))
                keys.push(key)

            let json = JSON.parse(blogList);
            for(let i= 0; i<keys.length; i++){
                let blog = {
                    "authorName":json[keys[i]]["authorName"],
                    "authorId":json[keys[i]]["authorId"],
                    "date":json[keys[i]]["date"],
                    "blogData":json[keys[i]]["blogData"],
                    "blogId":json[keys[i]]["blogId"],
                }
                data.push(blog)
            }
            this.setState({data: data})
            console.log("state in blog showing: "+JSON.stringify(this.state.data))
        }
    }

    renderBlog = (item) => (
        <Card>
            <Text style={{alignSelf: "flex-start", fontSize: 25}}>
                <FontAwesomeIcon icon={faUser} size={20} color={"blue"}/>
                {item.authorName}
            </Text>
            <Text style={{fontStyle: "italic", color: "gray"}}>{item.authorId}</Text>
            <Text style={{fontStyle: "italic", color: "gray"}}>{item.date}</Text>
            <Card.Divider/>
            <Text>{item.blogData}</Text>
            <Card.Divider/>
            <Button title={"Like"} type="outline" onPress={() => storeLike()}/>
            <Button title="Comment" type="outline"
                    onPress={
                        () => {
                            this.props.navigation.navigate("Comment",
                                {
                                    blogId: item.blogId,
                                    authorName:item.authorName,
                                    date:item.date,
                                    data:item.blogData,
                                    currentUserName:item.currentUserName,
                                })
                            console.log("current user name"+item.currentUserName)
                        }
                    }/>
        </Card>
    );

    render() {
        let i = 0;
        return (
           <AuthContext.Consumer>
               {
                   (auth)=>(
                       <View>
                           <FlatList
                               data={this.state.data}
                               renderItem={({item}) => {
                                   return (
                                       <this.renderBlog
                                           authorName={item.authorName}
                                           authorId={item.authorId}
                                           date={item.date}
                                           blogData={item.blogData}
                                           blogId={item.blogId}
                                           currentUserName={auth.currentUser.name}
                                       />)
                               }}
                               keyExtractor={item => `${i++}`}
                           />
                       </View>
                   )
               }
           </AuthContext.Consumer>
        )
    }
}
