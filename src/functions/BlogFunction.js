import AsyncStorage from "@react-native-community/async-storage";

let globalBlog = {
    "post": []
}

let i;
let blogArr;

const storeBlog = async (value) => {
    blogArr = await getBlogJson("blogList")
    let key = value.blogId;

    if (blogArr == null) {
        console.log("blog arr is null")
        blogArr = {[key]: value};
    } else {
        blogArr = JSON.parse(blogArr)
        console.log("tt22: " + JSON.stringify(blogArr))
        blogArr[key] = value;
    }
    try {
        let convertedToString = JSON.stringify(blogArr);
        await AsyncStorage.setItem("blogList", convertedToString);
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
    result += " " + d.getDate() + " ,"
    result += d.getFullYear()
    return result;
}

const storeLike = async (blogId) => {
    let data = await getBlogJson("blogList")
    let blogArr = JSON.parse(data)
    if (blogArr !== null) {
        if(blogArr[blogId]["like"] == undefined){
            blogArr[blogId]["like"] = "1";
        }else {
            let count = parseInt(blogArr[blogId]["like"])+1
            blogArr[blogId]["like"] = count.toString()
        }
        await storeJson(blogArr)
        console.log(blogArr)
    }
}

const getJson = async (key) => {
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

const storeJson = async (value) => {
    try {
        let convertedToString = JSON.stringify(value);
        await AsyncStorage.setItem("blogList", convertedToString);
        alert("Successful");
    } catch (error) {
        alert(error);
    }
}


export {
    storeBlog,
    storeJson,
    removeBlog,
    getBlogJson,
    getJson,
    generateUID,
    clearEverything,
    getTime,
    storeLike
};

