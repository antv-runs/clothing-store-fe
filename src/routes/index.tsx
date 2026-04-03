/**
 * Application routes and router setup
 * Centralizes all routing logic under a single component
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/templates/MainLayout";
import { routeConfig } from "@/routes/routeConfig";

/**
 * AppRoutes component
 * Sets up the router and renders all application routes within a shared layout
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routeConfig.map((route, index) => {
            const Element = route.element;
            return (
              <Route key={index} path={route.path} element={<Element />} />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
