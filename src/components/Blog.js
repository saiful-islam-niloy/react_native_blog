import React, { Component } from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import { View, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class Blog extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            view: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('blogList').then(myData => this.setState({ data: JSON.parse(myData).post }))
    }

    renderBlog = ({ item }) => (
        <Card>
            <Card.Title style={{ alignSelf: "flex-start", fontSize: 25 }}>
                <FontAwesomeIcon icon={faUser} size={20} color={"blue"} />
                {item.authorName}
            </Card.Title>
            <Text>October 29, 2020</Text>
            <Card.Divider />
            <Text>{item.blogData}</Text>
            <Card.Divider />
            <Button title={"Like"} type="outline" />
            <Button title="Comment" type="outline" />
        </Card>
    );

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderBlog}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        )
    }
}
