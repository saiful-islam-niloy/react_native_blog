import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Card, Input, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {generateUID, createBlogJson, storeBlog, getBlogJson} from '../functions/BlogFunction';


const Post = () => {
    const [blogId, setBlogId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [date, setDate] = useState("");
    const [blogData, setBlogData] = useState("");

    return (
        <AuthContext.Consumer>
            {
                (auth) => (<View>
                    <Card>
                        <Input
                            multiline 
                            style={{ fontSize: 15 }}
                            placeholder="What's on your mind?"
                            leftIcon={<FontAwesomeIcon icon={faEdit} size={20} color={"blue"} />}
                            onChangeText={(data) => { setBlogData(data) }} />
                        <Button
                            title="Post"
                            onPress= {async() => { 
                                let id = await generateUID() 
                                setBlogId(JSON.stringify(id))
                                console.log("generateUID():"+JSON.stringify(blogId))
                                setAuthorId("1")
                                setAuthorName(auth.currentUser.name)
                                setDate("October 29, 2020")
                                let blog = {blogId, authorId, authorName, date, blogData};
                                storeBlog("blogList", blog)
                            }} />
                    </Card>
                </View>)
            }
        </AuthContext.Consumer>
    );
}

export default Post;