import { toast } from "react-toastify"
import { useAddQuestion } from "../hooks/mutations/useAddQuestion"
import { SurveyQuestion } from "../interfaces/SurveyQuestion"
import { useNavigate } from "react-router-dom"
import { useUpdateQuestion } from "../hooks/mutations/useUpdateQuestion"
import * as yup from 'yup'
import { useFormik } from "formik"
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Switch, useTheme } from "@mui/material"
import { ChangeEvent } from "react"

type Props = {
    editData?: SurveyQuestion
}

const validationSchema = yup.object({
    active: yup
        .boolean()
        .required('Este campo es obligatorio.'),
    questionText: yup
        .string()
        .required('Este campo es obligatorio.')
        .max(500, 'Este campo sólo admite hasta 500 caracteres.'),
    sequence: yup.number()
        .typeError('Este campo sólo admite números enteros.')
        .required('Este campo es obligatorio.')
        .integer('Este campo sólo admite números enteros.')
        .min(1, 'El valor mímimo de este campo es 1.')
})

export const AddEditQuestionForm = ({ editData }: Props) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const initialValues: SurveyQuestion = {
        questionId: editData?.questionId ?? '',
        active: editData?.active ?? false,
        questionText: editData?.questionText ?? '',
        sequence: editData?.sequence ?? -1,
    }



    const addMutation = useAddQuestion();
    const updateMutation = useUpdateQuestion();

    const addQuestion = async (data: SurveyQuestion) => {
        try {
            data.sequence = Number(data.sequence);
            data.active = Boolean(data.active);
            const res = await addMutation.mutateAsync(data);
            toast.success('Pregunta adicionada.');
            navigate('/questions');
        }
        catch (error) {
            if ((error as any).response?.data?.message === 'secuence-exist')
                toast.error('Número de secuencia existente.')
            else toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
        finally {
            formik.setSubmitting(false);
        }
    }

    const updateQuestion = async (questionId: string, data: SurveyQuestion) => {
        try {
            data.sequence = Number(data.sequence);
            data.active = Boolean(data.active);
            const res = await updateMutation.mutateAsync({ questionId, data });
            toast.success('Pregunta actualizada.');
            navigate('/questions');
        }
        catch (error) {
            if ((error as any).response?.data?.message === 'secuence-exist')
                toast.error('Número de secuencia existente.')
            else toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
        finally {
            formik.setSubmitting(false);
        }
    }

    const handleSubmit = (data: SurveyQuestion) => {
        if (data.questionId)
            updateQuestion(data.questionId, data)
        else addQuestion(data)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        isInitialValid: false,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit
    })


    return (

        <Grid
            container
            spacing={2}
            component={'form'}
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth size="small">
                    <FormControlLabel control={
                        <Switch
                            checked={formik.values.active}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                formik.setFieldValue('active', e.target.checked)
                                formik.setFieldTouched('active', true)
                            }}
                        />
                    }
                        label={formik.values.active ? "Activada" : "Desactivada"}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth size="small">
                    <InputLabel size="small">Secuencia</InputLabel>
                    <OutlinedInput
                        name="sequence"
                        label="Secuencia"
                        size="small"
                        value={formik.values.sequence === -1 ? '' : formik.values.sequence}
                        error={(Boolean(formik.errors.sequence) && formik.touched.sequence) || formik.values.sequence === -1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {((Boolean(formik.errors.sequence) && formik.touched.sequence) || formik.values.sequence === -1) && (
                        <FormHelperText sx={{ color: theme.palette.error.main }}>
                            {formik.errors.sequence}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <FormControl fullWidth size="small">
                    <InputLabel size="small">Texto de la pregunta</InputLabel>
                    <OutlinedInput
                        name="questionText"
                        label="Texto de la pregunta"
                        size="small"
                        value={formik.values.questionText}
                        error={Boolean(formik.errors.questionText) && formik.touched.questionText}
                        rows={10}
                        multiline
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.questionText && formik.errors.questionText && (
                        <FormHelperText sx={{ color: theme.palette.error.main }}>
                            {formik.errors.questionText}
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} >
                <Stack
                    direction={"row"}
                    spacing={2}
                >
                    <Box flexGrow={1} ></Box>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={() => navigate('/questions')}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        disabled={!formik.isValid || formik.isSubmitting}
                        onClick={() => formik.submitForm()}
                    >
                        {editData ? 'Guardar' : 'Aceptar'}
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}