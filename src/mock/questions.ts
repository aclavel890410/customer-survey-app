import { SurveyQuestion } from "../interfaces/SurveyQuestion";

export const questions: SurveyQuestion[] = [
    {
        active: true,
        questionId: '10',
        questionText: '¿Cuán satisfecho está con los productos comprados?',
        sequence: 10
    },
    {
        active: true,
        questionId: '20',
        questionText: '¿Cómo se siente con el servicio que le hemos prestado?',
        sequence: 2
    },
    {
        active: true,
        questionId: '30',
        questionText: '¿Le gustaría volver a nuestro negocio?',
        sequence: 3
    },
    {
        active: true,
        questionId: '1',
        questionText: '¿Recomendarías nuestro negocio a tus amigos?',
        sequence: 1
    }
]