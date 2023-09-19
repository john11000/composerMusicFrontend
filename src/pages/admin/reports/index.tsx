import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_REPORTS } from "@/constants/title.constants";
import ReportsContainer from "@/features/reports/containers/ReportsContainer";

export default function ServicesPage() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_REPORTS));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ReportsContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
