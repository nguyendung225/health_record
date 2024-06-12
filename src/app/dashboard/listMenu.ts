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
  // {
  //   title: "GENERAL.SYSTEM",
  //   to: PATH_ROUTES.HOME,
  //   name: "system",
  //   permission: PERMISSIONS.ADMIN,
  //   ability: AUTHORITIES.AUTHORITY.VIEW,
  //   icon: "/media/icons/homepage/system.svg",
  //   subMenu: [
  //     {
  //       title: "MENU.DASHBOARD",
  //       to: PATH_ROUTES.HOME,
  //       hasBullet: false,
  //       icon: "/media/icons/user.svg",
  //       permission: PERMISSIONS.ADMIN,
  //       ability: AUTHORITIES.USER.VIEW,
  //     },
  //   ]
  // },
  {
    title: "Thông tin nhân sự",
    to: PATH_ROUTES.TTNS,
    name: "system",
    permission: PERMISSIONS.ADMIN,
    ability: AUTHORITIES.AUTHORITY.VIEW,
    icon: "/media/icons/homepage/system.svg",
    subMenu: [
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.TTNS + 1,
        hasBullet: false,
        icon: "/media/icons/overview.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám theo yêu cầu",
        to: PATH_ROUTES.TTNS + 2,
        hasBullet: false,
        icon: "/media/icons/person.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám SK định kì",
        to: PATH_ROUTES.TTNS + 3,
        hasBullet: false,
        icon: "/media/icons/remind-nav.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.TTNS + 3,
        hasBullet: false,
        icon: "/media/icons/contract.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
    ]
  },
  {
    title: "Hồ sơ y tế",
    to: PATH_ROUTES.HSYT + "/ho-so-tong-quan",
    name: "system",
    permission: PERMISSIONS.ADMIN,
    ability: AUTHORITIES.AUTHORITY.VIEW,
    icon: "/media/icons/homepage/system.svg",
    subMenu: [
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.HSYT + "/ho-so-tong-quan",
        hasBullet: false,
        icon: "/media/icons/overview.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám theo yêu cầu",
        to: PATH_ROUTES.HSYT + "/kham-theo-yeu-cau",
        hasBullet: false,
        icon: "/media/icons/person.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám SK định kì",
        to: PATH_ROUTES.HSYT + "/kham-sk-dinh-ki",
        hasBullet: false,
        icon: "/media/icons/remind-nav.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.HSYT + "/ho-so-tong-quan-2",
        hasBullet: false,
        icon: "/media/icons/contract.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
    ]
  },
  {
    title: "Thông tin tiêm chủng",
    to: PATH_ROUTES.TTTC,
    name: "system",
    permission: PERMISSIONS.ADMIN,
    ability: AUTHORITIES.AUTHORITY.VIEW,
    icon: "/media/icons/homepage/system.svg",
    subMenu: [
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.TTTC + 1,
        hasBullet: false,
        icon: "/media/icons/overview.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám theo yêu cầu",
        to: PATH_ROUTES.TTTC + 2,
        hasBullet: false,
        icon: "/media/icons/person.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Khám SK định kì",
        to: PATH_ROUTES.TTTC + 3,
        hasBullet: false,
        icon: "/media/icons/remind-nav.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      {
        title: "Hồ sơ tổng quan",
        to: PATH_ROUTES.TTTC + 3,
        hasBullet: false,
        icon: "/media/icons/contract.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
    ]
  },
  {
    title: "Thông tin nhân sự",
    to: PATH_ROUTES.DSNS,
    name: "personnel",
    permission: PERMISSIONS.ADMIN,
    ability: AUTHORITIES.AUTHORITY.VIEW,
    icon: "/media/icons/person.svg",
    subMenu: [
      {
        title: "Danh sách nhân sự",
        to: PATH_ROUTES.DSNS,
        hasBullet: false,
        icon: "/media/icons/person.svg",
        permission: PERMISSIONS.ADMIN,
        ability: AUTHORITIES.USER.VIEW,
      },
      
    ]
  },
]