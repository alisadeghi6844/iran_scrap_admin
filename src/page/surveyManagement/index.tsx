import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import Typography from "../../components/typography/Typography";
import SurveyForm from "../../components/survey/SurveyForm";
import SurveyList from "../../components/survey/SurveyList";
import SurveyViewer from "../../components/survey/SurveyViewer";
import SurveyResponses from "../../components/survey/SurveyResponses";
import SurveyStats from "../../components/survey/SurveyStats";
import SurveyDeleteModal from "../../components/survey/SurveyDeleteModal";
import {
  CreateSurveyAction,
  GetAllSurveysAction,
  UpdateSurveyAction,
  DeleteSurveyAction,
  GetSurveyByIdAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetAllSurveysData,
  selectGetAllSurveysLoading,
  selectCreateSurveyLoading,
  selectUpdateSurveyLoading,
  selectDeleteSurveyLoading,
  selectGetSurveyByIdData,
  selectGetSurveyByIdLoading,
} from "../../redux/slice/survey/SurveySlice";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import { FiPlus, FiRefreshCw } from "react-icons/fi";

type ViewMode = "list" | "create" | "edit" | "view" | "responses";

const SurveyManagement = () => {
  const dispatch = useDispatch();

  const surveysData = useSelector(selectGetAllSurveysData);
  const surveysLoading = useSelector(selectGetAllSurveysLoading);
  const createLoading = useSelector(selectCreateSurveyLoading);
  const updateLoading = useSelector(selectUpdateSurveyLoading);
  const deleteLoading = useSelector(selectDeleteSurveyLoading);
  const selectedSurvey = useSelector(selectGetSurveyByIdData);
  const selectedSurveyLoading = useSelector(selectGetSurveyByIdLoading);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [viewingSurvey, setViewingSurvey] = useState<Survey | null>(null);
  const [responsesSurvey, setResponsesSurvey] = useState<Survey | null>(null);
  const [deletingSurvey, setDeletingSurvey] = useState<Survey | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(GetAllSurveysAction({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleCreateSurvey = (values: any) => {
    // Prepare questions with proper order
    const questions = values.questions.map((q: any, index: number) => ({
      ...q,
      order: index,
    }));

    const surveyData = {
      ...values,
      questions,
    };

    dispatch(CreateSurveyAction(surveyData)).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setViewMode("list");
        dispatch(GetAllSurveysAction({ page: 1, limit: 50 }));
      }
    });
  };

  const handleUpdateSurvey = (values: any) => {
    if (!editingSurvey?.id) return;

    // Prepare questions with proper order
    const questions = values.questions.map((q: any, index: number) => ({
      ...q,
      order: index,
    }));

    const surveyData = {
      ...values,
      questions,
    };

    dispatch(
      UpdateSurveyAction({
        id: editingSurvey.id.toString(),
        data: surveyData,
      })
    ).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setViewMode("list");
        setEditingSurvey(null);
        dispatch(GetAllSurveysAction({ page: 1, limit: 50 }));
      }
    });
  };

  const handleEditSurvey = (survey: Survey) => {
    setEditingSurvey(survey);
    if (survey.id) {
      dispatch(GetSurveyByIdAction(survey.id.toString()));
    }
    setViewMode("edit");
  };

  const handleViewSurvey = (survey: Survey) => {
    setViewingSurvey(survey);
    // Load full survey data with questions
    if (survey.id) {
      dispatch(GetSurveyByIdAction(survey.id.toString()));
    }
    setViewMode("view");
  };

  const handleViewResponses = (survey: Survey) => {
    setResponsesSurvey(survey);
    setViewMode("responses");
  };

  const handleDeleteSurvey = (survey: Survey) => {
    setDeletingSurvey(survey);
    setShowDeleteModal(true);
  };

  const confirmDeleteSurvey = (surveyId: string) => {
    dispatch(DeleteSurveyAction(surveyId)).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setShowDeleteModal(false);
        setDeletingSurvey(null);
        dispatch(GetAllSurveysAction({ page: 1, limit: 50 }));
      }
    });
  };

  const handleRefresh = () => {
    dispatch(GetAllSurveysAction({ page: 1, limit: 50 }));
  };

  const renderContent = () => {
    switch (viewMode) {
      case "create":
        return (
          <SurveyForm
            onSubmit={handleCreateSurvey}
            loading={createLoading}
            onCancel={() => setViewMode("list")}
          />
        );

      case "edit":
        return (
          <SurveyForm
            initialData={selectedSurvey || editingSurvey}
            onSubmit={handleUpdateSurvey}
            loading={updateLoading || selectedSurveyLoading}
            onCancel={() => {
              setViewMode("list");
              setEditingSurvey(null);
            }}
          />
        );

      case "view":
        return (
          <>
            {viewingSurvey && (
              <SurveyViewer
                survey={selectedSurvey || viewingSurvey}
                open={!!viewingSurvey}
                loading={selectedSurveyLoading}
                onClose={() => {
                  setViewMode("list");
                  setViewingSurvey(null);
                }}
              />
            )}
            <SurveyList
              surveys={surveys}
              loading={surveysLoading}
              onEdit={handleEditSurvey}
              onDelete={handleDeleteSurvey}
              onView={handleViewSurvey}
              onViewResponses={handleViewResponses}
              deleteLoading={deleteLoading}
            />
          </>
        );

      case "responses":
        return (
          <>
            {responsesSurvey && (
              <SurveyResponses
                survey={responsesSurvey}
                open={!!responsesSurvey}
                onClose={() => {
                  setViewMode("list");
                  setResponsesSurvey(null);
                }}
              />
            )}
            <SurveyList
              surveys={surveys}
              loading={surveysLoading}
              onEdit={handleEditSurvey}
              onDelete={handleDeleteSurvey}
              onView={handleViewSurvey}
              onViewResponses={handleViewResponses}
              deleteLoading={deleteLoading}
            />
          </>
        );

      default:
        return (
          <SurveyList
            surveys={surveys}
            loading={surveysLoading}
            onEdit={handleEditSurvey}
            onDelete={handleDeleteSurvey}
            onView={handleViewSurvey}
            onViewResponses={handleViewResponses}
            deleteLoading={deleteLoading}
          />
        );
    }
  };

  // Calculate statistics - Handle both array and object response
  const surveys = Array.isArray(surveysData)
    ? surveysData
    : surveysData?.data || [];
  const totalSurveys = surveys?.length || 0;
  const publishedSurveys =
    surveys?.filter((survey: Survey) => survey.published)?.length || 0;
  const totalResponses = 0; // This would come from API
  const completedResponses = 0; // This would come from API

  return (
    <div className="p-16">
      {/* Header */}
      {viewMode === "list" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Typography variant="h1" className="text-xl font-bold">
                مدیریت نظرسنجی‌ها
              </Typography>
              <Typography className="text-gray-600 mt-1 text-sm">
                ایجاد، ویرایش و مدیریت نظرسنجی‌های خود
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRefresh}
                variant="outline-secondary"
                size="sm"
                loading={surveysLoading}
              >
                <FiRefreshCw className="ml-1" />
                بروزرسانی
              </Button>
              <Button
                onClick={() => setViewMode("create")}
                variant="primary"
                size="sm"
              >
                <FiPlus className="ml-1" />
                ایجاد نظرسنجی
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <SurveyStats
            totalSurveys={totalSurveys}
            publishedSurveys={publishedSurveys}
            totalResponses={totalResponses}
            completedResponses={completedResponses}
          />
        </>
      )}

      {/* Content */}
      {renderContent()}

      {/* Delete Confirmation Modal */}
      <SurveyDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingSurvey(null);
        }}
        survey={deletingSurvey}
        onDelete={confirmDeleteSurvey}
        loading={deleteLoading}
      />
    </div>
  );
};

export default SurveyManagement;
