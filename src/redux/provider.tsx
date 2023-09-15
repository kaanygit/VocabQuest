"use client"
import React from 'react'
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {ChildrenProps} from '../types/types'



export function ProviderStore({children}:ChildrenProps){
    return <Provider store={store}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>
}