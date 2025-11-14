import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import RoleManagementDeleteConfirmation from "../../container/features/roleManagement/RoleManagementDeleteConfirmation";
import RoleManagementDetail from "../../container/features/roleManagement/RoleManagementDetail";

const RoleManagementTable = lazy(
  () =>
    import(
      /* webpackChunkName: "RoleManagement" */ "../../container/features/roleManagement/RoleManagementTable"
    )
);
const RoleManagementForm = lazy(
  () =>
    import(
      /* webpackChunkName: "RoleManagement" */ "../../container/features/roleManagement/RoleManagementForm"
    )
);

const RoleManagementManagement = () => {
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
        confirmModalSize="xl"
        detailModalSize="2xl"
        mode={mode}
        content={
          <Suspense>
            <RoleManagementTable
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
            <RoleManagementForm
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        confirmation={
          <Suspense>
            <RoleManagementDeleteConfirmation
              value={selectedRow?.id ?? null}
              mode={mode}
              onSubmit={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        detail={
          <Suspense>
            {mode === "detail" && (
        
              <RoleManagementDetail
                value={selectedRow?.id ?? null}
                mode={mode}
                onSubmit={() => {
                  setMode("content");
                }}
              />
            )}
          </Suspense>
        }
        onModalClose={() => {
          setMode("content");
        }}
      />
    </div>
  );
};

export default RoleManagementManagement;
