import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const PbPortAdminTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PbPortAdmin" */ "../../container/features/pbPortAdmin/PbPortAdminTable"
    )
);
const PbPortAdminForm = lazy(
  () =>
    import(
      /* webpackChunkName: "PbPortAdmin" */ "../../container/features/pbPortAdmin/PbPortAdminForm"
    )
);
const PbPortAdminDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "PbPortAdmin" */ "../../container/features/pbPortAdmin/PbPortAdminDeleteConfirmation"
    )
);

const PbPortAdminManagement = () => {
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
            <PbPortAdminTable
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
            <PbPortAdminForm
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
            <PbPortAdminDeleteConfirmation
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

export default PbPortAdminManagement;