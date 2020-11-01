import AsyncStorage from "@react-native-community/async-storage";

const storeNotification = async (authorName, notification) => {
    let data = await getNotification()

    if (data == null) {
        data = JSON.parse(data)
        data = {
            [authorName]: {
                [parseInt(Math.random() * 1000000 + 1).toString()]: notification
                }
        }
    } else {
        data = JSON.parse(data)
        data[authorName][parseInt(Math.random() * 1000000 + 1)] = notification
    }


    try {
        let convertedToString = JSON.stringify(data);
        await AsyncStorage.setItem("notification", convertedToString);
    } catch (error) {
        alert(error);
    }
}

const getNotification = async () => {
    try {
        let data = await AsyncStorage.getItem("notification");
        if (data != null)
            return data;
        else
            return null;

    } catch (error) {
        alert(error);
    }
}

export {
    storeNotification,
    getNotification,
}