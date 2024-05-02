import { Box, Button, Dialog, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, OutlinedInput, Stack, Switch, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";
import { SurveyQuestionDto } from "../interfaces/SurveyQuestionDto";
import { AssessmentDetail } from "../components/AssessmentDetail";

type QuestionDetailsDialogProps = {
    data: SurveyQuestionDto,
    closeFn: () => void
}

export const QuestionDetailsDialog = ({ data, closeFn }: QuestionDetailsDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(true);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent
                sx={{
                    minHeight: 100
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={12} md={6} lg={6}>
                        <FormControl fullWidth size="small">
                            <FormControlLabel 
                                control={ <Switch checked={data.active} readOnly /> } 
                                label={data.active ? 'Activada' : 'Desactivada'}
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
                                value={data.sequence}
                                readOnly
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <FormControl fullWidth size="small">
                            <InputLabel size="small">Texto de la pregunta</InputLabel>
                            <OutlinedInput
                                name="questionText"
                                label="Texto de la pregunta"
                                size="small"
                                value={data.questionText}
                                rows={10}
                                multiline
                                readOnly
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{pt: 3}} >
                        <Stack direction={'row'} alignItems={'center'} >
                            <AssessmentDetail assessment={1} count={ data.surveyAssessments?.filter(d => d.assessment === 1).length } />
                            <AssessmentDetail assessment={2} count={ data.surveyAssessments?.filter(d => d.assessment === 2).length } />
                            <AssessmentDetail assessment={3} count={ data.surveyAssessments?.filter(d => d.assessment === 3).length } />
                            <AssessmentDetail assessment={4} count={ data.surveyAssessments?.filter(d => d.assessment === 4).length } />
                            <AssessmentDetail assessment={5} count={ data.surveyAssessments?.filter(d => d.assessment === 5).length } />
                        </Stack>
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
                                onClick={() => {
                                    setOpen(false);
                                    closeFn();
                                }}
                            >
                                Cerrar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}