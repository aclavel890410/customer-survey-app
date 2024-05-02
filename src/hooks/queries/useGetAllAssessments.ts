import { useQuery } from "@tanstack/react-query"
import { getAllAssessments } from "../../apis/SurveyApi"


export const useGetAllAssessments = (executeQuery: boolean) => {
    return useQuery({
        queryKey: ['GET_ALL_ASSESSMENTS'],
        queryFn: async () => {
            return await getAllAssessments()
        },
        enabled: executeQuery,
        networkMode: "always"
    })
}