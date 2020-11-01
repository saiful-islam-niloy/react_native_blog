import React, {Component} from 'react';
import {View} from "react-native";
import {Button, Card, Input} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {getJson, getTime, storeBlog, storeJson} from "../functions/BlogFunction";

class PostComment extends Component {
    constructor() {
        super();
        this.state={
            comment:"",
            data:{}
        }
    }
    async componentDidMount() {
        let raw_data = await getJson("blogList");
        let data = JSON.parse(raw_data);
        this.setState({data:data})
    }

    async postComment(){
        let data = this.state.data;
        console.log(data[this.props.blogId].comment)
        if(data[this.props.blogId].comment == undefined){
            data[this.props.blogId].comment = {
                [this.props.currentUserName]:{
                    "commenter":this.props.currentUserName,
                    "comment":this.state.comment
                }
            }
        }else {
            data[this.props.blogId].comment[this.props.currentUserName] = {
                "commenter":this.props.currentUserName,
                "comment":this.state.comment
            }
        }

        console.log(JSON.stringify(data))
        this.setState({data:data})
        await storeJson(data)
    }

    render() {
        return (
            <View>
                <Card>
                    <Input
                        multiline
                        style={{ fontSize: 15 }}
                        placeholder="Comment Section"
                        leftIcon={<FontAwesomeIcon icon={faComment} size={20} color={"blue"} />}
                        onChangeText={(data) => { this.setState({comment:data}) }} />
                    <Button
                        title="Post"
                        onPress= {() => {
                           this.postComment()
                        }} />
                </Card>
            </View>
        );
    }
}

export default PostComment;