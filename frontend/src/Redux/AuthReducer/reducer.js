import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL, LOGOUT_SUCCESS } from "./action_types";

  
  let token =window.localStorage.getItem("token");
  // const userData = JSON.parse(localStorage.getItem("user"))
  const initialState = {
    register_loading: false,
    reg_msg:"",
    register_error: false,
    login_laoding: false,
    login_error: false,
    user:{},
    authToken:token,
    register_success:false,
    isAuth: token?true:false
  };
  export const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case REGISTER_REQUEST: {
        return { ...state, register_loading:true,register_error:false, isAuth:false};
      }
      case REGISTER_FAIL: {
        return { ...state, register_loading:false,register_error:true, isAuth:false,register_success:false };
      }
      case REGISTER_SUCCESS: {
        return { ...state, register_loading:false,register_error:false,register_success:true};
      }
      case LOGIN_REQUEST: {
        return { ...state, login_laoding:true,login_error:false,isAuth:false };
      }
      case LOGIN_FAIL: {
        return { ...state, login_laoding:false,login_error:true,isAuth:false };
      }
      case LOGIN_SUCCESS: {
          window.localStorage.setItem("token",payload.token)
          window.localStorage.setItem("user",JSON.stringify(payload.data))
        return { ...state, login_laoding:false,login_error:false,isAuth:true,authToken:payload.token,user:payload.data };
      }
      case LOGOUT_SUCCESS:{
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("user")
          return{...state,isAuth:false}
      }
      default: {
        return { ...state };
      }
    }
  };