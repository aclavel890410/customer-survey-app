import { useMutation } from "@tanstack/react-query";
import { addAssessment } from "../../apis/SurveyApi";
import { SurveyAssessment } from "../../interfaces/SurveyAssessment";


export const useAddAssessment = () => {
    return useMutation({
        mutationKey: ['ADD_ASSESSMENT'],
        mutationFn: (params: SurveyAssessment[]) => addAssessment(params),
        networkMode: "always"
    })
}