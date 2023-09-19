import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ServiceOrdersTable from "@/features/ServicesOrders/components/ServiceOrdersTable";
import ServiceOrdersEditDialog from "@/features/ServicesOrders/components/ServiceOrdersEditDialog";
import ServiceOrdersFilters from "@/features/ServicesOrders/components/ServiceOrdersFilters";
import useGetServiceOrders from "@/features/ServicesOrders/hooks/useGetServiceOrders";
import { IServiceOrders } from "@/features/ServicesOrders/models/ServiceOrders.type";
import ServiceOrdersSettings from "@/features/ServicesOrders/components/ServiceOrdersSettings";
import useGetRol from "@/hooks/useGetRol";
import { RolesEnum } from "@/models/roles.enum";
import {
  ICustomers,
  IDepartments,
} from "@/features/customers/models/Customers.type";
import CustomersEditDialog from "@/features/customers/components/CustomersEditDialog";
import useGetCustomers from "@/features/customers/hooks/useGetCustomers";
import useGetDepartaments from "@/hooks/useGetCities";
import { IServices } from "@/features/Services/models/Services.type";
import useGetServices from "@/features/Services/hooks/useGetServices";
import { IUser } from "@/features/users/models/users.type";
import useGetUsers from "@/features/users/hooks/useGetUsers";
import ServiceOrdersModal from "../components/ServiceOrdersModal";
import CreateInvoicesFromOrder from "../components/CreateInvoicesFromOrder";
import InvoicesEditDialog from "@/features/invoices/components/InvoicesEditDialog";
import CustomersDialogCreateServiceOrder from "../components/CreateServiceOrder";
import DistributorsEditDialog from "@/features/distributor/components/DistributorsEditDialog";

const ServicesOrdersContainer = () => {
  const role = useGetRol();
  const { getServiceOrders: getServiceOrdersFromApi, loading } =
    useGetServiceOrders();
  const { getCustomers: getcustomersFromApi } = useGetCustomers();
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();
  const { getServices: getServicesFromApi } = useGetServices();
  const { getUsers: getUsersFromApi } = useGetUsers();

  const [serviceOrders, setServiceOrders] = useState<IServiceOrders[]>([]);
  const [customers, setcustomers] = useState<ICustomers[]>([]);
  const [departments, setDepartments] = useState<IDepartments[]>([]);
  const [services, setServices] = useState<IServices[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const res = await getUsersFromApi();

      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getServices = async () => {
    try {
      const res = await getServicesFromApi();

      if (res.data) {
        setServices(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getServiceOrders = async () => {
    try {
      const res = await getServiceOrdersFromApi();

      if (res.data) {
        setServiceOrders(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomers = async () => {
    try {
      const res = await getcustomersFromApi();
      if (res.data) {
        setcustomers(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line prettier/prettier, no-console
      console.log(error);
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
    getServiceOrders();
    getCustomers();
    getDepartments();
    getServices();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {(role === RolesEnum.ADMINSTRADOR || role === RolesEnum.AUXILIAR) && (
        <ServiceOrdersSettings />
      )}
      <ServiceOrdersFilters />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ServiceOrdersTable serviceOrders={serviceOrders} loading={loading} />
        </Grid>
      </Grid>
      <CustomersDialogCreateServiceOrder />
      <InvoicesEditDialog />
      <CreateInvoicesFromOrder />
      <CustomersEditDialog
        getCustomers={getCustomers}
        departaments={departments}
        customers={customers}
      />
      <ServiceOrdersEditDialog
        getServiceOrders={getServiceOrders}
        customers={customers}
        getCustomers={getCustomers}
        services={services}
        getServices={getServices}
        users={users}
      />
      <ServiceOrdersModal users={users} />
      <DistributorsEditDialog />
    </Box>
  );
};

export default ServicesOrdersContainer;
