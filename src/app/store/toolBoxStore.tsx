
'use client'
import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/app/slice/menuSlice"
import  ToolBoxReducer from "@/app/slice/toolBoxSlice"
export const store = configureStore({
    reducer:{
        menu:MenuReducer,
        toolbox:ToolBoxReducer
    }
}) 