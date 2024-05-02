import { toast } from "react-toastify"
import { useAddQuestion } from "../hooks/mutations/useAddQuestion"
import { SurveyQuestion } from "../interfaces/SurveyQuestion"
import { useNavigate } from "react-router-dom"
import { useUpdateQuestion } from "../hooks/mutations/useUpdateQuestion"
import * as yup from 'yup'
import { useFormik } from "formik"
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Switch, useTheme } from "@mui/material"
import { useGetQuestionById } from "../hooks/queries/useGetQuestionById"
import { AddEditQuestionForm } from "./AddEditQuestionForm"
import LoadingIndicator from "../components/LoadingIndicator"

type Props = {
    questionId?: string
}

export const AddEditQuestionPanel = ({ questionId }: Props) => {
    const theme = useTheme();

    const query = useGetQuestionById(Boolean(questionId), questionId as string);

    return (
        Boolean(questionId) && query.isLoading
            ? <Grid>
                <Grid item sm={12} md={12} lg={12} sx={{ minHeight: 300 }}>
                    <LoadingIndicator message="Cargando datos de la pregunta..." />
                </Grid>
            </Grid>
            : <AddEditQuestionForm editData={query.data?.data} />
    )
}