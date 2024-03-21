"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { menuItems } from "@/app/constants";
import { actionItemClick, menuItemClick } from "@/app/slice/menuSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const handleMenuClick = (item: string) => {
    dispatch(menuItemClick(item));
  };
  const handleActionClick = (item: string) => {
    dispatch(actionItemClick(item));
  };
  return (
    <div className="absolute inset-x-0 flex justify-center items-center ">
      <div className="px-5 py-1 flex justify-between w-1/4 rounded-md border border-black shadow-md bg-gray-100">
        <div className="cursor-pointer flex justify-center items-center h-15 w-10 rounded-full transition duration-300 ease-in-out hover:bg-gray-200">
          <FontAwesomeIcon
            icon={faPencil}
            className="text-gray-800 h-10 w-12"
            onClick={() => handleMenuClick(menuItems.PENCIL)}
          />
        </div>
        <div className="cursor-pointer flex justify-center items-center h-15 w-10 rounded-full transition duration-300 ease-in-out hover:bg-gray-200">
          <FontAwesomeIcon
            icon={faEraser}
            className="text-gray-800 h-10 w-12"
            onClick={() => handleMenuClick(menuItems.ERASER)}
          />
        </div>
        <div className="cursor-pointer flex justify-center items-center h-15 w-10 rounded-full transition duration-300 ease-in-out hover:bg-gray-200">
          <FontAwesomeIcon
            icon={faRotateLeft}
            className="text-gray-800 h-10 w-12"
            onClick={() => handleActionClick(menuItems.UNDO)}
          />
        </div>
        <div className="cursor-pointer flex justify-center items-center h-15 w-10 rounded-full transition duration-300 ease-in-out hover:bg-gray-200">
          <FontAwesomeIcon
            icon={faRotateRight}
            className="text-gray-800 h-10 w-12"
            onClick={() => handleActionClick(menuItems.REDO)}
          />
        </div>
        <div className="cursor-pointer flex justify-center items-center h-15 w-10 rounded-full transition duration-300 ease-in-out hover:bg-gray-200">
          <FontAwesomeIcon
            icon={faFileArrowDown}
            className="text-gray-800 h-10 w-12"
            onClick={() => handleActionClick(menuItems.DOWNLOAD)}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
