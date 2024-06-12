import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { AUTHORITIES, PATH_ROUTES, PERMISSIONS, REDIRECT_PATH } from "../Constant";
import { hasAccessAuthority } from "../modules/utils/FunctionUtils";
import { Dashboard } from "../dashboard/Dashboard";
import { HomePage } from "../homepage/HomePage";
import KhamSkDinhKi from "../modules/kham-sk-dinh-ki/KhamSKDinhKi";
import DSKhamSkDinhKiChiTiet from "../modules/kham-sk-dinh-ki/component/DSKhamSKDinhKiChiTiet";
import HoSoKhamSKChiTiet from "../modules/kham-sk-dinh-ki/component/HoSoKhamSKChiTiet";

interface PrivateRouteProps {
  auth: string;
  ability: string;
  component: React.ComponentType<any>;
  redirect: string;
}

const PrivateRoutes = () => {
  const PrivateRoute: React.FC<PrivateRouteProps> = ({auth, ability, component: Component, redirect,}) => {
    return hasAccessAuthority(auth, ability) ? (<Component/>) : (<Navigate to={redirect}/>);
  };

  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" />} />
      {/* <Route path="/*" element={<Dashboard />} /> */}
      <Route element={<MasterLayout />}>
        {/* Pages */}
        <Route
          path={PATH_ROUTES.HOME + "/*"}
          element={
            <PrivateRoute
              auth={PERMISSIONS.ADMIN}
              ability={AUTHORITIES.USER.VIEW}
              component={HomePage}
              redirect={REDIRECT_PATH.HOME}
            />
          }
        />
        <Route
          path={PATH_ROUTES.TTNS}
          element={
            <PrivateRoute
              auth={PERMISSIONS.ADMIN}
              ability={AUTHORITIES.USER.VIEW}
              component={HomePage}
              redirect={REDIRECT_PATH.HOME}
            />
          }
        />

        <Route
          path={PATH_ROUTES.HSYT}
          element={
            <PrivateRoute
              auth={PERMISSIONS.ADMIN}
              ability={AUTHORITIES.USER.VIEW}
              component={KhamSkDinhKi}
              redirect={REDIRECT_PATH.HOME}
            />
          }
        >
        </Route>
        <Route path={PATH_ROUTES.HSYT + "/kham-sk-dinh-ki"} element={<KhamSkDinhKi />} />
        <Route path={PATH_ROUTES.HSYT + "/kham-sk-dinh-ki/:id"} element={<DSKhamSkDinhKiChiTiet />} />
        <Route path={PATH_ROUTES.HSYT + "/kham-sk-dinh-ki/:id/:id"} element={<HoSoKhamSKChiTiet />} />
        <Route path={PATH_ROUTES.HSYT + "/*"} element={<KhamSkDinhKi />} />

        <Route
          path={PATH_ROUTES.TTTC }
          element={
            <PrivateRoute
              auth={PERMISSIONS.ADMIN}
              ability={AUTHORITIES.USER.VIEW}
              component={HomePage}
              redirect={REDIRECT_PATH.HOME}
            />
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to={REDIRECT_PATH.NOT_FOUND}/>} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };

