import React, { Component } from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import { View, ScrollView, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { color } from 'react-native-reanimated';
import { storeLike } from '../functions/BlogFunction';

export default class Blog extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            view: ""
        }
    }

    async componentDidMount() {
        let blogList = await AsyncStorage.getItem('blogList')
        if (blogList !== null)
            this.setState({ data: JSON.parse(blogList).post })
    }

    renderBlog = (item) => (
        <Card>
            <Text style={{ alignSelf: "flex-start", fontSize: 25 }}>
                <FontAwesomeIcon icon={faUser} size={20} color={"blue"} />
                {item.authorName}
            </Text>
            <Text style={{ fontStyle: "italic", color: "gray" }}>{item.authorId}</Text>
            <Text style={{ fontStyle: "italic", color: "gray" }}>{item.date}</Text>
            <Card.Divider />
            <Text>{item.blogData}</Text>
            <Card.Divider />
            <Button title={"Like"} type="outline" onPress={() => storeLike()} />
            <Button title="Comment" type="outline"
                onPress={
                    () => {
                        this.props.navigation.navigate("Comment", { blogId: item.blogId })
                    }
                } />
        </Card>
    );

    render() {
        let i = 0;
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    // renderItem={this.renderBlog}
                    renderItem={({item}) => {
                        return (
                            <this.renderBlog
                                authorName={item.authorName}
                                authorId={item.authorId}
                                date={item.date}
                                blogData={item.blogData}
                                blogId={item.blogId}
                            />)
                    }}
                    keyExtractor={item => `${i++}`}
                />
            </View>
        )
    }
}
