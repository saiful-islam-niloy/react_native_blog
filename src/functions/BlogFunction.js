import AsyncStorage from "@react-native-community/async-storage";

create storeBlog = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        alert("Data Saved");
    } catch (error) {
        alert(error);
    }
}

const getBlogJson = async(key)=>{
    try{
        let data = await AsyncStorage.getItem(key);
        if(data != null)
            return JSON.parse(data);
        else{
            alert("No data found!");
            return "-1";
        }    
    }catch(error){
        alert(error);
    }
}

const removeBlog = async(key)=>{
    try{
        await AsyncStorage.removeItem(key);
        alert("Data removed successfully")
    }catch(error){
        alert(error);
    }
}


function generateUID(){
    let blogList = getBlogJson("blogList");
    if (blogList === "-1"){
        return "0";
    }else{
        console.log(blogList.lenght)
    }
    console.log(blogList)
}
export {storeBlog, removeBlog, getBlogJson};