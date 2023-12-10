import { Container, Paper, Typography } from "@mui/material";
import CategoryList from "../components/CategoryList";

export default function CategoriesContainer () {
    const categories = ['Major', 'MinorM', 'Dorian', 'Phrygian', 'Lydian', 'Mixoldian', 'MajorBlues', 'MinorBlues']; // Add your actual categories
    const categoriesPer = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']; // Add your actual categories
    const StyleSubtitles = {
        textAlign: 'center',
        marginY: '15px',
        textTransform: 'uppercase',
    }
    return(
        <Container>
            <Typography variant="h5" color="primary" fontWeight="bold" sx={StyleSubtitles}>Categoría por Tonalidad</Typography>
            <CategoryList categories={categories} type="tonalidad" />
            <Typography variant="h5" color="primary" fontWeight="bold" sx={StyleSubtitles}>Categoría por Nota</Typography>
            <CategoryList categories={categoriesPer} type="nota" />
        </Container>
    )
}