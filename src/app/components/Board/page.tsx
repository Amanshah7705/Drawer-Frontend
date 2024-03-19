'use client'
import React, { useEffect, useRef } from 'react'

function Board() {
    const canvasRef = useRef(null)
    useEffect(()=>{
        if(!canvasRef.current)
        return
    //  const canvas : HTMLCanvasElement = canvasRef.current
    //  const context = canvas.getContext('2d')

    //  //when mouting 
    //  canvas.width = window.innerWidth
    //  canvas.height = window.innerHeight
    },[])
  return (
    <canvas ref={canvasRef}  >

    </canvas>
  )
}

export default Board