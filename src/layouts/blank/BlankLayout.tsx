import React, { Suspense } from "react";
import frontendRoutes from "../../shared/routes/frontendRoutes";

import { Routes, Route } from "react-router-dom";

import Progress from "@mui/material/CircularProgress";
import Header from "./Header";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Progress />}>
        <Routes>
          {Array.isArray(frontendRoutes) &&
            frontendRoutes?.map(({ path, component, hasChildren }, i) => (
              <Route
                key={path + i}
                path={hasChildren ? `${path}/*` : path}
                element={component}
              />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default BlankLayout;

//tsrsfc
