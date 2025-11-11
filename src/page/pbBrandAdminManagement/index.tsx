import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const PbBrandAdminTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PbBrandAdmin" */ "../../container/features/pbBrandAdmin/PbBrandAdminTable"
    )
);
const PbBrandAdminForm = lazy(
  () =>
    import(
      /* webpackChunkName: "PbBrandAdmin" */ "../../container/features/pbBrandAdmin/PbBrandAdminForm"
    )
);
const PbBrandAdminDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "PbBrandAdmin" */ "../../container/features/pbBrandAdmin/PbBrandAdminDeleteConfirmation"
    )
);

const PbBrandAdminManagement = () => {
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
            <PbBrandAdminTable
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
            <PbBrandAdminForm
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
            <PbBrandAdminDeleteConfirmation
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

export default PbBrandAdminManagement;