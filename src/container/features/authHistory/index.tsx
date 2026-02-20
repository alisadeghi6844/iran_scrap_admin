import React from 'react';
import AuthHistoryTable from './AuthHistoryTable';

const AuthHistoryPage = () => {
  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">تاریخچه ورود و خروج</h1>
      <AuthHistoryTable />
    </div>
  );
};

export default AuthHistoryPage;
