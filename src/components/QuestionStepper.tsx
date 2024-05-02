import { Box, Button, LinearProgress, Stack } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { SurveyAssessment } from "../interfaces/SurveyAssessment";
import { useState } from "react";
import { QuestionItem } from "./QuestionItem";

type QuestionStepperProps = {
    orderId: number;
    questions: SurveyQuestion[],
    handleCancel: () => void;
    handleFinish: (assessmentList: SurveyAssessment[]) => void;
}


export const QuestionStepper = ({ orderId, questions, handleCancel, handleFinish }: QuestionStepperProps) => {

    const [assessmentList, setAssessmentList] = useState<SurveyAssessment[]>([]);

    const sortedQuestions = questions.sort((q1, q2) =>
        q1.sequence < q2.sequence
            ? -1
            : q1.sequence === q2.sequence
                ? 0
                : 1
    )


    const [currentPos, setCurrentPos] = useState(0);
    const [progress, setProgress] = useState(100 / questions.length);

    const assessmentHandler = (questionId: string, assessment: 1 | 2 | 3 | 4 | 5) => {
        setAssessmentList(prevList => {
            const newList = [...prevList];
            const item = newList.find(item => item.questionId === questionId);
            if (item)
                item.assessment = assessment
            else newList.push({
                orderId,
                questionId,
                assessment
            })
            return newList;
        })
    }

    const questionItemsList = sortedQuestions.map(question => (
        <QuestionItem
            surveyQuestion={question}
            assessmentHandler={assessmentHandler}
        />
    ))

    const prevHandler = () => {
        setCurrentPos(prev => prev - 1);
        setProgress((100 / questions.length) * currentPos);
    }

    const nextHandler = () => {
        if (currentPos < questions.length - 1)
            setCurrentPos(prev => prev + 1);
        setProgress((100 / questions.length) * currentPos);
        if (currentPos === questions.length - 1)
            handleFinish(assessmentList)
    }

    return (
        <Stack
            direction={'column'}
            spacing={2}
        >

            <Stack direction={'row'} spacing={2}>
                {
                    (() => (
                        <QuestionItem
                            surveyQuestion={sortedQuestions[currentPos]}
                            assessmentHandler={assessmentHandler}
                        />
                    ))()
                }

            </Stack>
            <Box flexGrow={1} sx={{ pt: 2, pb: 2 }} >
                <LinearProgress variant="determinate" value={(100 / questions.length) * (currentPos)} />
            </Box>
            <Stack direction={'row'} spacing={2}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    startIcon={<DoDisturbIcon />}
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Box flexGrow={1} />
                <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    startIcon={<ArrowBackIosNewIcon />}
                    disabled={currentPos === 0}
                    onClick={prevHandler}
                >
                    Anterior
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                    endIcon={<ArrowForwardIosIcon />}
                    disabled={!assessmentList.find(item => item.questionId === sortedQuestions[currentPos].questionId)}
                    onClick={nextHandler}
                >
                    {currentPos === sortedQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
            </Stack>
        </Stack>
    );
}