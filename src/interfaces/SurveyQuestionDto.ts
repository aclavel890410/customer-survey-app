import { SurveyAssessment } from "./SurveyAssessment";
import { SurveyQuestion } from "./SurveyQuestion";

export interface SurveyQuestionDto extends SurveyQuestion {
    date: Date;
    surveyAssessments: SurveyAssessment[]
}