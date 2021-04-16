import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import PermanentDrawerLeft from "./PostList";
import ComplexGrid from "./Grid";

const buyerManagement = () => {
  return (
    <div>
      <ComplexGrid />
      <PermanentDrawerLeft />
    </div>
  );
};

export default buyerManagement;
