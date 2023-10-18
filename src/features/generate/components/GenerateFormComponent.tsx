import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";
export function GenerateFormComponent() {
  return (
    <Container
      sx={{
        backgroundColor: "#FFFFFF",
        marginTop: 3,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <form>
        <Grid container spacing={2} xs={12}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Número de barras (1,32)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Notas por barra (1,8)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Número de pasos (1,3)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
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
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Registro de octava (1,8)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Cantidad de melodias (1,5)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Número de mutaciones (1, 4)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                //   error={!!errors.name}
                //   defaultValue={groupToEdit?.name}
                label="Probabilidad de mutación (0,1)"
                variant="outlined"
                size="small"
                type="number"
                //   {...register("name", { required: true })}
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
                defaultValue={true}
                // onChange={handleChange}
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
                defaultValue={true}
                // onChange={handleChange}
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
