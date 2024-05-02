import { SurveyQuestion } from "../interfaces/SurveyQuestion"
import { Box, Stack, Typography } from '@mui/material'
import { useState } from "react";
import { AssessmentButton } from "./AssessmentButton";

type QuestionItemProps = {
    surveyQuestion: SurveyQuestion,
    assessmentHandler: (questionId: string, assessment: 1 | 2 | 3 | 4 | 5) => void
}

const numbers: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5]

export const QuestionItem = ({ surveyQuestion, assessmentHandler }: QuestionItemProps) => {

    const [assessment, setAssessment] = useState<1 | 2 | 3 | 4 | 5>();

    const handleClick = (n: 1 | 2 | 3 | 4 | 5) => {
        setAssessment(n)
        assessmentHandler(surveyQuestion.questionId as string, n)
    }

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            spacing={2}
        >
            <Box>
                <Typography variant="body1" >{surveyQuestion.questionText}</Typography>
            </Box>
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
            >
                {
                    numbers.map(n => <AssessmentButton key={n} assessment={n} selected={assessment === n} handleClick={() => handleClick(n)} />)
                }
                {/* <AssessmentButton key={1} assessment={1} selected={assessment === 1} handleClick={() => handleClick(1)} />
                <AssessmentButton key={2} assessment={2} selected={assessment === 2} handleClick={() => handleClick(2)} />
                <AssessmentButton key={3} assessment={3} selected={assessment === 3} handleClick={() => handleClick(3)} />
                <AssessmentButton key={4} assessment={4} selected={assessment === 4} handleClick={() => handleClick(4)} />
                <AssessmentButton key={5} assessment={5} selected={assessment === 5} handleClick={() => handleClick(5)} /> */}
            </Stack>
        </Stack>
    )
}