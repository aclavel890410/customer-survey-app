import { useQuery } from "@tanstack/react-query"
import { getAllQuestions } from "../../apis/SurveyApi"


export const useGetAllQuestions = (executeQuery: boolean, filtro?: string) => {
    return useQuery({
        queryKey: ['GET_ALL_QUESTIONS', filtro],
        queryFn: async ({ queryKey }) => {
            return await getAllQuestions(queryKey[1])
        },
        enabled: executeQuery,
        networkMode: "always"
    })
}