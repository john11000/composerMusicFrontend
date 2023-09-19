import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";

import { AdminLayout } from "@/features/commons";
import FaultCausalsContainer from "@/features/faultCausal/containers/FaultCausalsContainer";
import { TITLE_MODULE_FAULT_CAUSAL } from "@/constants/title.constants";

const FaultCausalsPage: React.FC = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_FAULT_CAUSAL));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <FaultCausalsContainer />
    </AdminLayout>
  );
};

export default FaultCausalsPage;
