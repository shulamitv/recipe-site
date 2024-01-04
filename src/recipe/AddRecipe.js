import { useForm, useFieldArray } from "react-hook-form"
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import HeaderMenu from "../user/HeaderMenu";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import backgroundImage from "../Image/homePage.jpg";
import { useSelector } from "react-redux";
const AddRecipe = () => {
    const { state } = useLocation()
    const selectRecipe = state;
    const categories = useSelector(state => state?.categories)
    const UserId = useSelector(state => state?.user.Id)
    const schema = yup.object({
        Name: yup.string().when('selectRecipe', {
            is: null,
            then: yup.string().required('Username is required').max(20, 'שם משתמש יכיל מקסימום 20 תוים'),
        }),
        UserId: yup.string().when('selectRecipe', {
            is: null,
            then: yup.string().required('userId is required').max(4, 'מזהה מתכון יכיל מקסימום 4 תוים'),
        }),
        CategoryId: yup.string().required('CategoryId is required').max(9, ' קטגוריה יכולה להכיל מקסימום 9 תווים'),
        Img: yup.string().required('Img is required').min(6, 'התמונה חייבת להכיל קישור מתאים'),
        Duration: yup.string().required('Duration is required').max(3, 'משך זמן הכנה יכיל מקסימום 3 תוים'),
        Difficulty: yup.string().required('Difficulty is required').max(3, 'קושי'),
        Description: yup.string().required('Description is required').min(5, 'תאור מתכון יכיל מינימום 5 תוים'),
        Ingrident: yup.array().of(yup.object({
            Name: yup.string().required(),
            Count: yup.number().required(),
            Type: yup.string()
        })).required(),
        Instructions: yup.array().of(yup.string()).required(),
    }).required();
    const dispatch = useDispatch();

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { fields: Ingrident, append: appendIngredient } = useFieldArray({
        control,
        name: "Ingrident",
    })
    const { fields: Instructions, append: appendInstruction } = useFieldArray({
        control,
        name: "Instructions"
    })
    const onsubmit = (data) => {
        if (selectRecipe) {
            axios.post(`http://localhost:8080/api/recipe/edit`, selectRecipe)
                .then(x => {
                    alert(":)המתכון התעדכן בהצלחה")
                    dispatch({ type: "DELETE_RECIPE", data: selectRecipe })
                    dispatch({ type: "ADD_RECIPE", data: data })
                })
                .catch(error => {
                    if (error.response) {
                        alert((error.response.data));
                    }
                }
                )
        }
        else {
            data.UserId = UserId;
            axios.post(`http://localhost:8080/api/recipe`, data)
                .then(x => {
                    alert(":)המתכון נוסף בהצלחה")
                    dispatch({ type: "ADD_RECIPE", data: x.data })
                })
                .catch(error => {
                    if (error.response) {
                        alert((error.response.data));
                    }
                }
                )
        }
    }
    console.log("selectRecipe", selectRecipe)
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
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Paper
                sx={{
                    padding: '2rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
            >
                <form onSubmit={handleSubmit(onsubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                    {Object.entries(errors).map(([fieldName, error]) => (
                        <p key={fieldName}>{error.message}</p>
                    ))}
                    <TextField {...register("Name")} type="text" variant="outlined"
                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }}
                        placeholder=" שם מתכון" defaultValue={selectRecipe?.Name} />
                    <TextField {...register("Id")} type="text" placeholder=" מזהה מתכון"
                        variant="outlined"
                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }} defaultValue={selectRecipe?.UserId} disabled={selectRecipe} />
                    <select {...register("CategoryId")} style={{
                        color: 'black',
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        borderRadius: '5px',
                        padding: '8px',
                        fontSize: '13px',
                        display: 'inline-block',
                        textAlign: 'center',
                    }}>
                        <option>בחר קטגוריה </option>
                        {categories.map(category => (
                            <option key={category.Id} value={category.Id}>
                                {category.Name}
                            </option>
                        ))}
                    </select>
                    <TextField {...register("Img")} type="url" placeholder=" תמונה" variant="outlined"

                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }} defaultValue={selectRecipe?.Img} />
                    <TextField {...register("Duration")} type="text" placeholder=" זמן הכנה" variant="outlined"

                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }} defaultValue={selectRecipe?.Duration} />
                    <TextField {...register("Difficulty")} type="text" placeholder="דרגת קושי" variant="outlined"

                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }} defaultValue={selectRecipe?.Difficulty} />
                    <TextField {...register("Description")} type="text" placeholder="תיאור" variant="outlined"

                        margin="normal"
                        style={{ borderColor: 'white', color: 'white' }} defaultValue={selectRecipe?.Description} />
                    <div>
                        <label >מוצרים</label>
                        {Ingrident.map((item, index) => (
                            <div key={index}>
                                <input
                                    {...register(`Ingrident[${index}].Name`)}
                                    type="text"
                                    id="שם"
                                    placeholder="enter name" variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    defaultValue={selectRecipe?.Ingrident[index]?.Name}
                                />
                                <input
                                    {...register(`Ingrident[${index}].Count`)}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="text"
                                    id="שם"
                                    placeholder="enter Count"
                                    defaultValue={selectRecipe?.Ingrident[index]?.Count}
                                />
                                <input
                                    {...register(`Ingrident[${index}].Type`)}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="text"
                                    id="שם"
                                    placeholder="enter Type"
                                    defaultValue={selectRecipe?.Ingrident[index]?.Type}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => appendIngredient({ Name: "", Count: 0, Type: "" })}
                        style={{
                            color: 'black',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: '5px',
                            fontSize: '13px',
                        }}
                    >הוסף שדה</button>
                    <div>
                        <label>הוראות הכנה </label>
                        {Instructions.map((item, index) => (
                            <div key={index}>
                                <input
                                    {...register(`Instructions[${index}]`)}

                                    type="text"
                                    id="הוראה"
                                    placeholder="הוסף הוראה"
                                    defaultValue={selectRecipe?.Instructions[index]}
                                />

                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => appendInstruction()}
                        style={{
                            color: 'black',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: '5px',
                            fontSize: '13px',
                        }}
                    >הוסף הוראה</button>
                    <input type="submit"
                        style={{
                            color: 'red',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: '8px',
                            fontSize: '13px',
                        }} />
                </form>
            </Paper>
        </Box>
    </>
    );
}
export default AddRecipe