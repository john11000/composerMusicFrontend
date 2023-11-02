import { FormControl, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useListsContext } from "../context/List.context";
import { ILists } from "../models/List.type";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";

type props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export const ListsFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, ListToEdit } = useListsContext();
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto">
        <Grid
          item
          sx={{
            display: isEdit ? "block" : "none",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <FormControl fullWidth>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              size="small"
              label="Nombre"
              {...register("abbreviation")}
            />
          </FormControl>
        </Grid>

        <Grid item sx={{ width: { xs: "100%", md: isEdit ? "50%" : "100%" } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              helperText={
                errors.name?.type === "required" && FIELD_REQUIRED_MESSAGE
              }
              label="Código"
              variant="outlined"
              size="small"
              {...register("name", { required: true })}
            />
          </FormControl>
        </Grid>
        {isEdit && <Grid item xs={12} md={6}></Grid>}
      </Grid>
    </Container>
  );
};
