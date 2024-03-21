"use client";
import { menuItems } from "@/app/constants";
import { actionItemClick } from "@/app/slice/menuSlice";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/app/socket";
import { ForColorAndSize, ForToolBox, RootState } from "@/app/returnType";

let file = 1;

function Board() {
  const dispatch = useDispatch();
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const { actionMenuItem, activeMenuItem }: any = useSelector(
    (state: RootState) => state.menu
  );
  const { color, size }: any = useSelector(
    (state: ForToolBox) => state.toolbox[activeMenuItem]
  );
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (actionMenuItem === menuItems.DOWNLOAD) {
      const URL = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = `${file}.png`;
      anchor.click();
      file++;
    } else if (actionMenuItem === menuItems.UNDO) {
      const imageData: ImageData | undefined =
        drawHistory.current[historyPointer.current - 1];
      if (imageData) {
        context?.putImageData(imageData, 0, 0);
        if (historyPointer.current > 1) {
          historyPointer.current = historyPointer.current - 1;
        }
      }
    } else if (actionMenuItem === menuItems.REDO) {
      const imageData: ImageData | undefined =
        drawHistory.current[historyPointer.current + 1];
      if (imageData) {
        context?.putImageData(imageData, 0, 0);
        if (historyPointer.current < drawHistory.current.length - 1) {
          historyPointer.current = historyPointer.current + 1;
        }
      }
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = size;
    }
    socket.on("changeConfig", (colorSize: ForColorAndSize) => {
      if (context) {
        context.strokeStyle = colorSize.color;
        context.lineWidth = colorSize.size;
      }
    });
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (context && historyPointer.current === 0) {
      context.rect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "#FFFFFF";
      context.fill();
    }
    const imageData: ImageData | undefined = context?.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    if (imageData) {
      drawHistory.current.push(imageData);
    }

    const beginPath = (x: number, y: number) => {
      context?.beginPath();
      context?.moveTo(x, y);
    };

    const drawPath = (x: number, y: number) => {
      context?.lineTo(x, y);
      context?.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldDraw.current) {
        drawPath(e.clientX, e.clientY);
        socket.emit("drawPath", { x: e.clientX, y: e.clientY });
      }
    };
    const hadnleMouseUp = (e: MouseEvent) => {
      shouldDraw.current = false;
      const imageData: ImageData | undefined = context?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (imageData) {
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", hadnleMouseUp);

    socket.on("beginPath", (Coordinates) => {
      beginPath(Coordinates.x, Coordinates.y);
    });
    socket.on("drawPath", (Coordinates) => {
      drawPath(Coordinates.x, Coordinates.y);
    });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", hadnleMouseUp);
      socket.off("beginPath", (Coordinates) => {
        beginPath(Coordinates.x, Coordinates.y);
      });
      socket.off("drawPath", (Coordinates) => {
        drawPath(Coordinates.x, Coordinates.y);
      });
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default Board;
