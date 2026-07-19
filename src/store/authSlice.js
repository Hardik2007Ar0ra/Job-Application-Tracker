import { createSlice } from "@reduxjs/toolkit";
import auth from '../appwrite/auth'

const initialState={
    status:false,
    userData: null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true,
            state.userData=action.payload;
        },
        logout:(state,action)=>{
            state.status=false,
            state.userData=null;
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;