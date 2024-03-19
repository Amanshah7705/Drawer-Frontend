import Board from "./components/Board/page";
import Menu from "./components/Menu/page";
import ToolBox from "./components/ToolKit/page";

export default function Home() {
  return (
    <div >
      <Menu/>
      <ToolBox/>
      <Board/>
    </div>
  );
}
