import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {getNotification} from "../functions/NotificationFunction";
import {Card} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {faLinux} from "@fortawesome/free-brands-svg-icons";

class Notification extends Component {
    constructor() {
        super();
        this.state={
            notificationData:[]
        }
    }

    async componentDidMount() {
        let data = await getNotification()
        let workingData=[];
        let keys = []
        if(data != null){
            let notification = JSON.parse(data)
            console.log(notification)
            // console.log(notification[this.props.currentUserName])
            if(notification[this.props.currentUserName] != undefined){
                for(let key in notification[this.props.currentUserName])
                    keys.push(key)
                for(let i = 0; i<keys.length; i++ ){
                    workingData.push(
                        notification[this.props.currentUserName][keys[i]]
                    )
                }
                this.setState({notificationData:workingData})
            }
        }
    }

    renderNotification = (item) => (
        <Card>
            <View style={{alignSelf: "flex-start", fontSize: 18}}>
                {
                    item.type == "comment" ?
                        <View>
                            <Text>
                                <FontAwesomeIcon icon={faComment} size={20} color={"blue"}/>
                                {" "+item.author+ " commented on your post"}
                            </Text>
                        </View>
                        :
                        <View>
                            <Text>
                                <FontAwesomeIcon icon={faLinux} size={20} color={"blue"}/>
                                {" "+item.author+ " likes your post"}
                            </Text>
                        </View>
                }
            </View>
        </Card>
    );

    render() {
        let i = 0;
        console.log("Notification Data:; "+JSON.stringify(this.state.notificationData))
        return (
            <View>
                <FlatList
                    data={this.state.notificationData}
                    renderItem={({item}) => {
                        return (
                            <this.renderNotification
                                type={item.type}
                                author={item.author}
                            />)
                    }}
                    keyExtractor={item => `${i++}`}
                />
            </View>
        );
    }
}

export default Notification;