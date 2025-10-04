export const SURVEY = "SURVEY";
export const CREATE_SURVEY = "CREATE_SURVEY";
export const GET_ALL_SURVEYS = "GET_ALL_SURVEYS";
export const GET_SURVEY_BY_ID = "GET_SURVEY_BY_ID";
export const UPDATE_SURVEY = "UPDATE_SURVEY";
export const DELETE_SURVEY = "DELETE_SURVEY";

// Question management types
export const CREATE_QUESTION = "CREATE_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

// User survey types
export const GET_USER_SURVEY_BY_ID = "GET_USER_SURVEY_BY_ID";
export const GET_USER_SURVEYS = "GET_USER_SURVEYS";

// Survey interfaces
export interface Question {
  id?: number;
  order: number;
  text: string;
  type: "SingleChoice" | "MultiChoice" | "OpenEnded";
  required: boolean;
  uitype?: string;
  choices?: string[];
}

export interface Survey {
  id?: number;
  title: string;
  description: string;
  published: boolean;
  questions?: Question[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSurveyRequest {
  title: string;
  description: string;
  published: boolean;
  questions: Question[];
}

export interface UpdateSurveyRequest {
  title?: string;
  description?: string;
  published?: boolean;
}