import { Container, Grid } from "@mui/material";
import CategoryItem from "./CategoryItem";

interface Props {
    categories: string[];
    type: string;
}
export default function CategoryList({categories, type}: Props) {

    const renderCategory = () => {
        return categories.map((category, index) => (
            <Grid item xs={3} key={index}>
                <CategoryItem categoryName={category} type={type} /> {/* Pass category as a prop to CategoryItem */}
            </Grid>
        ));
    };

    return (
        <Container>
            <Grid container rowGap={3} columnGap={15} alignContent={"center"} justifyContent={"start"}>
                {renderCategory()} 
            </Grid>
        </Container>
    );
}
