import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useCreateGroup from "../hooks/useCreateGroups";
import { toastsManager } from "@/utilities";
import { useRouter } from "next/router";
import { ROUTER_MODULE_LIST_MELODY } from "@/constants/routes-link.constants";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
export function GenerateFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const sessionState = useSelector((state: AppStore) => state.authState);

  const { createGroup } = useCreateGroup();

  const router = useRouter();

  const submitGenerate = (data: any) => {
    createGroup(data, sessionState.accessToken);
    toastsManager.showToast("success", "Molodia generada exitosamente!");
    router.push(ROUTER_MODULE_LIST_MELODY);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        marginTop: 3,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(submitGenerate)} noValidate>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.num_bars}
                label="Número de barras (8,30)"
                variant="outlined"
                size="small"
                type="number"
                {...register("num_bars", { required: true, min: 8, max:30 })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              size="small"
              {...register("num_notes", { required: true })}
            >
              <InputLabel id="demo-simple-select-npb">
                  Notas por barra (2,4,6,8)
              </InputLabel>
              <Select
                labelId="demo-simple-select-npb"
                id="demo-simple-select-npb"
                label="Notas por barra (2,4,6,8)"
                defaultValue={2}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.num_steps}
                label="Número de pasos (1,2)"
                variant="outlined"
                size="small"
                type="number"
                {...register("num_steps", { required: true, min: 1, max: 2 })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              size="small"
              {...register("pauses", { required: true })}
            >
              <InputLabel id="demo-simple-select-pauses">
                Introduccir pausas
              </InputLabel>
              <Select
                labelId="demo-simple-select-pauses"
                id="demo-simple-select"
                label="Introduccir pausas"
                defaultValue={true}
                // onChange={handleChange}
              >
                <MenuItem value={"true"}>Activada</MenuItem>
                <MenuItem value={"false"}>Desactivada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.name}
                label="Registro de octava (4,6)"
                variant="outlined"
                size="small"
                type="number"
                {...register("name", { required: true, min: 4, max: 6 })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.cm}
                label="Cantidad de melodias (1,3)"
                variant="outlined"
                size="small"
                type="number"
                {...register("cm", { required: true, min: 1, max: 3  })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.nm}
                label="Número de mutaciones (1, 4)"
                variant="outlined"
                size="small"
                type="number"
                {...register("nm", { required: true, min: 1, max: 4  })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                error={!!errors.pm}
                label="Probabilidad de mutación (0,1)"
                variant="outlined"
                size="small"
                type="number"
                {...register("pm", { required: true, min: 0, max: 1  })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-key">Tonalidad</InputLabel>
              <Select
                labelId="demo-simple-select-key"
                id="demo-simple-select"
                label="Tonalidad"
                defaultValue={"C"}
                // onChange={handleChange}
                {...register("key", { required: true })}
              >
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"C#"}>C#</MenuItem>
                <MenuItem value={"Db"}>Db</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"D#"}>D#</MenuItem>
                <MenuItem value={"Eb"}>Eb</MenuItem>
                <MenuItem value={"E"}>E</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
                <MenuItem value={"F#"}>F#</MenuItem>
                <MenuItem value={"Gb"}>Gb</MenuItem>
                <MenuItem value={"G"}>G</MenuItem>
                <MenuItem value={"G#"}>G#</MenuItem>
                <MenuItem value={"Ab"}>Ab</MenuItem>
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"A#"}>A#</MenuItem>
                <MenuItem value={"Bb"}>Bb</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-Escala">Escala</InputLabel>
              <Select
                labelId="demo-simple-select-Escala"
                id="demo-simple-select"
                label="Escala"
                defaultValue={"major"}
                // onChange={handleChange}
                {...register("scale", { required: true })}
              >
                <MenuItem value={"major"}>Major</MenuItem>
                <MenuItem value={"minorM"}>MinorM</MenuItem>
                <MenuItem value={"dorian"}>Dorian</MenuItem>
                <MenuItem value={"phrygian"}>Phrygian</MenuItem>
                <MenuItem value={"lydian"}>Lydian</MenuItem>
                <MenuItem value={"mixolydian"}>Mixolydian</MenuItem>
                <MenuItem value={"majorBlues"}>MajorBlues</MenuItem>
                <MenuItem value={"minorBlues"}>MinorBlues</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                margin: "auto",
                width: "40%",
              }}
              type="submit"
            >
              Generar
            </Button>
          </Grid>
          {/* {isEdit && <Grid item xs={12} md={6} xs={12} md={6}></Grid>} */}
        </Grid>
      </form>
    </Container>
  );
}
