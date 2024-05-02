import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { SurveyAssessment } from "../interfaces/SurveyAssessment";
import { useState } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import { QuestionConfirmMessage } from "./QuestionConfirmMessage";
import { QuestionStepper } from "./QuestionStepper";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";

type SurveyPopupProps = {
    orderId: number;
    questions: SurveyQuestion[];
    open: boolean;
    title?: string;
    subTitle?: string;
    handleClose: () => void;
    handleSubmit: (assessmentList: SurveyAssessment[]) => void;
}

const SurveyPopup = ({ orderId, questions, open, title, subTitle, handleClose, handleSubmit }: SurveyPopupProps) => {

    const [showSurvey, setShowSurvey] = useState(false);

    const handleConfirmClick = (accept: boolean) => {
        if (accept)
            setShowSurvey(true);
        else handleClose()
    }

    const handleFinish = async (assessmentList: SurveyAssessment[]) => {
        toast.success('Muchas gracias por su tiempo. ')
        handleSubmit(assessmentList);
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="responsive-dialog-title"
        >
            {
                showSurvey &&
                <DialogTitle>
                    <Stack sx={{ alignItems: 'end' }}>
                        <Box flexGrow={1}></Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
            }
            <DialogContent
                sx={{
                    minHeight: 100
                }}
            >
                {
                    !showSurvey
                        ? <QuestionConfirmMessage title={title} subTitle={subTitle} handleClick={handleConfirmClick} />
                        : <QuestionStepper
                            orderId={orderId}
                            questions={questions}
                            handleFinish={handleFinish}
                        />
                }
            </DialogContent>
        </Dialog>
    )

}

type Props = {
    orderId: number;
    questions: SurveyQuestion[];
    title?: string;
    subTitle?: string;
    open?: boolean;
    handleClose?: () => void;
}

const useSurveyPopup = ({ orderId, questions, title, subTitle, open, handleClose }: Props) => {

    const [assessmentList, setAssessmentList] = useState<SurveyAssessment[]>([]);
    const [completed, setCompleted] = useState(false)

    const [openPopup, setOpenPopup] = useState(open || false)

    const handleClosePopup = () => {
        setOpenPopup(false);
        if (handleClose)
            handleClose();
    }

    const handleSubmit = (assessmentList: SurveyAssessment[]) => {
        setOpenPopup(false);
        setAssessmentList(assessmentList);
        setCompleted(true);        
    }

    const poppup = () => (
        <SurveyPopup
            open={openPopup}
            orderId={orderId}
            questions={questions}
            title={title}
            subTitle={subTitle}
            handleClose={handleClosePopup}
            handleSubmit={handleSubmit}
        />
    )

    return {
        assessments: assessmentList,
        completed,
        SouerveyPopup: poppup,
        openSurvey: setOpenPopup
    }
}

export default useSurveyPopup;