import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'sonner'
const initialState = {
    user:null ,
    token:null 
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUsers:(state,action)=>{
            const {user,token}= action.payload
            state.user = user 
            state.token = token
        },
        logout:(state)=>{
            state.user = null
            state.token = null
            toast.success('logout successful')
        }
    }
})

export const {setUsers,logout} = authSlice.actions
export default authSlice.reducer
export const currentToken = (state)=> state.auth.token
export const currentUser = (state)=> state.auth.user