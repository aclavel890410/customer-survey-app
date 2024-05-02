import { useMutation } from "@tanstack/react-query"
import { deleteQuestion, updateQuestion } from "../../apis/SurveyApi"
import { SurveyQuestion } from "../../interfaces/SurveyQuestion"


export const useDeleteQuestion = () => {
    return useMutation({
        mutationKey: ['DELETE_QUESTION'],
        mutationFn: (questionId: string) => deleteQuestion(questionId),
        networkMode: "always"
    })
}