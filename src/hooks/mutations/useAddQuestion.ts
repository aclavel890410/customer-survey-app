import { useMutation } from "@tanstack/react-query";
import { SurveyQuestion } from "../../interfaces/SurveyQuestion";
import { addQuestion } from "../../apis/SurveyApi";


export const useAddQuestion = () => {
    return useMutation({
        mutationKey: ['ADD_QUESTION'],
        mutationFn: (params: SurveyQuestion) => addQuestion(params),
        networkMode: "always"
    })
}