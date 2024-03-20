interface RootState{
    menu:MenuState
}

interface MenuState{
    activeMenuItem: string;

}

interface ForToolBox{
    toolbox:string[]
}

interface ForColorAndSize{
     color:string,
     size:number
}