import { FormControl, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useServicesContext } from "../context/Services.context";
import { IServices } from "../models/Services.type";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";

type props = {
  register: UseFormRegister<IServices>;
  errors: FieldErrors<IServices>;
};

export const ServicesFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, serviceToEdit } = useServicesContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              defaultValue={serviceToEdit?.name}
              helperText={
                errors.name?.type === "required" && FIELD_REQUIRED_MESSAGE
              }
              label="Código servicio"
              variant="outlined"
              size="small"
              {...register("name", { required: true })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.description}
              defaultValue={serviceToEdit?.description}
              helperText={
                errors.description?.type === "required" &&
                FIELD_REQUIRED_MESSAGE
              }
              variant="outlined"
              size="small"
              label="Descripción del servicio"
              {...register("description", { required: true })}
            />
          </FormControl>
        </Grid>

        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
