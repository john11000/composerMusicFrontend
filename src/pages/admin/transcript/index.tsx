import { AdminLayout } from "@/features/commons";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "@/redux/slices/app.slice";
import { TITLE_MODULE_TRANSCRIPT_MELODY } from "@/constants/title.constants";
import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { Container } from "@mui/system";
import { Download, PlayCircle, Stop } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function TranscriptPage() {
  const dispatcher = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatcher(setAppBarTitle(TITLE_MODULE_TRANSCRIPT_MELODY));
  }, [dispatcher]);

  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar grupo por nombre del grupo o nombre de referencia",
  };

  const fileRef = useRef<any>(null);

  const [open, setOpen] = useState<boolean>(false);

  const [startButton, setStartButton] = useState<boolean>(true);
  const [stopButton, setStopButton] = useState<boolean>(false);

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "abbreviation",
      label: "Código",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              // onClick={() => handleEditClick(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "descargar",
      label: "Descargar",
      options: {
        customBodyRender: (_, dataTable) => {
          return (
            <Button
              sx={{
                cursor: "pointer",
              }}
              // onClick={() => handleEditClick(dataTable)}
              endIcon={<Download />}
            >
              Descargar PDF
            </Button>
          );
        },
      },
    },
  ];

  const startRecorder = () => {
    setStartButton(false);
    setStopButton(true);
  };

  const stopRecorder = () => {
    setStartButton(false);
    setStopButton(false);
  };

  const close = () => {
    setStartButton(true);
    setStopButton(false);
    setOpen(false);
  };

  return (
    <AdminLayout>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Dialog open={open} onClose={close} fullWidth maxWidth="md">
          <form noValidate onSubmit={() => {}}>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <Grid
                container
                xs={12}
                sx={{
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    sx={{
                      visibility:
                        !stopButton && !startButton ? "visible" : "collapse",
                    }}
                  >
                    <TextField
                      required
                      //   error={!!errors.name}
                      //   defaultValue={groupToEdit?.name}
                      label="Nombre del audio"
                      variant="outlined"
                      size="small"
                      //   {...register("name", { required: true })}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<PlayCircle />}
                    onClick={startRecorder}
                    sx={{
                      width: 150,
                      display: startButton ? "inline" : "none",
                    }}
                  >
                    Grabar
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={<Stop />}
                    onClick={stopRecorder}
                    sx={{
                      width: 150,
                      display: stopButton ? "inline" : "none",
                    }}
                  >
                    Detener
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <img
                    src="/img/gifs-de-ondas-de-audio-3.gif"
                    alt="Grabando sonido ondas"
                    width={250}
                    height={50}
                    style={{
                      marginTop: 3,
                      display: stopButton ? "inline" : "none",
                    }}
                  ></img>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <LoadingButton
                variant="contained"
                loading={loading}
                type="submit"
                disabled={stopButton && startButton}
              >
                Guardar
              </LoadingButton>
              <Button variant="contained" color="inherit" onClick={close}>
                Cancelar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "250px",
          }}
        >
          <input ref={fileRef} type="file" style={{ display: "none" }} />
          <Button
            variant="contained"
            sx={{
              width: "250px",
            }}
            onClick={() => {
              fileRef?.current?.click(); // eslint-disable-line
            }}
          >
            Subir audio
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: "25px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "250px",
            }}
            onClick={() => setOpen(true)}
          >
            Grabar Audio
          </Button>
        </Grid>
      </Grid>
      <Container
        sx={{
          marginTop: 3,
        }}
      >
        <MUIDataTable
          title={
            loading ? (
              <Typography>
                Cargando...
                <CircularProgress size={20} />
              </Typography>
            ) : (
              "Lista de partituras transcriptas"
            )
          }
          data={[]}
          columns={columns}
          options={options}
        ></MUIDataTable>
      </Container>
    </AdminLayout>
  );
}
