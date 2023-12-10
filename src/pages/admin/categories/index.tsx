import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_CATEGORIES } from "@/constants/title.constants";
import CategoriesContainer from "@/features/categories/containers/CategoriesContainer";

export default function CategoryPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_CATEGORIES));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <CategoriesContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}