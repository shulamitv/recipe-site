
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../user/HeaderMenu";
import backgroundImage from "../Image/homePage.jpg";
import { Paper, ListItem, Grid, Box, Button } from '@mui/material';
const DisplayCategory = () => {
    const naving = useNavigate();
    const categorydata = useSelector(state => state?.categories)
    return (<>
        <HeaderMenu></HeaderMenu>
        <Box
            sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper
                sx={{
                    marginTop: '70vh',
                    padding: '2rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <Button
                    onClick={() => naving("/AddCategory")}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ color: 'red', backgroundColor: 'white' }}
                >
                    להוספת קטגוריה
                </Button>
                <Grid container spacing={2} direction="column">
                    {categorydata?.map((x) => (
                        <Grid item >
                            <ListItem key={x.Id}>
                                <span style={{ color: "black", alignItems: "center" }}>{x.Name}</span>
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    </>
    )
}
export default DisplayCategory;


