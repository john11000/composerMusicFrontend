import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Button,
} from "@mui/material";
// import { Container } from '@mui/system';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";
import { useCustomersContext } from "@/features/customers/context/Customers.context";
import { ICustomers } from "@/features/customers/models/Customers.type";
import { Add } from "@mui/icons-material";
import ServiceInvoicesReferencesTableEditDialog from "./ServiceInvoicesReferencesTableEditDialog";
import { IServices } from "@/features/Services/models/Services.type";
import { IUser } from "@/features/users/models/users.type";
import { IServiceOrders } from "../models/ServiceOrders.type";
import {
  Iinvoices,
  InvoiceItems,
} from "@/features/invoices/models/Invoices.type";
import { IFaultCausals } from "@/features/faultCausal/models/FaultCausals.type";
import useGetFaultCausals from "@/features/faultCausal/hooks/useGetFaultCausals";
import { useInvoicesContext } from "@/features/invoices/context/Invoices.context";

type props = {
  register: UseFormRegister<IServiceOrders>;
  errors: FieldErrors<IServiceOrders>;
  control: Control<IServiceOrders>;
  watch: UseFormWatch<IServiceOrders>;
  customers: ICustomers[];
  getCustomers: () => void;
  setValue: UseFormSetValue<IServiceOrders>;
  services: IServices[];
  getServices: () => void;
  users: IUser[];
  selectedReferences: InvoiceItems[];
  setSelectedReferences: Dispatch<SetStateAction<InvoiceItems[]>>;
};

