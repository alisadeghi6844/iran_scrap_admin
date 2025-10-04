import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Question } from "../../redux/types/survey/SurveyTypes";
import Button from "../button";
import Typography from "../typography/Typography";
import SurveyInput from "./SurveyInput";
import SurveySelect from "./SurveySelect";
import SurveyCheckbox from "./SurveyCheckbox";
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX } from "react-icons/fi";
import {
  CreateQuestionAction,
  UpdateQuestionAction,
  DeleteQuestionAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectCreateQuestionLoading,
  selectUpdateQuestionLoading,
  selectDeleteQuestionLoading,
} from "../../redux/slice/survey/SurveySlice";

interface QuestionManagerProps {
  surveyId: string;
  questions: Question[];
  onQuestionsUpdate: () => void;
}

const questionTypes = [
  { value: "SingleChoice", label: "انتخاب تکی" },
  { value: "MultiChoice", label: "انتخاب چندگانه" },
  { value: "OpenEnded", label: "پاسخ باز" },
];

const QuestionManager: React.FC<QuestionManagerProps> = ({
  surveyId,
  questions,
  onQuestionsUpdate,
}) => {
  const dispatch = useDispatch();
  const createLoading = useSelector(selectCreateQuestionLoading);
  const updateLoading = useSelector(selectUpdateQuestionLoading);
  const deleteLoading = useSelector(selectDeleteQuestionLoading);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Question>({
    order: questions.length,
    text: "",
    type: "SingleChoice",
    required: true,
    choices: ["", ""],
  });

  const handleAddQuestion = () => {
    const questionData = {
      ...newQuestion,
      order: questions.length,
    };

    dispatch(CreateQuestionAction({ surveyId, data: questionData })).then(
      (result: any) => {
        if (result.type.endsWith("/fulfilled")) {
          setNewQuestion({
            order: questions.length + 1,
            text: "",
            type: "SingleChoice",
            required: true,
            choices: ["", ""],
          });
          setShowAddForm(false);
          onQuestionsUpdate();
        }
      }
    );
  };

  const handleUpdateQuestion = (question: Question) => {
    if (!question.id) return;

    dispatch(
      UpdateQuestionAction({
        questionId: question.id.toString(),
        data: question,
      })
    ).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setEditingQuestion(null);
        onQuestionsUpdate();
      }
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm("آیا از حذف این سوال اطمینان دارید؟")) {
      dispatch(DeleteQuestionAction({ surveyId, questionId })).then(
        (result: any) => {
          if (result.type.endsWith("/fulfilled")) {
            onQuestionsUpdate();
          }
        }
      );
    }
  };

  const renderQuestionForm = (
    question: Question,
    isEditing: boolean = false,
    onSave?: (q: Question) => void,
    onCancel?: () => void
  ) => {
    const [formData, setFormData] = useState<Question>(question);

    const handleTypeChange = (type: string) => {
      const updatedQuestion = { ...formData, type };
      if (["SingleChoice", "MultiChoice"].includes(type)) {
        updatedQuestion.choices = formData.choices?.length ? formData.choices : ["", ""];
      } else {
        updatedQuestion.choices = [];
      }
      setFormData(updatedQuestion);
    };

    const handleChoiceChange = (index: number, value: string) => {
      const choices = [...(formData.choices || [])];
      choices[index] = value;
      setFormData({ ...formData, choices });
    };

    const addChoice = () => {
      const choices = [...(formData.choices || []), ""];
      setFormData({ ...formData, choices });
    };

    const removeChoice = (index: number) => {
      const choices = formData.choices?.filter((_, i) => i !== index) || [];
      setFormData({ ...formData, choices });
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="space-y-4">
          <div>
            <SurveyInput
              label="متن سوال"
              required
              value={formData.text}
              onChange={(value) => setFormData({ ...formData, text: value })}
              placeholder="متن سوال را وارد کنید"
              size="md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SurveySelect
                label="نوع سوال"
                required
                options={questionTypes}
                value={formData.type}
                onChange={handleTypeChange}
                size="md"
              />
            </div>

            <div className="flex items-center">
              <SurveyCheckbox
                label="اجباری"
                checked={formData.required}
                onChange={(checked) => setFormData({ ...formData, required: checked })}
                size="md"
              />
            </div>
          </div>

          {["SingleChoice", "MultiChoice"].includes(formData.type) && (
            <div>
              <label className="block text-sm font-medium mb-2">گزینه‌ها</label>
              <div className="space-y-2">
                {formData.choices?.map((choice, index) => (
                  <div key={index} className="flex gap-2">
                    <SurveyInput
                      value={choice}
                      onChange={(value) => handleChoiceChange(index, value)}
                      placeholder={`گزینه ${index + 1}`}
                      size="sm"
                    />
                    <Button
                      onClick={() => removeChoice(index)}
                      variant="error"
                      size="xs"
                      disabled={formData.choices?.length <= 2}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addChoice}
                  variant="success"
                  size="xs"
                >
                  <FiPlus className="ml-1" />
                  افزودن گزینه
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <Button
              onClick={() => onSave?.(formData)}
              loading={isEditing ? updateLoading : createLoading}
              variant="success"
              size="md"
            >
              <FiSave className="ml-1" />
              {isEditing ? "ذخیره تغییرات" : "افزودن سوال"}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline-neutral"
              size="md"
            >
              <FiX className="ml-1" />
              انصراف
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="text-lg font-semibold">
          مدیریت سوالات ({questions.length} سوال)
        </Typography>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="primary"
          size="md"
        >
          <FiPlus className="ml-1" />
          افزودن سوال جدید
        </Button>
      </div>

      {/* Add Question Form */}
      {showAddForm &&
        renderQuestionForm(
          newQuestion,
          false,
          handleAddQuestion,
          () => setShowAddForm(false)
        )}

      {/* Questions List */}
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div key={question.id || index} className="bg-white border rounded-lg p-4">
            {editingQuestion?.id === question.id ? (
              renderQuestionForm(
                editingQuestion,
                true,
                handleUpdateQuestion,
                () => setEditingQuestion(null)
              )
            ) : (
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <Typography className="font-medium text-lg mb-1">
                      {index + 1}. {question.text}
                    </Typography>
                    <div className="flex gap-2 text-sm">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {questionTypes.find((t) => t.value === question.type)?.label}
                      </span>
                      {question.required && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          اجباری
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingQuestion(question)}
                      variant="warning"
                      size="xs"
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      onClick={() => handleDeleteQuestion(question.id!.toString())}
                      loading={deleteLoading}
                      variant="error"
                      size="xs"
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>

                {/* Show choices for choice-based questions */}
                {["SingleChoice", "MultiChoice"].includes(question.type) &&
                  question.choices && (
                    <div className="mt-3 pl-4">
                      <Typography className="text-sm font-medium mb-2">گزینه‌ها:</Typography>
                      <ul className="space-y-1">
                        {question.choices.map((choice, choiceIndex) => (
                          <li key={choiceIndex} className="text-sm text-gray-600">
                            • {choice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Typography className="text-gray-500">
              هیچ سوالی برای این نظرسنجی تعریف نشده است
            </Typography>
            <Typography className="text-gray-400 text-sm mt-1">
              برای شروع، سوال جدیدی اضافه کنید
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;