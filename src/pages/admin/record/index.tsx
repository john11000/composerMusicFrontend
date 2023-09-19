import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import ReferencesContainer from "@/features/reference/containers/ReferencesContainer";
import { TITLE_MODULE_RECORD_MELODY } from "@/constants/title.constants";

export default function RecordPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_RECORD_MELODY));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center" alignContent="center" alignItems="center">
        <Grid item xs={12} justifyContent="center" alignContent="center" alignItems="center" sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "100px",
        }}>
          <Button variant="contained" sx={{
            width: "100px",
          }}>Grabar</Button>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignContent="center" alignItems="center" sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: "25px",
        }}>
          <Button variant="contained" sx={{
            width: "100px",
          }}>Detener</Button>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
