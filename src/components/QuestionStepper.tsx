import { Box, Button, LinearProgress, Stack } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { SurveyAssessment } from "../interfaces/SurveyAssessment";
import { useRef, useState } from "react";
import { QuestionItem } from "./QuestionItem";
import Carousel from "react-material-ui-carousel";

type QuestionStepperProps = {
    orderId: number;
    questions: SurveyQuestion[],
    handleFinish: (assessmentList: SurveyAssessment[]) => void;
}


export const QuestionStepper = ({ orderId, questions, handleFinish }: QuestionStepperProps) => {

    const [assessmentList, setAssessmentList] = useState<SurveyAssessment[]>([]);
    const [currentPos, setCurrentPos] = useState(0);
    const slideContainerRef = useRef<HTMLElement>(null)

    const sortedQuestions = questions.sort((q1, q2) =>
        q1.sequence < q2.sequence
            ? -1
            : q1.sequence === q2.sequence
                ? 0
                : 1
    )

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

    const prevHandler = () => {
        setCurrentPos(prev => prev - 1);
    }

    const nextHandler = () => {
        if (currentPos < questions.length - 1)
            setCurrentPos(prev => prev + 1);
        if (currentPos === questions.length - 1)
            handleFinish(assessmentList)
    }

    return (
        <Stack
            direction={'column'}
            spacing={2}
        >

            <Box
                ref={slideContainerRef}
                sx={{
                    minWidth: 200,
                    minHeight: 200
                }}
            >
                <Carousel
                    index={currentPos}
                    autoPlay={false}
                    animation="slide"
                    swipe={false}
                    indicators={false}
                    navButtonsAlwaysInvisible={true}
                    sx={{
                        minWidth: 500,
                        width: 'max-content'
                    }}
                >
                    {
                        sortedQuestions.map((question, index) => {
                            return (
                                <QuestionItem
                                    key={index}
                                    surveyQuestion={question}
                                    assessmentHandler={assessmentHandler}
                                />
                            )
                        })
                    }
                </Carousel>

            </Box>
            <Box flexGrow={1} sx={{ pt: 2, pb: 2 }} >
                <LinearProgress variant="determinate" value={(100 / questions.length) * (currentPos)} />
            </Box>
            <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
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