// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        alert("Data Saved");
    } catch (error) {
        alert(error);
    }
}

const storeDataJson = async(key, value)=>{
    try{
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }catch(error){
        alert(error);
    }
}

const getData = async(key)=>{
    try{
        let data = await AsyncStorage.getItem(key);
        if(data != null)
            return data;
        else    
            alert("No data found!");
    }catch(error){
        alert(error);
    }
}

const getDataJson = async(key)=>{
    try{
        let data = await AsyncStorage.getItem(key);
        if(data != null)
            return JSON.parse(data);
        else    
            alert("No data found!");
    }catch(error){
        alert(error);
    }
}

const removeData = async(key)=>{
    try{
        await AsyncStorage.removeItem(key);
        alert("Data removed successfully")
    }catch(error){
        alert(error);
    }
}

export {storeData, storeDataJson, getData, getDataJson, removeData};