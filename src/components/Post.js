import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Card, Input, Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {generateUID, createBlogJson, storeBlog, getBlogJson, getTime} from '../functions/BlogFunction';


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
                            onPress= {() => { 
                                let temp = new Date()
                                let author = auth.currentUser.name
                                let email = auth.currentUser.email
                                setBlogId(""+temp.getTime())
                                setAuthorId(email)
                                setAuthorName(author)
                                setDate(getTime())
                                let blog = {blogId, authorId, authorName, date, blogData};
                                if(blogId !== "")
                                    storeBlog(blog)
                                else
                                    alert("Something went wrong! Try Again")

                                console.log("Blog ID:" +blogId)
                            }} />
                    </Card>
                </View>)
            }
        </AuthContext.Consumer>
    );
}

export default Post;