import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import BuyerTable from "../../container/features/buyer/BuyerTable";
import BuyerRequestsTable from "../../container/features/buyer/BuyerRequestsTable";

const BuyerManagement = () => {
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<any>({});

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <CRUD
        formModalSize="6xl"
        mode={mode}
        content={
          <Suspense>
            <BuyerTable
              onRowClick={(name: string, row: any) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        }
        form={
          <Suspense>
            <BuyerRequestsTable
              userId={selectedRow?.id}
            />
          </Suspense>
        }
        onModalClose={() => {
          setMode("content");
        }}
      />
    </div>
  );
};

export default BuyerManagement;
