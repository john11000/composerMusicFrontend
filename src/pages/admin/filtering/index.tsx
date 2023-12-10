import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_LIST_CATEGORY_MELODIES } from "@/constants/title.constants";
import ListContainerFavorites from "@/features/list/containers/ListContainerFavorites";

export default function FilteringPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_LIST_CATEGORY_MELODIES));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ListContainerFavorites />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}