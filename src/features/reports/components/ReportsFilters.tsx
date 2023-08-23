import { FormHelperText, Grid, Select, TextField, FormControl, MenuItem, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import { Download } from '@mui/icons-material';
import { IReportsFormState } from '../models/Reports.type';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import useGetReports from '../hooks/useGetReports';
import { FIELD_REQUIRED_MESSAGE } from '@/constants/app.constants';
import { City, IDepartments } from '@/features/customers/models/Customers.type';
import { useEffect, useState } from 'react';
import useGetDepartaments from '@/hooks/useGetCities';

export default function ReportsFilters() {
  const { getReportsByFilter, loading } = useGetReports();
  const [departments, setDepartaments] = useState<IDepartments[]>([]);
  const { getDepartaments: getDepartamentsFromApi } = useGetDepartaments();

  const getDepartaments = async () => {
    try {
      const res = await getDepartamentsFromApi();
      if (res.data) setDepartaments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDepartaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<IReportsFormState>();

  const onSubmit = async (data: IReportsFormState) => {
    if (data) {
      await getReportsByFilter(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Fecha de inicio"
              fullWidth
              type="date"
              variant="outlined"
              size="small"
              style={{
                background: 'white',
                backgroundSize: 'cover',
              }}
              {...register('dateInit', { required: FIELD_REQUIRED_MESSAGE })}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0],
              }}
              error={Boolean(errors?.dateInit?.message)}
            />
            <FormHelperText error={Boolean(errors?.dateInit?.message)}>{errors?.dateInit?.message}</FormHelperText>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              label="Fecha final"
              fullWidth
              type="date"
              variant="outlined"
              size="small"
              style={{
                background: 'white',
                backgroundSize: 'cover',
              }}
              {...register('dateFinish', { required: FIELD_REQUIRED_MESSAGE })}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0],
              }}
              error={Boolean(errors?.dateFinish?.message)}
            />
            <FormHelperText error={Boolean(errors?.dateFinish?.message)}>{errors?.dateFinish?.message}</FormHelperText>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel error={Boolean(errors?.typeReport?.message)} id="reportTypeId">
                Tipo de reporte
              </InputLabel>
              <Controller
                name="typeReport"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    native
                    fullWidth
                    variant="outlined"
                    labelId="reportTypeId"
                    label="Tipo de reporte"
                    size="small"
                    value={field.value || 'undefined'}
                    onChange={field.onChange}
                    style={{
                      background: 'white',
                      backgroundSize: 'cover',
                    }}
                    // {...register('typeReport', { required: FIELD_REQUIRED_MESSAGE })}
                    error={Boolean(errors?.typeReport?.message)}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="1">Reporte órdenes de servicios generadas</option>
                    <option value="2">Reporte servicios prestados por equipos</option>
                    <option value="3">Reporte repuestos utilizados en los servicios</option>
                  </Select>
                )}
              />
              <FormHelperText error={Boolean(errors?.typeReport?.message)}>
                {errors?.typeReport?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel error={Boolean(errors?.departmentReport?.message)} id="deparmentReportId">
                Departamento
              </InputLabel>
              <Controller
                name="departmentReport"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Seleccione un departamento"
                    label="Departamento"
                    labelId="deparmentReportId"
                    value={field.value || 'undefined'}
                    onChange={(event) => {
                      const selectedId = parseInt(event.target.value as string);
                      setValue('departmentReport', selectedId);
                    }}
                    style={{
                      background: 'white',
                      backgroundSize: 'cover',
                    }}
                    MenuProps={{
                      style: {
                        maxHeight: '300px',
                        maxWidth: '300px',
                      },
                    }}
                    error={Boolean(errors.departmentReport?.message)}
                  >
                    <MenuItem value="undefined" selected>
                      <span>Seleccione un departamento</span>
                    </MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error>{errors.departmentReport?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel error={Boolean(errors?.cityReport?.message)} id="cityReportId">
                Ciudad
              </InputLabel>
              <Controller
                name="cityReport"
                control={control}
                rules={{
                  required: 'Campo requerido',
                }}
                shouldUnregister={false}
                render={({ field }) => (
                  <Select
                    value={field.value || 'undefined'}
                    onChange={field.onChange}
                    error={Boolean(errors.cityReport?.message)}
                    label="Ciudad"
                    labelId="cityReportId"
                    style={{
                      background: 'white',
                      backgroundSize: 'cover',
                      height: '40px',
                    }}
                    MenuProps={{
                      style: {
                        maxHeight: '300px',
                        maxWidth: '300px',
                      },
                    }}
                  >
                    <MenuItem value="undefined" selected>
                      <span>Seleccione una ciudad</span>
                    </MenuItem>
                    {getValues('departmentReport')
                      ? departments
                          .filter((department) => department.id == getValues('departmentReport'))[0]
                          .cities.map((city: City) => {
                            return (
                              <MenuItem key={city.id} value={city.name}>
                                {city.name}
                              </MenuItem>
                            );
                          })
                      : null}
                  </Select>
                )}
              />
              <FormHelperText error>{errors.cityReport?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <LoadingButton
              variant="contained"
              fullWidth
              endIcon={<Download />}
              size="medium"
              type="submit"
              loading={loading}
            >
              Descargar
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
