import React from 'react';
import { View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Post = () => {
    return (
        <View>
            <Card>
                <Input multiline style={{ fontSize: 15 }} placeholder="What's on your mind?" leftIcon={<FontAwesomeIcon icon={faEdit} size={20} color={"blue"} />} />
                <Button title="Post" onPress={()=>{alert("Posted Successfully.")}}/>
            </Card>
        </View>
    );
}

export default Post;