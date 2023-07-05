import * as React from "react";

import { Routes, Route } from "react-router-dom";
import DestinationListing from "./DestinationListing";
import AddEditDestination from "./AddEditDestination";

interface IDestinationMasterProps {}

const DestinationMaster: React.FunctionComponent<IDestinationMasterProps> = (
  props
) => {
  return (
    <>
      <Routes>
        <Route path="" element={<DestinationListing />} />
        <Route
          path="add-edit/:operation/:id"
          element={<AddEditDestination />}
        />
      </Routes>
    </>
  );
};

export default DestinationMaster;
