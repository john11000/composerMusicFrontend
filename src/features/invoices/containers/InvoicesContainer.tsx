import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import InvoicesTable from "@/features/invoices/components/InvoicesTable";
import InvoicesEditDialog from "@/features/invoices/components/InvoicesEditDialog";
import useGetInvoices from "@/features/invoices/hooks/useGetInvoices";
import { Iinvoices } from "@/features/invoices/models/Invoices.type";
import { InvoicesProvider } from "@/features/invoices/context/Invoices.context";
import InvoicesSettings from "@/features/invoices/components/InvoicesSettings";
import InvoicesFilters from "@/features/invoices/components/InvoicesFilters";
import InvoicesDetails from "@/features/invoices/components/InvoicesDetails";
import useGetCustomers from "@/features/customers/hooks/useGetCustomers";
import CustomersEditDialog from "@/features/customers/components/CustomersEditDialog";
import {
  ICustomers,
  IDepartments,
} from "@/features/customers/models/Customers.type";
import useGetDepartaments from "@/hooks/useGetCities";
import { DistributorsProvider } from "@/features/distributor/context/Distributors.context";
import DistributorsEditDialog from "@/features/distributor/components/DistributorsEditDialog";
import { CustomersProvider } from "@/features/customers/context/Customers.context";

const InvoicesContainer = () => {
  const { getInvoices: getInvoicesFromApi, loading } = useGetInvoices();
  const { getCustomers: getCustomersFromApi } = useGetCustomers();
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();
  const [invoices, setInvoices] = useState<Iinvoices[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [customers, setCustomers] = useState<ICustomers[]>([]);
  const [departments, setDepartments] = useState<IDepartments[]>([]);

  const getInvoices = async () => {
    try {
      const res = await getInvoicesFromApi();

      if (res.data) {
        setInvoices(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await getCustomersFromApi();

      if (res.data) {
        setCustomers(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartments = async () => {
    try {
      const res = await getDepartamentsFromApi();

      if (res.data) {
        setDepartments(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoices();
    getCustomers();
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InvoicesProvider>
      <CustomersProvider>
        <DistributorsProvider>
          <InvoicesSettings />
          <InvoicesFilters
            setInvoices={setInvoices}
            getInvoices={getInvoices}
          />
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <InvoicesTable invoices={invoices} loading={loading} />
            </Grid>
          </Grid>
          <CustomersEditDialog
            getCustomers={getCustomers}
            departaments={departments}
            customers={customers}
          />
          <InvoicesEditDialog />
          <InvoicesDetails />
          <DistributorsEditDialog />
        </DistributorsProvider>
      </CustomersProvider>
    </InvoicesProvider>
  );
};

export default InvoicesContainer;
