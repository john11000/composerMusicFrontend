import { Autocomplete, Button, FormControl, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { User } from '../models/Invoices.type';
import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import { useCustomersContext } from '@/features/customers/context/Customers.context';
import { Add } from '@mui/icons-material';
import useGetCustomers from '@/features/customers/hooks/useGetCustomers';
import { ICustomers } from '@/features/customers/models/Customers.type';

type props = {
  control: Control<User>;
  watch: UseFormWatch<User>;
  setValue: UseFormSetValue<User>;
};

export const InvoicesEditDialogCustumer: React.FC<props> = ({ control, watch, setValue }) => {
  const {
    customerToEdit,
    setCustomerToEdit,
    openEditCustomerDialog,
    setIsEdit,
    setTitleCustomerDialog,
    isEditCustomer,
    setIsFromExternal,
  } = useCustomersContext();
  const { getCustomers: getcustomersFromApi } = useGetCustomers();
  const [customers, setcustomers] = useState<ICustomers[]>([]);
  const getcustomers = async () => {
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

  useEffect(() => {
    getcustomers();
    if (watchIdentificationNumber) {
      setDefaultValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchIdentificationNumber = watch('drpSelectCustomer');

  const createNewCustomer = () => {
    setCustomerToEdit(undefined);
    setTitleCustomerDialog('Crear cliente');
    setIsEdit(false);
    setIsFromExternal(true);
    openEditCustomerDialog();
  };

  useEffect(() => {
    setDefaultValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchIdentificationNumber]);

  const setDefaultValues = () => {
    if (customerToEdit || watchIdentificationNumber) {
      if (watchIdentificationNumber) {
        const customerSelected = customers.find(
          (customer) => customer.id.toString() === watchIdentificationNumber.value
        );
        if (customerSelected) {
          setCustomerToEdit(customerSelected);
        } else {
          setCustomerToEdit(customerToEdit);
        }
      }
    }
  };

  useEffect(() => {
    if (customerToEdit?.identificationNumber) {
      setValue('drpSelectCustomer', {
        id: 0,
        value: customerToEdit?.id?.toString() || '',
        label: customerToEdit?.identificationNumber.toString(),
      });
      setDefaultValues();
      getcustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerToEdit]);

  return (
    <Container>
      <form>
        <Grid container spacing={2} width="100%" margin="auto" minHeight="200px">
          <Grid item xs={12} md={4}>
            <Controller
              name="drpSelectCustomer"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              defaultValue={customerToEdit?.drpSelectCustomer}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  disabled={!isEditCustomer}
                  options={customers.map((distributor: ICustomers, index: number) => {
                    return {
                      id: index,
                      value: distributor.id.toString(),
                      label: distributor.identificationNumber.toString(),
                    };
                  })}
                  onChange={(event, newValue) => {
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
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.firstName}
                    variant="outlined"
                    label="Nombre"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.address}
                    variant="outlined"
                    size="small"
                    label="Dirección"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.neighborhood}
                    variant="outlined"
                    size="small"
                    label="Barrio"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.phone}
                    variant="outlined"
                    size="small"
                    label="Telefono principal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.optionalPhone}
                    variant="outlined"
                    size="small"
                    label="Telefono opcional"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    disabled
                    value={customerToEdit?.addressDescription}
                    variant="outlined"
                    size="small"
                    label="Guía-Ubicación"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Container>
  );
};
