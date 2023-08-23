import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import useGetGroups from '@/features/groups/hooks/useGetGroups';
import { IGroups } from '@/features/groups/models/Groups.type';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useReferencesContext } from '../context/References.context';
import { IReferences } from '../models/References.type';

type props = {
  register: UseFormRegister<IReferences>;
  errors: FieldErrors<IReferences>;
  control: Control<IReferences>;
  setValue: UseFormSetValue<IReferences>;
};
interface options {
  label: string;
  id: number;
}
export const ReferencesFormEdit: React.FC<props> = ({ register, errors, control, setValue }) => {
  const { getGroups: getGroupsFromApi } = useGetGroups();
  const { isEdit, referenceToEdit } = useReferencesContext();
  const [groups, setGroups] = useState<IGroups[]>([]);

  const getGroups = async () => {
    try {
      const res = await getGroupsFromApi();
      if (res.data) {
        setGroups(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (referenceToEdit?.groupReference) {
      setValue('groupReference', referenceToEdit.groupReference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceToEdit]);

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.referenceCode}
              defaultValue={referenceToEdit?.referenceCode}
              helperText={errors.referenceCode?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Código de referencia"
              {...register('referenceCode', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="groupReference"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              // Ordenar el arreglo de grupos alfabéticamente
              const sortedGroups = groups.sort((element1, element2) => element1.name.localeCompare(element2.name));
              return (
                <Autocomplete
                  disablePortal
                  fullWidth
                  clearOnEscape
                  sx={{ position: 'relative', zIndex: 2 }}
                  defaultValue={referenceToEdit?.groupReference}
                  options={sortedGroups.map<options>((group: IGroups) => ({
                    label: group.name + ' - ' + group.abbreviation,
                    id: group.id,
                    value: group.id,
                  }))}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  value={value || null}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      error={!!error?.message}
                      variant="outlined"
                      helperText={error?.message}
                      {...params}
                      label="Grupo de referencia"
                      size="small"
                    />
                  )}
                />
              );
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.warrantyDays}
              defaultValue={referenceToEdit?.warrantyDays}
              helperText={errors.warrantyDays?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Garantía(dias)"
              variant="outlined"
              size="small"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              {...register('warrantyDays', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.publicPrice}
              defaultValue={referenceToEdit?.publicPrice}
              helperText={errors.publicPrice?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Precio de la referencia"
              variant="outlined"
              size="small"
              type="number"
              {...register('publicPrice', { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              type="number"
              error={!!errors.internalCost}
              defaultValue={referenceToEdit?.internalCost}
              helperText={errors.internalCost?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              variant="outlined"
              size="small"
              label="Costo de la referencia"
              {...register('internalCost')}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} justifyContent="center">
          <FormControl fullWidth error={!!errors.isVigent}>
            <FormControlLabel
              control={<Checkbox defaultChecked={referenceToEdit?.isVigent} {...register('isVigent')} />}
              label="Vigente"
            />
            <FormHelperText error>{errors.isVigent?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              multiline
              maxRows={4}
              required
              error={!!errors.referenceDescription}
              defaultValue={referenceToEdit?.referenceDescription}
              helperText={errors.referenceDescription?.type === 'required' && FIELD_REQUIRED_MESSAGE}
              label="Descripción de referencia"
              variant="outlined"
              size="small"
              {...register('referenceDescription', { required: true })}
            />
          </FormControl>
        </Grid>

        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
