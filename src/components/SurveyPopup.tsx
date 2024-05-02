import { Box, Button, Dialog, DialogContent, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { QuestionItem } from "./QuestionItem";
import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { useState } from "react";
import { QuestionConfirmMessage } from "./QuestionConfirmMessage";
import { QuestionStepper } from "./QuestionStepper";
import { questions } from "../mock/questions";
import { SurveyAssessment } from "../interfaces/SurveyAssessment";
import { useGetActiveQuestions } from "../hooks/queries/useGetActiveQuestions";
import { useAddAssessment } from "../hooks/mutations/useAddAssessment";
import LoadingIndicator from "./LoadingIndicator";
import { toast } from "react-toastify";

type SurveyPopupProps = {
    orderId: number;
    title?: string;
    subTitle?: string;
    handleClose?: (reason: 'cancel' | 'finish') => void;
}

export const SurveyPopup = ({ orderId, title, subTitle, handleClose }: SurveyPopupProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(true);
    const [showSurvey, setShowSurvey] = useState(false);

    const query = useGetActiveQuestions(true);
    const sendAssessment = useAddAssessment();

    
    const handleConfirmClick = (accept: boolean) => {
        if (accept) {
            setShowSurvey(true);
        }
        else {
            setOpen(false);
            if (handleClose)
                handleClose('cancel')
        }
    }

    const handleCancelBtnClick = () => {
        setOpen(false);
        if (handleClose)
            handleClose('cancel')
    }

    const handleFinish = async (assessmentList: SurveyAssessment[]) => {
        try {
            await sendAssessment.mutateAsync(assessmentList);
            toast.success('Muchas gracias por su tiempo. ')
            setOpen(false);
            if (handleClose)
                handleClose('finish');
        } 
        catch (error) {
            toast.error('Ha ocurrido un error. Por favor vuelva a intentarlo.')
        }
    }

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
                {
                    !showSurvey
                        ? <QuestionConfirmMessage title={title} subTitle={subTitle} handleClick={handleConfirmClick} />
                        : query.isLoading
                            ? <Grid>
                            <Grid item sm={12} md={12} lg={12} sx={{ minHeight: 100 }}>
                                <LoadingIndicator message="Cargando datos de la escuesta..." />
                            </Grid>
                        </Grid>
                        : <QuestionStepper
                            orderId={orderId}
                            questions={query.data?.data as SurveyQuestion[] | []}
                            handleCancel={handleCancelBtnClick}
                            handleFinish={handleFinish}
                        />
                }
            </DialogContent>
        </Dialog>
    )

}