import AsyncStorage from "@react-native-community/async-storage";
let globalBlog = {
    "post":[]
}

let i;

const storeBlog = async (key, value) => {
    blogArr= await getBlogJson(key)
    console.log("Type: "+ typeof(blogArr))
    // console.log("Data: "+ JSON.parse(blogArr).post[0]["blogData"])
    console.log("Real Data: "+ JSON.stringify(blogArr))

 
    if(blogArr !== null){
        globalBlog.post = []
        for(i = 0; i<JSON.parse(blogArr).post.length; i++)
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


const generateUID = async () => {
    let blogList = await getBlogJson("blogList");
    if (blogList === null) {
        return "0";
    } else {
        let size = JSON.parse(blogList).post.length
        console.log("Length: "+size)
        return size+1+"";
    }
}

export {
    storeBlog,
    removeBlog,
    getBlogJson,
    generateUID
};

