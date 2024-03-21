export interface RootState {
  menu: MenuState;
}

export interface MenuState {
  activeMenuItem: string;
}

export interface ForToolBox {
  toolbox: string[];
}

export interface ForColorAndSize {
  color: string;
  size: number;
}
