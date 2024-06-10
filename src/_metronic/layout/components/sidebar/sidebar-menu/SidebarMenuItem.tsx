import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { checkIsActive, KTSVG, WithChildren } from '../../../../helpers'
import { useLayout } from '../../../core'
import CustomTooltip from '../../../../../app/modules/component/CustomTooltip'
import { SidebarContext } from '../SidebarContext'
import useMultiLanguage from '../../../../../app/hook/useMultiLanguage'
import { IDataMenu } from './SidebarMenuMain'
import { TSubMenu } from '../../../../../app/dashboard/listMenu'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  data: IDataMenu,
  menuItem: TSubMenu
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  data,
  menuItem
}) => {
  const { lang } = useMultiLanguage();
  const { pathname } = useLocation()
  const { config } = useLayout()
  const { app } = config
  const { isToggleOn } = useContext(SidebarContext)
  const subMenuItem = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(checkIsActive(pathname, to));
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isSubMenuItemHover, setIsSubMenuItemHover] = useState<boolean>(false);

  let isSubMenu = menuItem?.subMenu && menuItem?.subMenu?.length > 0

  useEffect(() => {
    if (subMenuItem.current) {
      subMenuItem.current.style.left = `${data?.widthMenu + 5}px`;
    }
  }, [data?.widthMenu]);

  useEffect(() => {
    setIsActive((isSubMenu ? !!menuItem?.subMenu?.some((item: TSubMenu) => checkIsActive(pathname, item.to)) : checkIsActive(pathname, to)))
  }, [pathname])

  const handleMouseEnter = () => {
    setIsSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuVisible(false);
  };

  const handleMouseOverSubMenuItem = () => {
    setIsSubMenuItemHover(true);
  }

  const handleMousezLeaveSubMenuItem = () => {
    setIsSubMenuItemHover(false);
  }

  return (
    <div className="menu-item subMenu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={subMenuItem}
        className={isSubMenuVisible && isSubMenu ? "subMenu-item" : "hidden"}
        onMouseOver={handleMouseOverSubMenuItem}
        onMouseLeave={handleMousezLeaveSubMenuItem}
      >
        {isSubMenu &&
          menuItem?.subMenu?.map((item: TSubMenu) => (
            <div className="spaces py-2">
              <Link
                className={clsx("menu-link without-sub", { active: checkIsActive(pathname, item.to) })}
                state={{ reset: true }}
                to={item.to}
              >
                {hasBullet && (
                  <span className="menu-bullet">
                    <span className="bullet bullet-dot"></span>
                  </span>
                )}
                {item.icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
                  <span className="menu-icon">
                    {" "}
                    <KTSVG path={item.icon} className="icon-svg" />
                  </span>
                )}
                <span>{lang(item.title)}</span>
              </Link>
            </div>
          ))}
      </div>

      <CustomTooltip title={title} placement="bottom" className={isToggleOn || isSubMenu ? "hidden" : ""}>
        <Link
          className={clsx("menu-link without-sub", { active: isActive, hover: isSubMenuItemHover })}
          state={{ reset: true }}
          to={to}
          onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => isSubMenu && event.preventDefault()}
        >
          {hasBullet && (
            <span className="menu-bullet">
              <span className="bullet bullet-dot"></span>
            </span>
          )}
          {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
            <span className="menu-icon">
              {" "}
              <KTSVG path={icon} className="svg-icon-2" />
            </span>
          )}
          {fontIcon && app?.sidebar?.default?.menu?.iconType === "font" && (
            <i className={clsx("bi fs-3", fontIcon)}></i>
          )}
          <span className="menu-title">{title}</span>

          {isSubMenu && <KTSVG path="/media/icons/arrow-left.svg" className="icon-arrow" />}
        </Link>
      </CustomTooltip>
      {children}
    </div>
  );
}

export { SidebarMenuItem }
