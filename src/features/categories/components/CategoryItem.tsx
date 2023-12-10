import { ROUTER_MODULE_FILTERING } from "@/constants/routes-link.constants";
import { Paper, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
    categoryName: string;
    type: string;
}

export default function CategoryItem({ categoryName, type }: Props) {

    const router = useRouter();

    const goToCategory = () => {
        router.push(`${ROUTER_MODULE_FILTERING}?category=${categoryName}&type=${type}`);
    }

    return (
        <Tooltip title={'Ver las melodias de ' + categoryName}>
            <Paper
            sx={{
                padding: 3,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                backgroundColor: '#4CAF50', // Set your desired green color
                backgroundImage: 'url("http://4everstatic.com/imagenes/850xX/arte/musica/notas-de-musica,-clave-de-sol,-fondo-verde-257756.jpg")', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#ffffff', // Set text color to contrast with the background
                '&:hover': {
                    backgroundColor: '#388e3c', // Change to a slightly different shade on hover
                    transform: 'scale(1.2)',
                },
            }}
            onClick={goToCategory}
        >
            <Typography variant="subtitle1" fontWeight="bold" sx={{
                backgroundColor: '#000000b3',
            }}>
                {categoryName}
            </Typography>
        </Paper>
        </Tooltip>
    );
}
