import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { AUTHORITIES, PATH_ROUTES, PERMISSIONS, REDIRECT_PATH } from "../Constant";
import { hasAccessAuthority } from "../modules/utils/FunctionUtils";
import { Dashboard } from "../dashboard/Dashboard";
import { HomePage } from "../homepage/HomePage";

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
      <Route path="/*" element={<Dashboard />} />
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
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to={REDIRECT_PATH.NOT_FOUND}/>} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };

