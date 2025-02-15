import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../../../container/organism/CRUD";

const AppetizerManagementTable = lazy(
  () =>
    import(
      /* webpackChunkName: "appetizer" */ "../../../../container/features/reservationFood/management/appetizer/AppetizerManagementTable"
    )
);
const AppetizerManagementForm = lazy(
  () =>
    import(
      /* webpackChunkName: "appetizer" */ "../../../../container/features/reservationFood/management/appetizer/AppetizerManagementForm"
    )
);
const AppetizerDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "appetizer" */ "../../../../container/features/reservationFood/management/appetizer/AppetizerDeleteConfirmation"
    )
);

const ManagementAppetizer = () => {
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
        mode={mode}
        content={
          <Suspense>
            <AppetizerManagementTable
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
            <AppetizerManagementForm
              id={selectedRow?._id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        confirmation={
          <Suspense>
            <AppetizerDeleteConfirmation
              value={selectedRow ?? {}}
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

export default ManagementAppetizer;
