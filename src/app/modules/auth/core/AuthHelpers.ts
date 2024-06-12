import { AuthModel, ResponseModel } from './_models'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { KEY_LOCALSTORAGE, RESPONSE_STATUS_CODE } from './_consts';
import { checkMenuByPermissions } from '../../utils/FunctionUtils';
import { localStorageItem } from '../../utils/LocalStorage';
import { headerConstant } from '../../../../_metronic/layout/components/header/header-menus/constant';

const AUTH_LOCAL_STORAGE_KEY = KEY_LOCALSTORAGE.AUTH_LOCAL_STORAGE_KEY

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }
  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const setSubMenu = (to: string = "/home") => {
  const checkedMenu = checkMenuByPermissions();
  const currentModuleName = localStorageItem.get(KEY_LOCALSTORAGE.CURRENT_MODULE);

  if (to) {
    const selectedMenu = checkedMenu.find((menu) => menu.to === to);
    selectedMenu && localStorage.setItem(headerConstant.LIST_SUB_MENU, JSON.stringify(selectedMenu?.subMenu));
    return;
  }

  if (localStorageItem.get(KEY_LOCALSTORAGE.AUTHORITIES)) {
    const selectSubMenu = JSON.stringify(checkedMenu?.filter(menu => menu?.name === currentModuleName)[0]?.subMenu || [])
    localStorage.setItem(KEY_LOCALSTORAGE.LIST_SUB_MENU, selectSubMenu);
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorageItem.remove(AUTH_LOCAL_STORAGE_KEY)
    localStorageItem.remove(KEY_LOCALSTORAGE.LIST_MENU)
    localStorageItem.remove(KEY_LOCALSTORAGE.LIST_SUB_MENU)
    localStorageItem.remove(KEY_LOCALSTORAGE.AUTHORITIES)
    localStorageItem.remove(KEY_LOCALSTORAGE.AUTH)
    localStorageItem.remove(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE)
    localStorageItem.remove(KEY_LOCALSTORAGE.ID_TOKEN_DECODE)
    localStorageItem.remove(KEY_LOCALSTORAGE.TOKEN_EXPIRATION)
    localStorageItem.remove(KEY_LOCALSTORAGE.DEPARTMENT)
    localStorageItem.remove(KEY_LOCALSTORAGE.ROOM)
    localStorageItem.remove(KEY_LOCALSTORAGE.ACCOUNT_ROLE)
    localStorageItem.remove(KEY_LOCALSTORAGE.CURRENT)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const handleRequest = (requestConfig: AxiosRequestConfig): AxiosRequestConfig => {
  const { headers = {} } = requestConfig

  const auth = getAuth()
  if (auth && auth.access_token) {
    headers.Authorization = `Bearer ${auth.access_token}`
  }

  return requestConfig
}

const handleResponse = (responseConfig: AxiosResponse<ResponseModel>) => {
  const { data } = responseConfig

  switch (data.code) {
    case RESPONSE_STATUS_CODE.SUCCESS:
      break
    case RESPONSE_STATUS_CODE.CREATED:
    case RESPONSE_STATUS_CODE.NO_CONTENT:
      toast.success(data.message)
      break
    default:
      break
  }

  return responseConfig
}

const logoutAuth = () => {
  removeAuth()
  window.location.href = `${process.env.REACT_APP_SSO_LOGOUT_URL}`
    + `?redirect_uri=${process.env.REACT_APP_SSO_AUTHORIZE_ENDPOINT}`
    + `%3Fresponse_type%3D${process.env.REACT_APP_SSO_RESPONSE_TYPE}`
    + `%26scope%3D${process.env.REACT_APP_SSO_SCOPE}`
    + `%26redirect_uri%3D${process.env.REACT_APP_SSO_REDIRECT_URI}`
    + `%26client_id%3D${process.env.REACT_APP_SSO_CLIENT_ID}`
}

const handleError = (error: AxiosError<ResponseModel>): Promise<AxiosError<ResponseModel>> => {
  const { isAxiosError, response } = error

  if (isAxiosError) {
    switch (response?.status) {
      case RESPONSE_STATUS_CODE.UNAUTHORIZED:
        logoutAuth()
        break
      case RESPONSE_STATUS_CODE.BAD_REQUEST:
      case RESPONSE_STATUS_CODE.FORBIDDEN:
      case RESPONSE_STATUS_CODE.NOT_FOUND:
      case RESPONSE_STATUS_CODE.METHOD_NOT_ALLOWED:
      case RESPONSE_STATUS_CODE.CONFLICT:
      case RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR:
      case RESPONSE_STATUS_CODE.BAD_GATEWAY:
        break
      default:
        break
    }
  }

  return Promise.reject(error)
}

export function setupAxios(axios: any) {
  axios.defaults.timeout = 15000
  axios.defaults.headers.common = {
    Accept: 'application/json',
    "Accept-Language": "vi",
  }
  axios.interceptors.request.use(handleRequest, handleError)
  axios.interceptors.response.use(handleResponse, handleError)
}

const setCurrentUser = (auth: any) => {
  const currentUser = auth ? {...auth} : {};
  const deleteArray = ["iss", "tenant", "iat", "azp", "aud", "exp"]

  for (const prop of deleteArray) {
    delete currentUser[prop];
  }

  localStorageItem.set(KEY_LOCALSTORAGE.CURRENT_USER, currentUser);
}

export { getAuth, setAuth, removeAuth, setSubMenu, logoutAuth, setCurrentUser, AUTH_LOCAL_STORAGE_KEY }