import { useQuery } from "@tanstack/react-query"
import { getQuestionById } from "../../apis/SurveyApi"


export const useGetQuestionById = (executeQuery: boolean, questionId: string) => {
    return useQuery({
        queryKey: ['GET_QUESTION_BY_ID', questionId],
        queryFn: async ({ queryKey }) => {
            return await getQuestionById(queryKey[1])
        },
        enabled: executeQuery,
        networkMode: "always"
    })
}