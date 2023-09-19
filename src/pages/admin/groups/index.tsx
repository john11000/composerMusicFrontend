import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import GroupsContainer from "@/features/groups/containers/GroupsContainer";
import { TITLE_MODULE_GROUPS } from "@/constants/title.constants";

export default function GroupsPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_GROUPS));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <GroupsContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
