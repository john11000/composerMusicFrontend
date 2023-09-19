import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { useServiceOrdersContext } from "../context/ServiceOrders.context";

export const ServiceOrdersClose = () => {
  const { serviceOrderToEdit } = useServiceOrdersContext();
  return (
    <Container>
      <form>
        <Grid container spacing={2} sx={{ marginTop: "25px" }}>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Número de orden"
              value={serviceOrderToEdit?.orderNumber}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Tipo de servicio"
              value={serviceOrderToEdit?.serviceType}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Fecha de la orden del servicio"
              value={serviceOrderToEdit?.orderDate}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="NIT del cliente"
              value={serviceOrderToEdit?.customerNit}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Nombre del cliente"
              value={serviceOrderToEdit?.customerName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Dirección"
              value={serviceOrderToEdit?.referenceAddress}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Barrio"
              value={serviceOrderToEdit?.referenceNeighborhood}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Ciudad"
              value={serviceOrderToEdit?.referenceCity}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Teléfono"
              value={serviceOrderToEdit?.customerPhone}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Código de la referencia"
              value={serviceOrderToEdit?.referenceCode}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Descripción de la referencia"
              value={serviceOrderToEdit?.referenceDescription}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Distribuidor"
              value={serviceOrderToEdit?.distributor}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Fecha de compra"
              value={serviceOrderToEdit?.purchaseDate}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Falla reportada"
              value={serviceOrderToEdit?.reportedFailure}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Falla reportada"
                value={serviceOrderToEdit?.reportedFailure}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Tipo de gas"
              value={serviceOrderToEdit?.gasType}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Presión de gas"
              value={serviceOrderToEdit?.gasPressure}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={<Checkbox checked={serviceOrderToEdit?.compliesNorm} />}
              label="Cumple norma"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Fecha y hora de inicio del servicio"
              value={serviceOrderToEdit?.startTime}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Fecha y hora de fin del servicio"
              value={serviceOrderToEdit?.endTime}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              label="Repuestos utilizados"
              value={serviceOrderToEdit?.endTime}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField size="small" label="Observaciones" fullWidth />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={<Checkbox checked={serviceOrderToEdit?.isLocked} />}
              label="Bloqueo"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <input type="file" />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
