import { useMutation } from "@tanstack/react-query"
import { updateQuestion } from "../../apis/SurveyApi"
import { SurveyQuestion } from "../../interfaces/SurveyQuestion"

type Params = {
    questionId: string, 
    data: SurveyQuestion
}

export const useUpdateQuestion = () => {
    return useMutation({
        mutationKey: ['UPDATE_QUESTION'],
        mutationFn: ({ questionId, data } : Params) => updateQuestion(questionId, data),
        networkMode: "always"
    })
}