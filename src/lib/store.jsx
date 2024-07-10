"use client"
import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './fetchers/Product/ProductSlice'
import { productApi } from './fetchers/Product/ProductApi'
import authSlice from './fetchers/Authintication/authSlice'
import { persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key:'auth',
  storage
}
const persistAuthReducers = persistReducer(persistConfig,authSlice)


export const store = configureStore({
  reducer: {
        [productApi.reducerPath]:productApi.reducer,
        products:ProductSlice,
        auth:persistAuthReducers
  },
  middleware:(getDefaultMiddelware)=>getDefaultMiddelware({serializableCheck:{
    ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
  }}).concat(productApi.middleware)
})

export const persistor = persistStore(store)