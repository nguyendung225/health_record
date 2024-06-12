/* eslint-disable react/jsx-no-target-blank */
import {useContext, useEffect, useState, useMemo} from "react";
import { headerConstant } from "../../header/header-menus/constant";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { checkMenuByPermissions } from "../../../../../app/modules/utils/FunctionUtils";
import { SidebarMenuWithSub } from "./SidebarMenuWithSub";
import useMultiLanguage from "../../../../../app/hook/useMultiLanguage";
import { SidebarContext } from "../SidebarContext";
import {SCREEN} from "../../../../../app/Constant";
import { TMenu, TSubMenu } from "../../../../../app/dashboard/listMenu";

export interface IDataMenu {
  isToggleOn?: boolean;
  widthMenu: number;
}

const SidebarMenuMain = () => {
  const { lang } = useMultiLanguage();
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(document.body.offsetWidth <= SCREEN.TABLET_WIDTH);
  const [listMenuItem, setListMenuItem] = useState<TSubMenu[]>([]);
  const [listMenuParent, setListMenuParent] = useState<TMenu[]>([]);
  const [data, setData] = useState<IDataMenu>({} as IDataMenu);
  const { isToggleOn } = useContext(SidebarContext);
  const listMenuSelect = localStorage.getItem(headerConstant?.LIST_SUB_MENU);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsTabletOrMobile(document.body.offsetWidth <= SCREEN.TABLET_WIDTH);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const listMenuParentSelect: TMenu[] = useMemo(() => {
    return isTabletOrMobile ? checkMenuByPermissions() : [];
  }, [isTabletOrMobile]);

  useEffect(() => {
    if (!listMenuSelect) return;
    setListMenuItem(JSON.parse(listMenuSelect));
  }, [listMenuSelect])

  useEffect(() => {
    setListMenuParent(listMenuParentSelect);
  }, [listMenuParentSelect])

  useEffect(() => {
    setTimeout(() => {
      setData({
        isToggleOn: isToggleOn,
        widthMenu: document.getElementById('kt_app_sidebar')?.offsetWidth || 0
      })
    }, 300)
  }, [isToggleOn])

  const renderMenu = useMemo(() => {

    return (
      isTabletOrMobile ?
        listMenuParent.map((menu: TMenu, index: number) => (
          <SidebarMenuWithSub
            key={index}
            to={menu.to}
            title={lang(menu?.title)}
            icon={menu.icon}
            subMenu={menu.subMenu}
          >
            {menu.subMenu.map((menuItem: TSubMenu, index: number) => (
              <SidebarMenuItem
                data={data}
                key={index}
                to={menuItem.to}
                title={lang(menuItem?.title)}
                hasBullet={menuItem.hasBullet}
                icon={menuItem.icon}
                menuItem={menuItem}
              />
            ))}
          </SidebarMenuWithSub>
        ))
        : listMenuItem.map((menuItem: TSubMenu, index: number) => (
          <SidebarMenuItem
            data={data}
            key={index}
            to={menuItem.to}
            title={lang(menuItem?.title)}
            hasBullet={menuItem.hasBullet}
            icon={menuItem.icon}
            menuItem={menuItem}
          />
        ))
    )
  }, [isTabletOrMobile, listMenuParent, listMenuItem]);

  return (<>
    {renderMenu}
  </>)
};

export { SidebarMenuMain };

