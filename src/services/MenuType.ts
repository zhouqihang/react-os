import React from 'react';

export type menuId = number | string;

export interface IMenuItem {
  id: menuId;
  content: React.ReactNode,
  suffix?: React.ReactNode,
  children?: menuListType;
}
export type menuListType = Array<IMenuItem | IMenuItem[]>;


export interface IAppMenu {
  id: menuId,
  content: string;
  menus: menuListType;
}
export type appMenuBarMenus = IAppMenu[];