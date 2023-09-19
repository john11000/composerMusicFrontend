import { Grid, Container, TextField } from "@mui/material";
import React from "react";

export const ServiceOrdersAnulateForm = () => {
  return (
    <Container>
      <Grid container spacing={2} width="100%" margin="auto" minHeight="200px">
        <Grid item xs={12} md={3}>
          <TextField disabled label="Número de orden" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField disabled label="Tipo de servicio" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Fecha de la orden del servicio"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField disabled label="NIT del cliente" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Nombre del cliente"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Dirección de la referencia"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Barrio de la referencia"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Ciudad de la referencia"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Teléfono del cliente"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Código de la referencia"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            disabled
            label="Descripción de la referencia"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField disabled label="Distribuidor" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField disabled label="Fecha de compra" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField disabled label="Falla reportada" fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observaciones adicionales"
            fullWidth
            multiline
            rows={4}
            required
            size="small"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
