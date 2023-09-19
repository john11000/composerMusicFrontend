import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomersTable from "@/features/customers/components/CustomersTable";
import useGetCustomers from "@/features/customers/hooks/useGetCustomers";
import useGetDepartments from "@/hooks/useGetCities";
import CustomersSettings from "@/features/customers/components/CustomersSettings";
import CustomersEditDialog from "@/features/customers/components/CustomersEditDialog";
import {
  ICustomers,
  IDepartments,
} from "@/features/customers/models/Customers.type";
import InvoicesEditDialog from "@/features/invoices/components/InvoicesEditDialog";
import DistributorsEditDialog from "@/features/distributor/components/DistributorsEditDialog";
import CustomersDialogCreateInvoice from "../components/CustomersDialogCreateInvoice";

const CustomersContainer = () => {
  const { getCustomers: getCustomersFromApi, loading } = useGetCustomers();
  const { getDepartaments: getDepartmentsFromApi } = useGetDepartments();
  const [customers, setCustomers] = useState<ICustomers[]>([]);
  const [departments, setDepartments] = useState<IDepartments[]>([]);

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
      const res = await getDepartmentsFromApi();
      if (res.data) {
        setDepartments(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomers();
    getDepartments();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <CustomersSettings />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <CustomersTable
            customers={customers}
            loading={loading}
            departaments={departments}
          />
        </Grid>
      </Grid>
      <CustomersEditDialog
        getCustomers={getCustomers}
        departaments={departments}
        customers={customers}
      />
      <CustomersDialogCreateInvoice />
      <InvoicesEditDialog />
      <DistributorsEditDialog />
    </Box>
  );
};

export default CustomersContainer;
