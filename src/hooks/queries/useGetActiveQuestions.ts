import { useQuery } from "@tanstack/react-query"
import { getActiveQuestions } from "../../apis/SurveyApi"


export const useGetActiveQuestions = (executeQuery: boolean) => {
    return useQuery({
        queryKey: ['GET_ACTIVE_QUESTIONS'],
        queryFn: async () => {
            return await getActiveQuestions()
        },
        enabled: executeQuery,
        networkMode: "always"
    })
}