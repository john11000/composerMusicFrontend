import { AdminLayout } from '@/features/commons';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAppBarTitle } from '@/redux/slices/app.slice';
import InvoicesContainer from '@/features/invoices/containers/InvoicesContainer';
import { TITLE_MODULE_INVOICES } from '@/constants/title.constants';
import { CustomersProvider } from '@/features/customers/context/Customers.context';

export default function InvoicesPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_INVOICES));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <CustomersProvider>
            <InvoicesContainer />
          </CustomersProvider>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
