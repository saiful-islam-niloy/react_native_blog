import AsyncStorage from "@react-native-community/async-storage";
let globalBlog = {
    "post": []
}

let i;
let blogArr;

const storeBlog = async (key, value) => {
    blogArr = await getBlogJson(key)

    if (blogArr !== null) {
        globalBlog.post = []
        for (i = 0; i < JSON.parse(blogArr).post.length; i++)
            globalBlog.post.push(JSON.parse(blogArr).post[i])
    }
    globalBlog.post.push(value)

    try {
        let convertedToString = JSON.stringify(globalBlog);
        await AsyncStorage.setItem(key, convertedToString);
        alert("Data Saved");
    } catch (error) {
        alert(error);
    }
}

const getBlogJson = async (key) => {
    try {
        let data = await AsyncStorage.getItem(key);
        if (data != null)
            return data;
        else
            return null;

    } catch (error) {
        alert(error);
    }
}


const removeBlog = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        alert("Data removed successfully")
    } catch (error) {
        alert(error);
    }
}


const generateUID = () => {
    return new Date().getTime();
}

const clearEverything = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        alert(error)
    }
}

const getTime = () => {
    var d = new Date();
    var result = "";
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    result += month[d.getUTCMonth()];
    result += " "+ d.getDate()+ " ,"
    result += d.getFullYear()
    return result;
}

export {
    storeBlog,
    removeBlog,
    getBlogJson,
    generateUID,
    clearEverything,
    getTime
};

