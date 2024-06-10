export const ConstantList = {
  ENTER_KEY: "Enter",
};
export enum SELECT_OPTION {
  SELECT_ACTION = "select-option",
  CLEAR_ACTION = "clear",
  REMOVE_ACTION = "remove-value",
}

export const PERMISSIONS = {
  AUTHORITY: "AUTHORITY",
  MODULE: "MODULE",
  ADMIN: "ADMIN",
}

export const AUTHORITIES = {
  ACCESS: {
    SYSTEM: "ACCESS.SYSTEM",
    USER: "ACCESS.USER",
    ORGANIZATION: "ACCESS.ORGANIZATION",
    ROLE: "ACCESS.ROLE",
    AUTHORITY: "ACCESS.AUTHORITY",
    DEPARTMENT: "ACCESS.DEPARTMENT"
  },

  AUTHORITY : {
    VIEW: "AUTHORITY.VIEW",
    CREATE: "AUTHORITY.CREATE",
    UPDATE: "AUTHORITY.UPDATE",
    DELETE: "AUTHORITY.DELETE",
    UPLOAD: "AUTHORITY.UPLOAD",
  },

  ROLE : {
    VIEW: "ROLE.VIEW",
    CREATE: "ROLE.CREATE",
    UPDATE: "ROLE.UPDATE",
    DELETE: "ROLE.DELETE",
    UPLOAD: "ROLE.UPLOAD",
  },

  USER : {
    VIEW: "USER.VIEW",
    CREATE: "USER.CREATE",
    UPDATE: "USER.UPDATE",
    DELETE: "USER.DELETE",
    UPLOAD: "USER.UPLOAD",
  },

  ORGANIZATION : {
    VIEW: "ORGANIZATION.VIEW",
    CREATE: "ORGANIZATION.CREATE",
    UPDATE: "ORGANIZATION.UPDATE",
    DELETE: "ORGANIZATION.DELETE",
    UPLOAD: "ORGANIZATION.UPLOAD",
  },

  DEPARTMENT : {
    VIEW: "DEPARTMENT.VIEW",
    CREATE: "DEPARTMENT.CREATE",
    UPDATE: "DEPARTMENT.UPDATE",
    DELETE: "DEPARTMENT.DELETE",
    UPLOAD: "DEPARTMENT.UPLOAD",
  },

  PERSON : {
    VIEW: "PERSON.VIEW",
    CREATE: "PERSON.CREATE",
    UPDATE: "PERSON.UPDATE",
    DELETE: "PERSON.DELETE",
    UPLOAD: "PERSON.UPLOAD",
  },
}

export const PERMISSION_ABILITY = {
  VIEW: "VIEW",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  UPLOAD: "UPLOAD",
  EXPORT: "EXPORT",
}

export const MODULE = {
  HO_SO: "HO_SO",
  TUYEN_DUNG: "TUYEN_DUNG",
  CHAM_CONG: "CHAM_CONG",
  TAI_LIEU: "TAI_LIEU",
  DAO_TAO: "DAO_TAO",
  PHONG_HOP: "PHONG_HOP",
  CONG_VIEC: "CONG_VIEC",
  HE_THONG: "HE_THONG",
  USER: "USER",
}

export const ROLE = {
  USER: "ROLE_USER",
}

export const MODULE_NAME = {
  HO_SO: "profile",
  TUYEN_DUNG: "recruitment",
  CHAM_CONG: "timekeeping",
  TAI_LIEU: "document",
  DAO_TAO: "trainning",
  PHONG_HOP: "meeting-room",
  CONG_VIEC: "job",
  HE_THONG: "system"
}

export const PATH_ROUTES = {
  HOME: '/home',
}

export const PAGINATION = {
  PAGE_INDEX_DEFAULT: 0,
  PAGE_SIZE_DEFAULT: 10,
  TOTAL_PAGE_DEFAULT: 10,
  TOTAL_ELEMENTS_DEFAULT: 0,
  NUMBER_OF_ELEMENTS_DEFAULT: 0,
}

export const VARIABLE = {
  FUNCTION_CONSTANT: {
    ERROR_MESSAGE: "errorMessage",
    MESSAGE: "message",
  },

  DEFAULT_PASSWORD: "12345678"
}

export const SCREEN = {
  TABLET_WIDTH: 992
}

export const DATE_FORMAT = {
  TABLE: "DD/MM/YYYY",
  ISO_DATE: "YYYY-MM-DDTHH:mm:ss"
}

export const TABLE_FIELD = {
  ACTION: "action",
  STT: "stt",
}

export const RESPONSE_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
}

export const GRID = {
  ONE_ITEM_PER_LINE: 12,
  TWO_ITEM_PER_LINE: 6,
  THREE_ITEM_PER_LINE: 4,
  FOUR_ITEM_PER_LINE: 3,
}

export const REDIRECT_PATH = {
  NOT_FOUND: "/error/404",
  HOME: "/home",
}

export const DELETE_TYPE = {
  SINGLE_DELETE: 1,
  DELETE_ALL: 2,
}