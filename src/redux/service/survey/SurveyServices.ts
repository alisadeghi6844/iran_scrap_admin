import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_SURVEY_POINT,
  GET_ALL_SURVEYS_POINT,
  GET_SURVEY_BY_ID_POINT,
  UPDATE_SURVEY_POINT,
  DELETE_SURVEY_POINT,
  CREATE_QUESTION_POINT,
  UPDATE_QUESTION_POINT,
  DELETE_QUESTION_POINT,
  GET_USER_SURVEY_BY_ID_POINT,
  GET_USER_SURVEYS_POINT,
} from "../../api/survey/SurveyApi";

// Survey services
export const CreateSurveyService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_SURVEY_POINT}`, items);
};

export const GetAllSurveysService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_SURVEYS_POINT}?${queryParams || ""}`
  );
};

export const GetSurveyByIdService = async (id: string) => {
  return await HttpServises.get(`${BASE_URL}${GET_SURVEY_BY_ID_POINT}/${id}`);
};

export const UpdateSurveyService = async (id: string, items: any) => {
  return await HttpServises.patch(`${BASE_URL}${UPDATE_SURVEY_POINT}/${id}`, items);
};

export const DeleteSurveyService = async (id: string) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_SURVEY_POINT}/${id}`);
};

// Question services
export const CreateQuestionService = async (surveyId: string, items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_QUESTION_POINT}/${surveyId}/question`, items);
};

export const UpdateQuestionService = async (questionId: string, items: any) => {
  return await HttpServises.patch(`${BASE_URL}${UPDATE_QUESTION_POINT}/${questionId}`, items);
};

export const DeleteQuestionService = async (surveyId: string, questionId: string) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_QUESTION_POINT}/${surveyId}/question/${questionId}`);
};

// User survey services
export const GetUserSurveyByIdService = async (id: string) => {
  return await HttpServises.get(`${BASE_URL}${GET_USER_SURVEY_BY_ID_POINT}/${id}`);
};

export const GetUserSurveysService = async (surveyId: string) => {
  return await HttpServises.get(`${BASE_URL}${GET_USER_SURVEYS_POINT}?surveyId=${surveyId}`);
};