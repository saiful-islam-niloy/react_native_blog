import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Header, Card, Button} from 'react-native-elements';
import {getJson, storeLike} from "../functions/BlogFunction";
import PostComment from "../components/PostComment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

class CommentScreen extends Component {
    constructor() {
        super();
        this.state = {
            authorName: "",
            data: "",
            date: "",
            blogId: "",
            commentData: [],
        }
    }

    async componentDidMount() {
        this.setState({
            authorName: this.props.route.params.authorName,
            data: this.props.route.params.data,
            date: this.props.route.params.date,
            blogId: this.props.route.params.blogId,
        })


        let raw_data = await getJson("blogList");
        let data = JSON.parse(raw_data);
        let keys = []
        let commentArr = []
        let comments;
        if (data[this.state.blogId]["comment"] != undefined) {
            comments = data[this.state.blogId]["comment"]
            console.log("Comments: ", comments)
            for (let key in comments) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                commentArr.push(
                    comments[keys[i]]
                )
            }
            console.log("Comment Arr: "+JSON.stringify(commentArr))
            this.setState({commentData:commentArr})
        }
    }

    renderComment = (item) => (
        <Card>
            <Text style={{alignSelf: "flex-start", fontSize: 25}}>
                <FontAwesomeIcon icon={faUser} size={20} color={"blue"}/>
                {item.commenter}
            </Text>
            <Card.Divider/>
            <Text style={{fontStyle: "italic", color: "gray"}}>{item.comment}</Text>
        </Card>
    );

    render() {
        let i = 0;
        return (
            <View>
                <Header
                    centerComponent={{text: "Comments"}}
                />
                <ScrollView>
                    <Card>
                        <Card.Title>
                            {this.state.authorName}
                        </Card.Title>
                        <Text style={{fontSize: 10, alignSelf: "center"}}>
                            {this.state.date}
                        </Text>
                        <Card.Divider/>
                        <Text style={{fontSize: 10, alignSelf: "center"}}>
                            {this.state.data}
                        </Text>
                    </Card>
                    <PostComment blogId={this.state.blogId} authorName={this.state.authorName}
                                 currentUserName={this.props.route.params.currentUserName}/>

                </ScrollView>
                <FlatList
                    data={this.state.commentData}
                    renderItem={({item}) => {
                        return (
                            <this.renderComment
                                commenter={item.commenter}
                                comment={item.comment}
                            />)
                    }}
                    keyExtractor={item => `${i++}`}
                />
            </View>
        );
    }
}

export default CommentScreen;