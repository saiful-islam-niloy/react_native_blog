import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
    return (
        <View>
            <Card>
                <Card.Title style={{alignSelf:"flex-start", fontSize:25}}><FontAwesomeIcon icon={faUser} size={20} color={"blue"} /> Author name</Card.Title>
                <Text>October 29, 2020</Text>
                <Card.Divider />
                <Text>This section is for the bolg</Text>
                <Card.Divider />
                <Button title={"Like"} type="outline"/>
                <Button title="Comment" type="outline" />
            </Card>
        </View>
    );
}

export default Blog;