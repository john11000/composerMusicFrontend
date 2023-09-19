import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import UsersContainer from "@/features/users/containers/UsersContainer";
import { TITLE_MODULE_USERS } from "@/constants/title.constants";

export default function UsersPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_USERS));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <UsersContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
