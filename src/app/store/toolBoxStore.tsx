
'use client'
import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/app/slice/menuSlice"

export const store = configureStore({
    reducer:{
        menu:MenuReducer
    }
}) 