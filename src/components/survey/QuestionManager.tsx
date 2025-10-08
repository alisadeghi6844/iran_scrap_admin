import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Question } from "../../redux/types/survey/SurveyTypes";
import Button from "../button";
import Typography from "../typography/Typography";
import Modal from "../modal";
import ConfirmationModal from "../modal/ConfirmationModal";
import QuestionForm from "./QuestionForm";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    order: questions.length,
    text: "",
    type: "SingleChoice",
    required: true,
    choices: ["", ""],
  });

  const handleAddQuestion = (questionData: Question) => {
    const data = {
      ...questionData,
      order: questions.length,
    };

    dispatch(CreateQuestionAction({ surveyId, data })).then(
      (result: any) => {
        if (result.type.endsWith("/fulfilled")) {
          setNewQuestion({
            order: questions.length + 1,
            text: "",
            type: "SingleChoice",
            required: true,
            choices: ["", ""],
          });
          setShowAddModal(false);
          onQuestionsUpdate();
        }
      }
    );
  };

  const handleUpdateQuestion = (questionData: Question) => {
    if (!editingQuestion?.id) return;

    dispatch(
      UpdateQuestionAction({
        questionId: editingQuestion.id.toString(),
        data: questionData,
      })
    ).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setEditingQuestion(null);
        setShowEditModal(false);
        onQuestionsUpdate();
      }
    });
  };

  const handleDeleteQuestion = () => {
    if (!questionToDelete?.id) return;

    dispatch(DeleteQuestionAction({ 
      surveyId, 
      questionId: questionToDelete.id.toString() 
    })).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setQuestionToDelete(null);
        setShowDeleteModal(false);
        onQuestionsUpdate();
      }
    });
  };

  const openEditModal = (question: Question) => {
    setEditingQuestion(question);
    setShowEditModal(true);
  };

  const openDeleteModal = (question: Question) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };



  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="text-lg font-semibold">
          مدیریت سوالات ({questions.length} سوال)
        </Typography>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="md"
        >
          <FiPlus className="ml-1" />
          افزودن سوال جدید
        </Button>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {questions.map((question, index) => (
          <div key={question.id || index} className="bg-white border rounded-lg p-4">
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
                  onClick={() => openEditModal(question)}
                  variant="warning"
                  size="xs"
                >
                  <FiEdit />
                </Button>
                <Button
                  onClick={() => openDeleteModal(question)}
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

      {/* Add Question Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        size="lg"
        headerTitle="افزودن سوال جدید"
      >
        <QuestionForm
          question={newQuestion}
          onSave={handleAddQuestion}
          onCancel={() => setShowAddModal(false)}
          loading={createLoading}
          isEditing={false}
        />
      </Modal>

      {/* Edit Question Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        size="lg"
        headerTitle="ویرایش سوال"
      >
        {editingQuestion && (
          <QuestionForm
            question={editingQuestion}
            onSave={handleUpdateQuestion}
            onCancel={() => setShowEditModal(false)}
            loading={updateLoading}
            isEditing={true}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteQuestion}
        title="حذف سوال"
        message={`آیا از حذف سوال "${questionToDelete?.text}" اطمینان دارید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        loading={deleteLoading}
        type="danger"
      />
    </div>
  );
};

export default QuestionManager;