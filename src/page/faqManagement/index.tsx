import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import FaqDeleteConfirmation from "../../container/features/faq/FaqDeleteConfirmation";



const FaqTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Faq" */ "../../container/features/faq/FaqTable"
    )
);
const FaqForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Faq" */ "../../container/features/faq/FaqForm"
    )
);

const FaqManagement = () => {
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
        formModalSize="xl"
        mode={mode}
        content={
          <Suspense>
            <FaqTable
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
            <FaqForm
              value={selectedRow ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        confirmation={
          <Suspense>
            <FaqDeleteConfirmation
              value={selectedRow ?? null}
              onSubmit={() => {
                setMode("content");
              }}
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

export default FaqManagement;
