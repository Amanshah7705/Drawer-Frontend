'use client'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function Board() {
    const canvasRef = useRef(null)
    const actionMenuItem :any= useSelector((state:RootState)=>state.menu.activeMenuItem)
    const {color,size}:any = useSelector((state:ForToolBox)=>state.toolbox[actionMenuItem])
    useEffect(()=>{
        if(!canvasRef.current)
        return
     const canvas : HTMLCanvasElement = canvasRef.current
     const context = canvas.getContext('2d')

     //when mouting 
     canvas.width = window.innerWidth
     canvas.height = window.innerHeight
    },[])
    console.log(color,size)
  return (
    <canvas ref={canvasRef}  >

    </canvas>
  )
}

export default Board