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
    storeLike
};