export const ServiceOrdersFormEdit: React.FC<props> = ({
  control,
  watch,
  customers,
  getCustomers,
  register,
  setValue,
  services,
  users,
  selectedReferences,
  setSelectedReferences,
}) => {
  const [filteredInvoices, setFilteredInvoices] = useState<Iinvoices[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItems[]>([]);
  const [failures, setFailures] = useState<IFaultCausals[]>([]);

  const {
    customerToEdit,
    setCustomerToEdit,
    setTitleCustomerDialog,
    setIsFromExternal,
    openEditCustomerDialog,
    setOpenModalCreateInvoice,
    setIsEdit,
  } = useCustomersContext();

  const {
    customerIdentification,
    setCustomerIdentification,
    getInvoices,
    invoices,
  } = useInvoicesContext();

  const { getFaultCausals: getFaultCausalsFromApi } = useGetFaultCausals();

  const getFaultCausals = async () => {
    try {
      const res = await getFaultCausalsFromApi();

      if (res.data) {
        setFailures(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createNewCustomer = () => {
    setCustomerToEdit(undefined);
    setTitleCustomerDialog("Crear cliente");
    setIsEdit(false);
    setIsFromExternal(true);
    openEditCustomerDialog();
  };

  const watchIdentificationNumber = watch("drpSelectCustomer");

  const filterInvoices = (id: string) => {
    setFilteredInvoices(
      invoices.filter(
        (invoice) => invoice.customer?.identificationNumber === id
      )
    );
  };

  const setDefaultValues = () => {
    if (customerToEdit || watchIdentificationNumber) {
      if (watchIdentificationNumber) {
        const customerSelected = customers.find(
          (customer) =>
            customer.id.toString() === watchIdentificationNumber.value ||
            customerIdentification
        );

        if (customerSelected) {
          setCustomerToEdit(customerSelected);
          setValue(
            "identificationNumber",
            customerSelected.identificationNumber
          );
          setValue("firstName", customerSelected.firstName);
          setValue("lastName", customerSelected.lastName);
          setValue("address", customerSelected.address);
          setValue("phone", customerSelected.phone);
          setValue("departmentId", customerSelected.departmentId.toString());
          setValue("cityId", customerSelected.cityId);
          setValue("email", customerSelected.email);
          setValue("optionalPhone", customerSelected.optionalPhone);
          setValue("neighborhood", customerSelected.neighborhood);
          setValue("addressDescription", customerSelected.addressDescription);
          setValue("id", customerSelected.id);
        } else {
          setCustomerToEdit(customerToEdit);
        }
      }
    }
  };

  useEffect(() => {
    getFaultCausals();
    getCustomers();
    getInvoices();
    setCustomerToEdit(undefined);
    if (watchIdentificationNumber) {
      setDefaultValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const customerSelected = customers.find(
      (customer) => customer.id.toString() === customerIdentification
    );
    if (customerIdentification != "") {
      const drpCustomer = {
        id: customers.findIndex(
          (customer) => customer.id.toString() === customerIdentification
        ),
        value: customerSelected?.id.toString() ?? "",
        label: customerSelected?.identificationNumber.toString() ?? "",
      };
      setValue("drpSelectCustomer", drpCustomer);
      if (customerSelected) {
        setValue("identificationNumber", customerSelected.identificationNumber);
        setValue("firstName", customerSelected.firstName);
        setValue("lastName", customerSelected.lastName);
        setValue("address", customerSelected.address);
        setValue("phone", customerSelected.phone);
        setValue("departmentId", customerSelected.departmentId.toString());
        setValue("cityId", customerSelected.cityId);
        setValue("email", customerSelected.email);
        setValue("optionalPhone", customerSelected.optionalPhone);
        setValue("neighborhood", customerSelected.neighborhood);
        setValue("addressDescription", customerSelected.addressDescription);
        setValue("id", customerSelected.id);
      }
      filterInvoices(customerSelected?.identificationNumber.toString() ?? "");
      setCustomerIdentification("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerIdentification]);

  useEffect(() => {
    if (customerToEdit != undefined) {
      filterInvoices(customerToEdit.identificationNumber ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerToEdit]);

  useEffect(() => {
    if (customerToEdit != undefined) {
      filterInvoices(customerToEdit.identificationNumber ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices]);

  useEffect(() => {
    setInvoiceItems(
      filteredInvoices.flatMap((invoice) => invoice.invoiceItems)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredInvoices]);

  useEffect(() => {
    if (invoiceItems.length === 0 && watchIdentificationNumber) {
      setOpenModalCreateInvoice(true);
    }
    if (invoiceItems.length > 0 && watchIdentificationNumber) {
      setOpenModalCreateInvoice(false);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceItems]);

  useEffect(() => {
    if (customerIdentification == "") {
      setDefaultValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchIdentificationNumber]);

  return (
    <Grid container spacing={2} width="100%" margin="auto" minHeight="200px">
      <Grid item xs={12} md={3}>
        <Controller
          name="drpSelectCustomer"
          control={control}
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              fullWidth
              options={customers.map(
                (distributor: ICustomers, index: number) => {
                  return {
                    id: index,
                    value: distributor.id.toString(),
                    label: distributor.identificationNumber.toString(),
                  };
                }
              )}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              value={value || null}
              size="small"
              renderInput={(params) => (
                <TextField
                  error={Boolean(error?.message)}
                  variant="outlined"
                  helperText={error?.message}
                  {...params}
                  label="NIT"
                  size="small"
                />
              )}
            />
          )}
        />
        {!watchIdentificationNumber && (
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            fullWidth
            onClick={() => createNewCustomer()}
          >
            Crear nuevo cliente
          </Button>
        )}
      </Grid>
      {watchIdentificationNumber && (
        <>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.firstName}
                variant="outlined"
                label="Nombres"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                {...register("firstName", { required: FIELD_REQUIRED_MESSAGE })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.lastName}
                variant="outlined"
                label="Apellidos"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                {...register("lastName", { required: FIELD_REQUIRED_MESSAGE })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.address}
                variant="outlined"
                size="small"
                label="Dirección"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("address", { required: FIELD_REQUIRED_MESSAGE })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.neighborhood}
                variant="outlined"
                size="small"
                label="Barrio"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("neighborhood", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.phone}
                variant="outlined"
                size="small"
                label="Teléfono principal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("phone", { required: FIELD_REQUIRED_MESSAGE })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.optionalPhone}
                variant="outlined"
                size="small"
                label="Teléfono opcional"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("optionalPhone")}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                defaultValue={customerToEdit?.addressDescription}
                variant="outlined"
                size="small"
                label="Guía-Ubicación"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("addressDescription")}
              />
            </FormControl>
          </Grid>

          <Grid container spacing={2} sx={{ marginY: "25px", margin: "auto" }}>
            <Grid item xs={12} sx={{ overflow: "auto", maxHeight: "500px" }}>
              <ServiceInvoicesReferencesTableEditDialog
                invoicesItems={invoiceItems}
                invoices={filteredInvoices}
                selectedReferences={selectedReferences}
                setSelectedReferences={setSelectedReferences}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginY: "25px", margin: "auto" }}>
            <Grid item xs={12} md={3}>
              <Controller
                name="drpSelectServices"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    fullWidth
                    options={services.map(
                      (services: IServices, index: number) => {
                        return {
                          id: index,
                          value: services.id.toString(),
                          label: services.name + " - " + services.description,
                        };
                      }
                    )}
                    onChange={(_, newValue) => {
                      onChange(newValue);
                    }}
                    value={value || null}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(error?.message)}
                        variant="outlined"
                        helperText={error?.message}
                        {...params}
                        label="Tipo de servicio"
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Controller
                name="drpSelectFailure"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    fullWidth
                    options={failures.map(
                      (failures: IFaultCausals, index: number) => {
                        return {
                          id: index,
                          value: failures.id.toString(),
                          label: failures.cause + " - " + failures.description,
                        };
                      }
                    )}
                    onChange={(_, newValue) => {
                      onChange(newValue);
                    }}
                    value={value || null}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(error?.message)}
                        variant="outlined"
                        helperText={error?.message}
                        {...params}
                        label="Tipo de falla y causal"
                        size="small"
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Controller
                  name="drpSelectTecnic"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      fullWidth
                      options={users
                        .filter((user: IUser) => user.roleId === 3)
                        .map((user: IUser, index: number) => {
                          return {
                            id: index,
                            value: user.id.toString(),
                            label: user.identificationNumber,
                          };
                        })}
                      onChange={(_, newValue) => {
                        onChange(newValue);
                      }}
                      value={value || null}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          label="Tecnico asignado"
                          size="small"
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};
