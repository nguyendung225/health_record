import {PERMISSIONS, AUTHORITIES, PATH_ROUTES} from "../Constant"

export type TMenu = {
  title: string,
  to: string,
  name: string,
  permission: string,
  ability: string,
  subMenu: TSubMenu[],
  icon: string
}

export type TSubMenu = {
  title: string,
  to: string,
  hasBullet?: boolean,
  icon: string
  permission: string,
  ability: string,
  subMenu?: TSubMenu[]
}

export const allMenu: TMenu[] = [
  {
    title: "GENERAL.SYSTEM",
    to: PATH_ROUTES.HOME,
    name: "system",
    permission: PERMISSIONS.ADMIN,
    ability: AUTHORITIES.AUTHORITY.VIEW,
    icon: "/media/icons/homepage/system.svg",
    subMenu: [
      {
        title: "MENU.DASHBOARD",
        to: PATH_ROUTES.HOME,
        hasBullet: false,
        icon: "/media/icons/user.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
    ]
  },
]