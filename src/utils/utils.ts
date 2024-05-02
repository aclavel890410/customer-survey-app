import { SurveyQuestionDto } from "../interfaces/SurveyQuestionDto";

const puntos = [
    { minimo: 1, maximo: 1.4 },
    { minimo: 1.5, maximo: 2.4 },
    { minimo: 2.5, maximo: 3.4 },
    { minimo: 3.5, maximo: 4.4 },
    { minimo: 4.5, maximo: 5 },
]
export const evaluacionPromedio = (question: SurveyQuestionDto) => {
    let avg = 0;
    question.surveyAssessments?.forEach(assessment => avg += assessment.assessment);
    if (question.surveyAssessments?.length > 0)
        avg = avg/question.surveyAssessments.length;
    return puntos.findIndex(punto => avg >= punto.minimo && avg <= punto.maximo) + 1;
}