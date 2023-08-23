import { AdminLayout } from '@/features/commons';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAppBarTitle } from '@/redux/slices/app.slice';
import ServicesContainer from '@/features/Services/containers/ServicesContainer';
import { TITLE_MODULE_SERVICES } from '@/constants/title.constants';

export default function ServicesPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_SERVICES));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ServicesContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
