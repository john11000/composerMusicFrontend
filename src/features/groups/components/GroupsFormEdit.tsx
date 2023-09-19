import { FormControl, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useGroupsContext } from "../context/Groups.context";
import { IGroups } from "../models/Groups.type";
import { FIELD_REQUIRED_MESSAGE } from "@/constants/app.constants";

type props = {
  register: UseFormRegister<IGroups>;
  errors: FieldErrors<IGroups>;
};

export const GroupsFormEdit: React.FC<props> = ({ register, errors }) => {
  const { isEdit, groupToEdit } = useGroupsContext();
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
              defaultValue={groupToEdit?.abbreviation}
              variant="outlined"
              size="small"
              label="Código Grupo"
              {...register("abbreviation")}
            />
          </FormControl>
        </Grid>

        <Grid item sx={{ width: { xs: "100%", md: isEdit ? "50%" : "100%" } }}>
          <FormControl fullWidth>
            <TextField
              required
              error={!!errors.name}
              defaultValue={groupToEdit?.name}
              helperText={
                errors.name?.type === "required" && FIELD_REQUIRED_MESSAGE
              }
              label="Nombre Grupo"
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
