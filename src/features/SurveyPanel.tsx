import {  Edit, Save } from "@mui/icons-material"
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material"
import { useAddAssessment } from "../hooks/mutations/useAddAssessment";
import { useGetActiveQuestions } from "../hooks/queries/useGetActiveQuestions";
import LoadingIndicator from "../components/LoadingIndicator";
import { toast } from "react-toastify";
import useSurveyPopup from "../components/useSurveyPopup";
import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { AssessmentIcon } from "../components/AssessmentIcon";
import { useNavigate } from "react-router-dom";


export const SurveyPanel = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const query = useGetActiveQuestions(true);
    const sendAssessment = useAddAssessment();

    const handleCloseSurvey = () => {
        console.log('survey closed')
    }

    const { assessments, completed, SouerveyPopup, openSurvey } = useSurveyPopup({
        orderId: 50000,
        title: 'Hola. ¿Te gustariá responder una pequeña encuesta?',
        subTitle: 'Solo te tomará un momento.',
        questions: query.data?.data || [],
        handleClose: handleCloseSurvey
    })

    const saveAssessments = async () => {
        try {
            await sendAssessment.mutateAsync(assessments);
            toast.success('Respuestas guardadas.')
            navigate('/questions')
        }
        catch (error) {
            toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
    }

    return (
        <>
            <SouerveyPopup />
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item sm={12} md={3} lg={2}>
                    <Button
                        size="small"
                        sx={{ bgcolor: theme.palette.primary.main, color: 'white', textTransform: 'none' }}
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => openSurvey(true)}
                    >
                        Realizar encuesta
                    </Button>
                </Grid>
                <Grid item sm={12} md={3} lg={2}>
                    <Button
                        size="small"
                        sx={{ bgcolor: theme.palette.primary.main, color: 'white', textTransform: 'none' }}
                        variant="contained"
                        startIcon={<Save />}
                        disabled={!completed}
                        onClick={saveAssessments}
                    >
                        Guardar respuestas
                    </Button>
                </Grid>
                <Grid item xs></Grid>
                {
                    query.isLoading &&
                    <Grid item sm={12} md={12} lg={12} sx={{ minHeight: 300 }}>
                        <LoadingIndicator message="Cargando listado de preguntas..." />
                    </Grid>
                }
                <Grid item sm={12} md={12} lg={12}>
                    {
                        query.isFetched && query.isSuccess &&
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pregunta</TableCell>
                                        <TableCell>Evaluación</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        (() => {
                                            if (assessments.length > 0 && query.data?.data.length > 0) {
                                                return assessments.map(a => {
                                                    const text = (query.data.data as SurveyQuestion[]).find(question => question.questionId === a.questionId)?.questionText;
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{text}</TableCell>
                                                            <TableCell>
                                                                <Stack direction={'column'} alignItems={'center'} sx={{ width: '100%' }}>
                                                                    <Box>
                                                                        <AssessmentIcon assessment={a.assessment} size={35} />
                                                                    </Box>
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        })()
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Grid>
            </Grid>
        </>
    )
}