import {
  FormControl,
  Grid,
  TextField,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Autocomplete,
  AutocompleteRenderInputParams,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Controller, UseFormGetValues, useForm } from 'react-hook-form';
import { useInvoicesContext } from '../context/Invoices.context';
import { Iinvoices, InvoiceItems } from '../models/Invoices.type';
import { FIELD_REQUIRED_MESSAGE, FIELD_TELEFONO_MESSAGE } from '@/constants/app.constants';
import InvoicesTableReferences from './InvoicesTableReferences';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { IReferences } from '@/features/reference/models/References.type';
import useGetReferences from '@/features/reference/hooks/useGetReferences';
import { IGroups } from '@/features/groups/models/Groups.type';
import useGetGroups from '@/features/groups/hooks/useGetGroups';
import { City, IDepartments } from '@/features/customers/models/Customers.type';
import { CalculateWarrantyDays } from '../helpers/CalculateWarrantyDays';
import useGetDepartaments from '@/hooks/useGetCities';
import { formatAddress } from '../helpers/formatAddress';

type props = {
  getValues: UseFormGetValues<Iinvoices>;
};

export const InvoicesEditDialogReferences: React.FC<props> = ({ getValues: getValuesGlobal }) => {
  const { isEdit, invoiceToEdit, setInvoiceToEdit } = useInvoicesContext();
  const [invoicesItem, setInvoicesItem] = React.useState<InvoiceItems[]>([]);
  const [References, setReferences] = useState<IReferences[]>([]);
  const { getReferences: getReferencesFromApi } = useGetReferences();
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();
  const [departaments, setDepartaments] = useState<IDepartments[]>([]);
  const {
    reset,
    handleSubmit,
    control,
    register: registerLocal,
    watch,
    setValue,
    getValues,
    formState: { errors: errorsLocal },
  } = useForm<InvoiceItems>();
  const watchDepartament = watch('departamentDrp');
  const watchCityDrp = watch('cityDrp');
  const watchAuxDrp = watch('auxDrp');

  const { getGroups: getGroupsFromApi } = useGetGroups();
  const [Groups, setGroups] = useState<IGroups[]>([]);

  const getGroups = async () => {
    try {
      const res = await getGroupsFromApi();
      if (res.data) setGroups(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReferences = async () => {
    try {
      const res = await getReferencesFromApi();
      if (res.data) setReferences(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartaments = async () => {
    try {
      const res = await getDepartamentsFromApi();
      if (res.data) {
        setDepartaments(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveInvoice = (data: InvoiceItems[]) => {
    if (invoiceToEdit) {
      setInvoiceToEdit({
        ...invoiceToEdit,
        invoiceItems: data,
      });
    }
  };

  const handleSubmitReferences = async (data: InvoiceItems) => {
    let updatedInvoiceItems;
    // data.id = data.id || invoicesItem?.length + 1;
    data.productId = parseInt(data.auxDrp?.value || '') || 0;
    data.referenceCode = data.referenceCode?.split(' - ')[0];
    data.quantity = parseInt(data.quantity.toString());
    data.cityId = parseInt(data.cityDrp?.value ?? '0') || 0;
    data.address = formatAddress(data);
    if (invoicesItem) {
      updatedInvoiceItems = [...invoicesItem, data];
    } else {
      updatedInvoiceItems = [data];
    }
    setInvoicesItem(updatedInvoiceItems);
    saveInvoice(updatedInvoiceItems);
    reset();
  };

  useEffect(() => {
    getReferences();
    getDepartaments();
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getGroups();
    if (watchAuxDrp) {
      const reference = References.find((reference) => reference.id === parseInt(watchAuxDrp.value));
      if (reference) {
        const group = Groups.find((group) => group.id === reference.groupId);
        const daysWarranty = CalculateWarrantyDays(getValuesGlobal('dateOfPurchase'), reference.warrantyDays);
        setValue('referenceDescription', reference.referenceDescription);
        setValue('groupName', group?.name);
        setValue('warrantyDays', parseInt(daysWarranty.toString()));
        setValue('referenceCode', watchAuxDrp?.label || '');
      }
    } else {
      setValue('referenceDescription', '');
      setValue('warrantyDays', 0);
      setValue('referenceCode', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAuxDrp]);

  useEffect(() => {
    if (invoiceToEdit) setInvoicesItem(invoiceToEdit.invoiceItems);
  }, [invoiceToEdit]);

  useEffect(() => {
    if (
      watchDepartament === null ||
      (watchDepartament && watchCityDrp && watchDepartament?.value !== watchCityDrp?.departmentId)
    )
      setValue('cityDrp', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDepartament]);

  return (
    <Container>
      <form id="formReferences" name="formReferences" noValidate onSubmit={handleSubmit(handleSubmitReferences)}>
        <Grid container spacing={2} width="100%" margin="auto" minHeight="200px">
          <Grid item xs={12} md={3}>
            <Controller
              name="auxDrp"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  sx={{ position: 'relative', zIndex: 2 }}
                  options={References.map((reference: IReferences, index: number) => {
                    return {
                      id: index,
                      value: reference.id.toString(),
                      label: reference.referenceCode.toString() + ' - ' + reference.referenceDescription,
                    };
                  })}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                    setValue(
                      'unitValue',
                      References.filter((reference) => reference.id.toString() === newValue?.value ?? '')[0]
                        ?.publicPrice
                    );
                  }}
                  value={value || null}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      error={Boolean(error?.message)}
                      variant="outlined"
                      helperText={error?.message}
                      {...params}
                      size="small"
                      label="Referencia"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                disabled
                required
                error={!!errorsLocal.referenceDescription}
                helperText={errorsLocal.referenceDescription?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Descripción referencia"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('referenceDescription', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                disabled
                required
                error={!!errorsLocal.groupName}
                helperText={errorsLocal.groupName?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Grupo"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('groupName', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                disabled
                required
                type="number"
                error={!!errorsLocal.warrantyDays}
                helperText={errorsLocal.warrantyDays?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Garantía(Dias)"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('warrantyDays', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                required
                type="number"
                min="0"
                error={!!errorsLocal.quantity}
                helperText={errorsLocal.quantity?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Cantidad"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('quantity', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errorsLocal.serial}
                helperText={errorsLocal.serial?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Serial"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('serial', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="departamentDrp"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  sx={{ position: 'relative', zIndex: 2 }}
                  options={departaments.map((depart: IDepartments, index: number) => {
                    return {
                      id: index,
                      value: depart.id.toString(),
                      label: depart.name,
                    };
                  })}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  value={value || null}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      error={Boolean(error?.message)}
                      variant="outlined"
                      helperText={error?.message}
                      {...params}
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Departamento"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Controller
              name="cityDrp"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                  disablePortal
                  fullWidth
                  clearOnEscape
                  sx={{ position: 'relative', zIndex: 2 }}
                  options={departaments[watchDepartament?.id || 0]?.cities?.map((city: City, index: number) => {
                    return {
                      id: index,
                      value: city.id.toString(),
                      label: city.name,
                    };
                  })}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  value={value || null}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      error={Boolean(error?.message)}
                      variant="outlined"
                      helperText={error?.message}
                      {...params}
                      size="small"
                      label="Ciudad"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errorsLocal.principalPhone}
                helperText={errorsLocal.principalPhone?.message}
                label="Teléfono principal"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('principalPhone', {
                  required: {
                    value: true,
                    message: FIELD_REQUIRED_MESSAGE,
                  },
                  pattern: {
                    value: /^[0-9+]+$/i,
                    message: FIELD_TELEFONO_MESSAGE,
                  },
                })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errorsLocal.neighborhood}
                helperText={errorsLocal.neighborhood?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                label="Barrio"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('neighborhood', { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={6} spacing={1}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="street-or-carrera-label">Tipo de Dirección</InputLabel>
                <Select
                  labelId="street-or-carrera-label"
                  label="Tipo de Dirección"
                  variant="outlined"
                  size="small"
                  inputProps={{
                    shrink: true,
                  }}
                  error={!!errorsLocal.typeLocation}
                  {...registerLocal('typeLocation', { required: FIELD_REQUIRED_MESSAGE })}
                  defaultValue={getValues('typeLocation') || 'Calle'}
                >
                  <MenuItem value="Autopista">Autopista</MenuItem>
                  <MenuItem value="Avenida">Avenida</MenuItem>
                  <MenuItem value="Calle">Calle</MenuItem>
                  <MenuItem value="Carrera">Carrera</MenuItem>
                  <MenuItem value="Diagonal">Diagonal</MenuItem>
                </Select>
                <FormHelperText error={!!errorsLocal.typeLocation}>{errorsLocal.typeLocation?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  error={!!errorsLocal.locationNumber}
                  helperText={errorsLocal.locationNumber && FIELD_REQUIRED_MESSAGE}
                  label={getValues('typeLocation')?.length < 5 ? 'Calle' : getValues('typeLocation')}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...registerLocal('locationNumber', { required: true })}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
              <FormControl fullWidth>
                <TextField
                  required
                  error={!!errorsLocal.numberLocation}
                  helperText={errorsLocal.numberLocation && FIELD_REQUIRED_MESSAGE}
                  label="#Numero"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...registerLocal('numberLocation', { required: true })}
                />
              </FormControl>
              <div style={{ fontWeight: 'bolder', lineHeight: '39px', margin: '0px 5px' }}>-</div>
              <FormControl fullWidth>
                <TextField
                  required
                  error={!!errorsLocal.secondNumberLocation}
                  helperText={errorsLocal.secondNumberLocation && FIELD_REQUIRED_MESSAGE}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...registerLocal('secondNumberLocation', { required: true })}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                error={!!errorsLocal.location}
                helperText={errorsLocal.location?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                label="Guía-Ubicación"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('location', { required: false })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                label="Contacto"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('contact')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                error={!!errorsLocal.optionalPhone}
                helperText={errorsLocal.optionalPhone?.message}
                label="Teléfono opcional"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                {...registerLocal('optionalPhone', {
                  pattern: {
                    value: /^[0-9+]+$/i,
                    message: FIELD_TELEFONO_MESSAGE,
                  },
                })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} justifyContent="center">
            <FormControl fullWidth error={!!errorsLocal.isActive}>
              <FormControlLabel
                control={<Checkbox defaultChecked={true} {...registerLocal('isActive')} />}
                label={watch('isActive') ? 'Estado activo' : 'Estado inactivo'}
              />
              <FormHelperText error>{errorsLocal.isActive?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              loading={false}
              loadingPosition="start"
              startIcon={<Add />}
              form="formReferences"
            >
              Agregar
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <InvoicesTableReferences
              invoicesItem={invoicesItem}
              setInvoicesItem={setInvoicesItem}
              setValue={setValue}
              saveInvoice={saveInvoice}
            ></InvoicesTableReferences>
          </Grid>

          {isEdit && <Grid item xs={12} md={3}></Grid>}
        </Grid>
      </form>
    </Container>
  );
};
