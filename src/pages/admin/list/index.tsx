import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_LIST_MELODY } from "@/constants/title.constants";
import ListContainer from "@/features/list/containers/ListContainer";

export default function ListPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_LIST_MELODY));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ListContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
