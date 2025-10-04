import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import SurveyManagement from '../page/surveyManagement';

// Simple test component to verify survey system integration
const SurveySystemTest: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <SurveyManagement />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default SurveySystemTest;