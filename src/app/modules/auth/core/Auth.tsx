import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel,UserModelLogin} from './_models'
import * as authHelper from './AuthHelpers'
import {sendTokenRequest} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {localStorageItem} from "../../utils/LocalStorage";
import jwt_decode from "jwt-decode";
import {AUTHORIZE_REQUEST, KEY_LOCALSTORAGE} from "./_consts";

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel |UserModelLogin| undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel |UserModelLogin| undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | UserModelLogin | undefined>()

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {      
      authHelper.setAuth(auth)
    } else {
      authHelper.logoutAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const { auth, saveAuth } = useAuth();
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const requestUser = async (auth: AuthModel) => {
      try {
        if (!didRequest.current) {
          const idTokenDecode = await jwt_decode(auth?.id_token) as {
            authorities: string[],
          }
          const accessTokenDecode = await jwt_decode(auth?.access_token) as {
            scope: string[],
          }

          if (idTokenDecode || accessTokenDecode) {
            try {
              localStorageItem.set(KEY_LOCALSTORAGE.ID_TOKEN_DECODE, idTokenDecode)
              localStorageItem.set(KEY_LOCALSTORAGE.ACCESS_TOKEN_DECODE, accessTokenDecode)
              if (idTokenDecode?.authorities) {
                const permissionObj: { [key: string]: boolean; } = {};
                for (const permission of idTokenDecode.authorities) {
                  permissionObj[permission] = true;
                }
                localStorageItem.set(KEY_LOCALSTORAGE.AUTHORITIES, permissionObj)
              }
            } catch {

            } finally {
              authHelper.setSubMenu();
              authHelper.setCurrentUser(idTokenDecode);
            }
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          window.location.href = AUTHORIZE_REQUEST
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (process.env.REACT_APP_SSO_ENABLE === "true") {
      if (code && !auth) {
        sendTokenRequest(code).then((resAuth) => {
          saveAuth(resAuth);
          requestUser(resAuth);
        })
        .catch(() => {
          window.location.href = AUTHORIZE_REQUEST
        })
      } else if (!auth) {
        window.location.href = AUTHORIZE_REQUEST
      } else {
        requestUser(auth);
      }
    } else {
      if (auth && auth.access_token) {
        requestUser(auth)
      } else {
        debugger
        window.location.href = AUTHORIZE_REQUEST
      }
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
