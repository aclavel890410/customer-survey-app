import { Add } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, Grid, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestions } from "../hooks/queries/useGetAllQuestions";
import { ChangeEvent, useRef, useState } from "react";
import { ConfirmDialog, showConfirmDialogType } from "../components/ConfirmDialog";
import { useDeleteQuestion } from "../hooks/mutations/useDeleteQuestion";
import { toast } from "react-toastify";
import LoadingIndicator from "../components/LoadingIndicator";
import { useSetQuestionActive } from "../hooks/mutations/useSetQuestionActive";
import { SurveyQuestionDto } from "../interfaces/SurveyQuestionDto";
import { QuestionListMenu } from "./QuestionListMenu";
import { evaluacionPromedio } from "../utils/utils";
import { AssessmentIcon } from "../components/AssessmentIcon";
import { SurveyPopup } from "../components/SurveyPopup";
import { QuestionDetailsDialog } from "./QuestionDetailsDialog";


export const QuestionsTable = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const confirmRef = useRef(null);
    const query = useGetAllQuestions(true)
    const deleteMutation = useDeleteQuestion();
    const setActiveMutation = useSetQuestionActive();
    const [verEncuesta, setVerEncuesta] = useState(false);
    const [dataDetails, setDataDetalis] = useState();

    const deleteQuestion = async (questionId: string) => {
        try {
            await deleteMutation.mutateAsync(questionId);
            toast.success('Pregunta eliminada.');
            query.refetch();
        }
        catch (error) {
            toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
    }

    const deleteHandler = (questionId: string) => {
        (confirmRef.current as unknown as showConfirmDialogType).showConfirmDialog({
            title: 'Confirmar',
            message: `¿Estás seguro que desas eliminar esta pregunta?`,
            okFn: () => {
                deleteQuestion(questionId)
            }
        })
    }

    const detailsHandler = (questionId: string) => {
        const data = query.data?.data.find((d: SurveyQuestionDto) => d.questionId === questionId);
        setDataDetalis(data);
    }

    const setQuestionActive = async (questionId: string, active: boolean) => {
        try {
            await setActiveMutation.mutateAsync({ questionId, active });
            toast.success(`Pregunta ha sido ${active ? 'activada' : 'desactivada'}.`);
            query.refetch();
        }
        catch (error) {
            toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
    }

    let activadas = 0;
    const rows = query.data?.data.map((question: SurveyQuestionDto, index: number) => {
        if (question.active)
            activadas++;
        return (
            <TableRow
                hover
                tabIndex={-1}
                key={index}
            >
                <TableCell>
                    {
                        question.questionText.length > 50
                            ? question.questionText.substring(0, 50)
                            : question.questionText
                    }
                </TableCell>
                <TableCell>
                    <FormControl fullWidth size="small">
                        <FormControlLabel control={
                            <Switch
                                checked={question.active}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setQuestionActive(question.questionId as string, e.target.checked)
                                }}
                            />
                        }
                            label={question.active ? "Activada" : "Desactivada"}
                        />
                    </FormControl>
                </TableCell>
                <TableCell>{question.sequence}</TableCell>
                <TableCell>
                    {
                        (() => {
                            const date = new Date(question.date)
                            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        })()
                    }
                </TableCell>
                <TableCell>
                    <Stack direction={'column'} alignItems={'center'} sx={{ width: '100%' }}>
                        {
                            (() => {
                                const avg = evaluacionPromedio(question);
                                return (
                                    <Box>
                                        <AssessmentIcon assessment={avg} size={35} />
                                    </Box>
                                );
                            })()
                        }
                    </Stack>
                </TableCell>
                <TableCell>
                    <QuestionListMenu
                        question={question}
                        deleteHandler={deleteHandler}
                        detailsHandler={detailsHandler}
                    />
                </TableCell>
            </TableRow>
        )
    })



    return (
        <>
            <ConfirmDialog ref={confirmRef} />
            {
                dataDetails &&
                <QuestionDetailsDialog data={dataDetails} closeFn={() => setDataDetalis(undefined)} />
            }
            {
                verEncuesta &&
                <SurveyPopup
                    orderId={500}
                    title="Hola. ¿Te gustariá responder una pequeña encuesta?"
                    subTitle="Solo te tomará un momento."
                    handleClose={() => setVerEncuesta(false)}
                />
            }
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item sm={12} md={3} lg={2}>
                    <Button
                        size="small"
                        sx={{ bgcolor: theme.palette.primary.main, color: 'white', textTransform: 'none' }}
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => navigate('/questions/add')}
                    >
                        Adicionar pregunta
                    </Button>
                </Grid>
                <Grid item sm={12} md={3} lg={2}>
                    <Button
                        size="small"
                        sx={{ bgcolor: theme.palette.primary.main, color: 'white', textTransform: 'none' }}
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setVerEncuesta(true)}
                    >
                        Ver encuesta
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
                                        <TableCell>{`Activada (${activadas})`}</TableCell>
                                        <TableCell>Secuencia</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Prom. evaluación</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rows
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