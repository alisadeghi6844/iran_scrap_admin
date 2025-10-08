import { useEffect, useState } from "react";
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
  DeleteSurveyAction,
  GetSurveyByIdAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetAllSurveysData,
  selectGetAllSurveysLoading,
  selectCreateSurveyLoading,
  selectDeleteSurveyLoading,
  selectGetSurveyByIdData,
  selectGetSurveyByIdLoading,
} from "../../redux/slice/survey/SurveySlice";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import { FiPlus, FiRefreshCw } from "react-icons/fi";

type ViewMode = "list" | "create" | "view" | "responses";

const SurveyManagement = () => {
  const dispatch = useDispatch();

  const surveysData = useSelector(selectGetAllSurveysData);
  const surveysLoading = useSelector(selectGetAllSurveysLoading);
  const createLoading = useSelector(selectCreateSurveyLoading);
  const deleteLoading = useSelector(selectDeleteSurveyLoading);
  const selectedSurvey = useSelector(selectGetSurveyByIdData);
  const selectedSurveyLoading = useSelector(selectGetSurveyByIdLoading);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [viewingSurvey, setViewingSurvey] = useState<Survey | null>(null);
  const [responsesSurvey, setResponsesSurvey] = useState<Survey | null>(null);
  const [deletingSurvey, setDeletingSurvey] = useState<Survey | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(GetAllSurveysAction({ page: 1, limit: 500 }) as any);
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

    dispatch(CreateSurveyAction(surveyData) as any).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setViewMode("list");
        dispatch(GetAllSurveysAction({ page: 1, limit: 500 }) as any);
      }
    });
  };

  // Update functionality moved to separate route

  // Edit functionality moved to separate route

  const handleViewSurvey = (survey: Survey) => {
    setViewingSurvey(survey);
    // Load full survey data with questions
    if (survey.id) {
      dispatch(GetSurveyByIdAction(survey.id.toString()) as any);
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
    dispatch(DeleteSurveyAction(surveyId) as any).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setShowDeleteModal(false);
        setDeletingSurvey(null);
        dispatch(GetAllSurveysAction({ page: 1, limit: 500 }) as any);
      }
    });
  };

  const handleRefresh = () => {
    dispatch(GetAllSurveysAction({ page: 1, limit: 500 }) as unknown);
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

      // Edit case removed - handled by separate route

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
              onEdit={() => {}} // Not used anymore
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
              onEdit={() => {}} // Not used anymore
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
            onEdit={() => {}} // Not used anymore
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
