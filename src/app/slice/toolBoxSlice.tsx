import { createSlice } from "@reduxjs/toolkit";
import { colourHex, menuItems } from "../constants";

const initialState = {
  [menuItems.PENCIL]: {
    color: colourHex.colour,
    size: 3,
  },
  [menuItems.ERASER]: {
    color: colourHex.colour,
    size: 3,
  },
  [menuItems.UNDO]: {},
  [menuItems.REDO]: {},
  [menuItems.DOWNLOAD]: {},
};

const toolBoxSlice = createSlice({
  name: "toolBox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action.payload.size;
    },
  },
});

export const { changeColor, changeBrushSize } = toolBoxSlice.actions;

export default toolBoxSlice.reducer;
