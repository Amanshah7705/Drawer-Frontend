import Board from "./components/Board/page";
import Menu from "./components/Menu/page";
import ToolBox from "./components/ToolKit/page";

export default function Home() {
  return (
    <div className='block w-full h-full letter-spacing-0.25'>
    <Menu />
    <ToolBox />
    <Board />
  </div>
  
  );
}
