"use client";
import { menuItems } from "@/app/constants";
import React, { ChangeEvent, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useSelector } from "react-redux";
function ToolBox() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(1);


  const actionMenuItem = useSelector((state:RootState)=>state.menu.activeMenuItem)

  const showStroke = actionMenuItem === menuItems.PENCIL

  const showEraser = actionMenuItem === menuItems.ERASER
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeColor = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };

  const updateBrushSize = (e: ChangeEvent<HTMLInputElement>) => {
    setBrushSize(+e.target.value);
  };

  return (
    <div className=" absolute p-4 flex flex-col ml-auto mr-auto w-200">
      <div className="border-2 border-black p-4 rounded-md mt-40 w-500  ">
        {
          showStroke && (
            <div>
              <div className="mb-4">
          <button
            className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-lg font-semibold"
            onClick={handleClick}
          >
            Pick Color 
          </button>
          {displayColorPicker && (
            <div className="absolute z-10">
              <div className="fixed inset-0" onClick={handleClose}></div>
              <ChromePicker
                color={selectedColor}
                onChange={handleChangeColor}
              />
            </div>
          )}
        </div>
        <div>
          <div
            className="w-12 h-12 rounded-lg mt-2"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
            </div>
          )
        }
        <div className="mt-4 flex-col">
        <div>
          <label htmlFor="brushSize" className="text-lg font-semibold">
            Brush Size : {brushSize} 
          </label>
          </div>
          <input
            type="range"
            id="brushSize"
            min={1}
            max={10}
            value={brushSize}
            onChange={updateBrushSize}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default ToolBox;
