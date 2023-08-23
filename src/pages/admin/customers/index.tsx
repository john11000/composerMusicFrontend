import { AdminLayout } from '@/features/commons';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAppBarTitle } from '@/redux/slices/app.slice';
import CustomersContainer from '@/features/customers/containers/CustomersContainer';
import { CustomersProvider } from '@/features/customers/context/Customers.context';
import { InvoicesProvider } from '@/features/invoices/context/Invoices.context';
import { DistributorsProvider } from '@/features/distributor/context/Distributors.context';

export default function CustomersPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle('Clientes'));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <CustomersProvider>
        <InvoicesProvider>
          <DistributorsProvider>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <CustomersContainer />
              </Grid>
            </Grid>
          </DistributorsProvider>
        </InvoicesProvider>
      </CustomersProvider>
    </AdminLayout>
  );
}
