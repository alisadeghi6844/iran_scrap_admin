import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const PbProductAdminTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PbProductAdmin" */ "../../container/features/pbProductAdmin/PbProductAdminTable"
    )
);
const PbProductAdminForm = lazy(
  () =>
    import(
      /* webpackChunkName: "PbProductAdmin" */ "../../container/features/pbProductAdmin/PbProductAdminForm"
    )
);
const PbProductAdminDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "PbProductAdmin" */ "../../container/features/pbProductAdmin/PbProductAdminDeleteConfirmation"
    )
);

const PbProductAdminManagement = () => {
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown>>({});

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
            <PbProductAdminTable
              onRowClick={(name: string, row: Record<string, unknown>) => {
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
            <PbProductAdminForm
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
            <PbProductAdminDeleteConfirmation
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

export default PbProductAdminManagement;