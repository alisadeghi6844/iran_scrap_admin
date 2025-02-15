import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../../../container/organism/CRUD";

const CategoryManagementTable = lazy(
  () =>
    import(
      /* webpackChunkName: "category" */ "../../../../container/features/reservationFood/management/category/CategoryManagementTable"
    )
);
const CategoryManagementForm = lazy(
  () =>
    import(
      /* webpackChunkName: "category" */ "../../../../container/features/reservationFood/management/category/CategoryManagementForm"
    )
);
const CategoryDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "category" */ "../../../../container/features/reservationFood/management/category/CategoryDeleteConfirmation"
    )
);

const ManagementCategory = () => {
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
            <CategoryManagementTable
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
            <CategoryManagementForm
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
            <CategoryDeleteConfirmation
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

export default ManagementCategory;
