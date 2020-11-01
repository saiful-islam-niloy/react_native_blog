import React, {Component} from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import {View, FlatList} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {storeLike} from '../functions/BlogFunction';
import {AuthContext} from "../providers/AuthProvider";
import {storeNotification} from "../functions/NotificationFunction";

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
        if (blogList !== null) {
            for (let key in JSON.parse(blogList))
                keys.push(key)

            let json = JSON.parse(blogList);
            for (let i = 0; i < keys.length; i++) {
                let blog = {
                    "authorName": json[keys[i]]["authorName"],
                    "authorId": json[keys[i]]["authorId"],
                    "date": json[keys[i]]["date"],
                    "blogData": json[keys[i]]["blogData"],
                    "blogId": json[keys[i]]["blogId"],
                    "like": json[keys[i]]["like"],
                }
                data.push(blog)
            }
            this.setState({data: data})
            console.log("state in blog showing: " + JSON.stringify(this.state.data))
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
            <View style={{flexDirection: "row"}}>
                <View style={{width: "50%"}}>
                    <Button title={"Like " + item.like} type="outline" onPress={() =>
                    {
                        storeLike(item.blogId)
                        storeNotification(
                            item.authorName,
                            {
                                "type":"like",
                                "author":item.currentUserName,
                            }
                        )
                    }
                    }/>
                </View>
                <View style={{width: "50%"}}>
                    <Button title="Comment" type="outline"
                            onPress={
                                () => {
                                    this.props.navigation.navigate("Comment",
                                        {
                                            blogId: item.blogId,
                                            authorName: item.authorName,
                                            date: item.date,
                                            data: item.blogData,
                                            currentUserName: item.currentUserName,
                                        })
                                    console.log("current user name" + item.currentUserName)
                                }
                            }/>
                </View>
            </View>
        </Card>
    );

    render() {
        let i = 0;
        return (
            <AuthContext.Consumer>
                {
                    (auth) => (
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
                                            like={item.like}
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
