import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL, LOGOUT_SUCCESS } from "./action_types";
import { loginUserApi, registerUserApi } from './api';

export const userLogin = (data)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        let res = await loginUserApi(data)
        dispatch({type:LOGIN_SUCCESS,payload:{token:res.token,data:res}})
    }catch(err){
        dispatch({type:LOGIN_FAIL})
    }
}

export const usersignup = (data)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_REQUEST})
        let res = await registerUserApi(data)
        dispatch({type:REGISTER_SUCCESS,payload:res.data})
    }catch(err){
        dispatch({type:REGISTER_FAIL})
    }
}
export const logoutUser = ()=> async(dispatch)=>{
    dispatch({type:LOGOUT_SUCCESS})
}