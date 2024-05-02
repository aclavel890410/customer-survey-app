import { useMutation } from "@tanstack/react-query"
import { setQuestionActive } from "../../apis/SurveyApi"

type Params = {
    questionId: string, 
    active: boolean
}

export const useSetQuestionActive = () => {
    return useMutation({
        mutationKey: ['SET_QUESTION_ACTIVE'],
        mutationFn: ({ questionId, active } : Params) => setQuestionActive(questionId, active),
        networkMode: "always"
    })
}