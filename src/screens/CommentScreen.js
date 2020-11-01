import React, {Component} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header, Button, Card } from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import { getJson} from "../functions/BlogFunction";
import PostComment from "../components/PostComment";

class CommentScreen extends Component {
    constructor() {
        super();
        this.state={
            authorName:"",
            data:"",
            date:"",
            blogId:"",
            commentData:[],
        }
    }
    async componentDidMount() {
        let raw_data = await getJson("blogList");
        let data = JSON.parse(raw_data);
        let keys = []
        let comments = []
        for (let key in data)
            keys.push(key)
        for (let i = 0; i<keys.length; i++){
            if(data[keys[i]]["comment"] != undefined){
                let comment = {
                    "comment":data[keys[i]]["comment"]
                }
                comments.push(comment)
            }
        }
        console.log("Comments: ", comments)
        this.setState({
            authorName:this.props.route.params.authorName,
            data:this.props.route.params.data,
            date:this.props.route.params.date,
            blogId:this.props.route.params.blogId,
        })
    }

    render() {
        return (
            <View>
                <Header
                    centerComponent={{text: "Comments"}}
                />
                <ScrollView >
                    <Card>
                        <Card.Title>
                            {this.state.authorName}
                        </Card.Title>
                        <Text style={{fontSize:10, alignSelf:"center"}}>
                            {this.state.date}
                        </Text>
                        <Card.Divider/>
                        <Text style={{fontSize:10, alignSelf:"center"}}>
                            {this.state.data}
                        </Text>
                    </Card>
                    <PostComment blogId={this.state.blogId} authorName={this.state.authorName} currentUserName={this.props.route.params.currentUserName}/>
                </ScrollView>
            </View>
        );
    }
}

export default CommentScreen;