import { AdminLayout } from "@/features/commons";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_SERVICE_ORDERS } from "@/constants/title.constants";
import ServicesOrdersContainer from "@/features/ServicesOrders/containers/ServicesOrdersContainer";
import { CustomersProvider } from "@/features/customers/context/Customers.context";
import { ServiceOrdersProvider } from "@/features/ServicesOrders/context/ServiceOrders.context";
import { InvoicesProvider } from "@/features/invoices/context/Invoices.context";
import { DistributorsProvider } from "@/features/distributor/context/Distributors.context";

export default function ServicesPage() {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_SERVICE_ORDERS));
  }, [dispatcher]);

  return (
    <AdminLayout>
      <CustomersProvider>
        <ServiceOrdersProvider>
          <DistributorsProvider>
            <InvoicesProvider>
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <ServicesOrdersContainer />
                </Grid>
              </Grid>
            </InvoicesProvider>
          </DistributorsProvider>
        </ServiceOrdersProvider>
      </CustomersProvider>
    </AdminLayout>
  );
}
