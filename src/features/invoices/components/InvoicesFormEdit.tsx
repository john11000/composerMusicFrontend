import {
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Button,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useInvoicesContext } from '../context/Invoices.context';
import { EnumPlaceOfPurchase, Iinvoices } from '../models/Invoices.type';
import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import { IDistributors } from '@/features/distributor/models/Distributors.type';
import useGetDistributors from '@/features/distributor/hooks/useGetdDistributors';
import { MuiFileInput } from 'mui-file-input';
import { Tooltip, Typography } from '@material-ui/core';
import { AddCircleOutline } from '@mui/icons-material';
import { useDistributorsContext } from '@/features/distributor/context/Distributors.context';
import { formatISO, isBefore, isSameDay, parseISO, startOfDay } from 'date-fns';
import useGetRol from '@/hooks/useGetRol';
import { RolesEnum } from '@/models/roles.enum';

type props = {
  register: UseFormRegister<Iinvoices>;
  errors: FieldErrors<Iinvoices>;
  watch: UseFormWatch<Iinvoices>;
  control: Control<Iinvoices>;
  setValue: UseFormSetValue<Iinvoices>;
};

export const InvoicesFormEdit: React.FC<props> = ({ register, errors, watch, control, setValue: setValueForm }) => {
  const { isEdit, invoiceToEdit } = useInvoicesContext();
  const [Distributors, setDistributors] = useState<IDistributors[]>([]);
  const { getDistributors: getDistributorsFromApi } = useGetDistributors();
  const { openEditDistributorDialog, setTitleDistributorDialog, setIsEdit, distributorToEdit, setDistributorToEdit } =
    useDistributorsContext();
  const today = startOfDay(new Date());
  const formattedToday = formatISO(today, { representation: 'date' });
  // const fields = watch();
  const watchPlaceOfPurchase = watch('placeOfPurchase');
  const watchAuxDrpDistributor = watch('auxDrpDistributor');
  const watchdateOfPurchase = watch('dateOfPurchase');

  const [value, setValue] = useState<File | null>(null);
  const getDistributors = async () => {
    try {
      const res = await getDistributorsFromApi();
      if (res.data) {
        setDistributors(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDistributorBtn = () => {
    setIsEdit(false);
    setDistributorToEdit(undefined);
    setTitleDistributorDialog('Crear Distribuidor');
    openEditDistributorDialog();
  };

  useEffect(() => {
    if (distributorToEdit) {
      setValueForm('auxDrpDistributor', {
        id: distributorToEdit.id,
        value: distributorToEdit?.id?.toString(),
        label: distributorToEdit.name,
      });
      getDistributors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributorToEdit]);

  useEffect(() => {
    getDistributors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateDate = (value: string) => {
    const selectedDate = parseISO(value);
    if (isSameDay(selectedDate, today) === false) {
      const isValid = isBefore(selectedDate, today) || isSameDay(selectedDate, today); // Permitir fechas igual o posteriores al día actual
      if (!isValid) {
        // const date = value?.substring(0, 10); // Extraer la fecha en formato "YYYY-MM-DD"
        setValueForm('dateOfPurchase', formattedToday); // Establecer la fecha de compra al día de hoy si no es válida
      }
      return isValid || 'La fecha de compra no puede ser posterior al día de hoy';
    }
  };

  useEffect(() => {
    validateDate(watchdateOfPurchase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchdateOfPurchase]);

  useEffect(() => {
    if (invoiceToEdit) {
      const date = invoiceToEdit?.dateOfPurchase?.substring(0, 10); // Extraer la fecha en formato "YYYY-MM-DD"
      setValueForm('dateOfPurchase', date);
      setValueForm('placeOfPurchase', invoiceToEdit?.placeOfPurchase);
      if (invoiceToEdit?.distributor) {
        setValueForm('auxDrpDistributor', {
          id: invoiceToEdit?.distributor?.id,
          value: invoiceToEdit?.distributor?.id?.toString(),
          label: invoiceToEdit?.distributor?.name || '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceToEdit]);

  // useEffect(() => {
  //   if (fields) {
  //     if (invoiceToEdit) {
  //       setInvoiceToEdit({
  //         ...invoiceToEdit,
  //         ...fields,
  //         dateOfPurchase: fields?.dateOfPurchase
  //           ? new Date(fields?.dateOfPurchase).toISOString()
  //           : new Date().toISOString(),
  //         distributorId: parseInt(fields?.auxDrpDistributor?.value || '0') || undefined,
  //       });
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fields]);

  return (
    <Container>
      <form>
        <Grid container spacing={2} width="100%" margin="auto" minHeight="200px">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.invoiceNumber}
                defaultValue={invoiceToEdit?.invoiceNumber}
                helperText={errors.invoiceNumber?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                variant="outlined"
                size="small"
                label="Número de factura"
                {...register('invoiceNumber', { required: true })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="date"
              label=""
              type="date"
              size="small"
              error={!!errors.dateOfPurchase}
              defaultValue={invoiceToEdit?.dateOfPurchase}
              helperText={errors.dateOfPurchase && errors.dateOfPurchase.message}
              {...register('dateOfPurchase', {
                required: FIELD_REQUIRED_MESSAGE,
                validate: validateDate,
              })}
              inputProps={{ max: formattedToday }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MuiFileInput
              placeholder="Subir comprobante"
              size="small"
              value={value}
              error={!!errors.file}
              helperText={errors.file?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              {...register('file', { required: useGetRol() === RolesEnum.ADMINSTRADOR ? false : true })}
              onChange={(newValue) => {
                if (newValue) {
                  setValueForm('file', newValue);
                  setValue(newValue);
                }
              }}
            />
            {invoiceToEdit?.receiptUrl ? (
              <Tooltip title={invoiceToEdit?.receiptUrl}>
                <a
                  href={invoiceToEdit?.receiptUrl}
                  target="_blank"
                  style={{ color: 'blue', cursor: 'pointer' }}
                  download
                >
                  <Typography variant="caption" color="primary">
                    Descargar - {invoiceToEdit?.receiptKey}
                  </Typography>
                </a>
              </Tooltip>
            ) : (
              value && (
                <Tooltip title={value.name}>
                  <a
                    href={URL.createObjectURL(value)}
                    download={value.name}
                    style={{ color: 'blue', cursor: 'pointer' }}
                  >
                    <Typography variant="caption" color="primary">
                      Descargar - {value.name}
                    </Typography>
                  </a>
                </Tooltip>
              )
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="placeBuy">Lugar de compra</InputLabel>
              <Select
                labelId="placeBuy"
                label="Lugar de compra"
                defaultValue={invoiceToEdit?.placeOfPurchase}
                error={!!errors.placeOfPurchase}
                {...register('placeOfPurchase', { required: true })}
              >
                <MenuItem value={EnumPlaceOfPurchase.CLASIC}>{EnumPlaceOfPurchase.CLASIC}</MenuItem>
                <MenuItem value={EnumPlaceOfPurchase.DISTRIBUIDOR}>
                  {EnumPlaceOfPurchase.DISTRIBUIDOR.toLocaleUpperCase()}
                </MenuItem>
              </Select>
              <FormHelperText error>
                {errors.placeOfPurchase?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              </FormHelperText>
            </FormControl>
          </Grid>
          {watchPlaceOfPurchase === EnumPlaceOfPurchase.DISTRIBUIDOR && (
            <>
              <Grid item xs={12} md={4}>
                <Controller
                  name="auxDrpDistributor"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    // Ordenar el arreglo de opciones alfabéticamente
                    const sortedOptions = Distributors.sort((element1, element2) =>
                      element1.name.localeCompare(element2.name)
                    );
                    return (
                      <Autocomplete
                        fullWidth
                        sx={{ position: 'relative', zIndex: 2 }}
                        options={sortedOptions.map((distributor: IDistributors, index: number) => ({
                          id: index,
                          value: distributor.id.toString(),
                          label: distributor.name.toString(),
                        }))}
                        onChange={(event, newValue) => {
                          onChange(newValue);
                        }}
                        value={value || null}
                        renderInput={(params) => (
                          <TextField
                            error={!!errors.auxDrpDistributor}
                            variant="outlined"
                            helperText={errors.auxDrpDistributor?.type === 'required' && FIELD_REQUIRED_MESSAGE}
                            {...params}
                            size="small"
                            label="Distribuidor"
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid>

              {!watchAuxDrpDistributor && (
                <Grid item xs={12} md={4}>
                  <Tooltip title="Nuevo distribuidor">
                    <Button
                      variant="contained"
                      color="inherit"
                      fullWidth
                      onClick={() => handleEditDistributorBtn()}
                      startIcon={<AddCircleOutline />}
                    >
                      Crear Nuevo distribuidor
                    </Button>
                  </Tooltip>
                </Grid>
              )}
            </>
          )}
          {isEdit && <Grid item xs={12} md={6}></Grid>}
        </Grid>
      </form>
    </Container>
  );
};
