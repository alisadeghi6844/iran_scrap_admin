import React, { useState, useEffect } from "react";
import { Question } from "../../redux/types/survey/SurveyTypes";
import Button from "../button";
import SurveyInput from "./SurveyInput";
import SurveySelect from "./SurveySelect";
import SurveyCheckbox from "./SurveyCheckbox";
import { FiPlus, FiTrash2, FiSave, FiX } from "react-icons/fi";

interface QuestionFormProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
  loading?: boolean;
  isEditing?: boolean;
}

const questionTypes = [
  { value: "SingleChoice", label: "انتخاب تکی" },
  { value: "MultiChoice", label: "انتخاب چندگانه" },
  { value: "OpenEnded", label: "پاسخ باز" },
];

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSave,
  onCancel,
  loading = false,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Question>({
    order: 0,
    text: "",
    type: "SingleChoice",
    required: true,
    choices: ["", ""],
  });

  useEffect(() => {
    if (question) {
      setFormData({
        ...question,
        choices: question.choices?.length ? question.choices : ["", ""],
      });
    }
  }, [question]);

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

  const handleSubmit = () => {
    if (!formData.text.trim()) return;
    onSave(formData);
  };

  return (
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
          onClick={handleSubmit}
          loading={loading}
          variant="success"
          size="md"
          disabled={!formData.text.trim()}
        >
          <FiSave className="ml-1" />
          {isEditing ? "ذخیره تغییرات" : "افزودن سوال"}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline-neutral"
          size="md"
          disabled={loading}
        >
          <FiX className="ml-1" />
          انصراف
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;