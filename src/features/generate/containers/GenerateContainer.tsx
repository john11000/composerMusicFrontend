import React, { useEffect, useState } from "react";
import { GroupsProvider } from "@/features/groups/context/Groups.context";
import { GenerateFormComponent } from "../components/GenerateFormComponent";
import { Paper } from "@material-ui/core";

const GenerateContainer = () => {
  return (
    <GroupsProvider>
      <GenerateFormComponent />
    </GroupsProvider>
  );
};

export default GenerateContainer;
