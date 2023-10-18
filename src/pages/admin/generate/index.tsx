import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_GENERATE_MELODY } from "@/constants/title.constants";
import GenerateContainer from "@/features/generate/containers/GenerateContainer";

export default function GeneratePage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_GENERATE_MELODY));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <GenerateContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
