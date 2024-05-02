import axios from "../interceptors/AxiosInstance";
import { SurveyQuestion } from "../interfaces/SurveyQuestion";
import { SurveyAssessment } from "../interfaces/SurveyAssessment";


const baseUrl =  `${process.env.REACT_APP_API_URL}/survey`;

export const addQuestion = (data: SurveyQuestion) => {
    return axios.post(`${baseUrl}/question`, data);
}

export const updateQuestion = (questionId: string, data: SurveyQuestion) => {
    return axios.patch(`${baseUrl}/question/${questionId}`, data);
}

export const setQuestionActive = (questionId: string, active: boolean) => {
    return axios.patch(`${baseUrl}/question/${questionId}/set_active`, { active });
}

export const deleteQuestion = (questionId: string) => {
    return axios.delete(`${baseUrl}/question/${questionId}`);
}

export const getAllQuestions = (filtro?: string) => {
    return axios.get(`${baseUrl}/question`, { params: { filtro } });
}

export const getActiveQuestions = () => {
    return axios.get(`${baseUrl}/question/active`);
}

export const getQuestionById = (questionId: string) => {
    return axios.get(`${baseUrl}/question/${questionId}`);
}

export const addAssessment = (data: SurveyAssessment[]) => {
    return axios.post(`${baseUrl}/assessment`, data);
}

export const getAllAssessments = () => {
    return axios.get(`${baseUrl}/assessment`);
}