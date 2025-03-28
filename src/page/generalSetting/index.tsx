import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import GeneralSettingDeleteConfirmation from "../../container/features/generalSetting/GeneralSettingDeleteConfirmation";



const GeneralSettingTable = lazy(
  () =>
    import(
      /* webpackChunkName: "GeneralSetting" */ "../../container/features/generalSetting/GeneralSettingTable"
    )
);
const GeneralSettingForm = lazy(
  () =>
    import(
      /* webpackChunkName: "GeneralSetting" */ "../../container/features/generalSetting/GeneralSettingForm"
    )
);

const GeneralSettingManagement = () => {
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
            <GeneralSettingTable
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
            <GeneralSettingForm
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
            <GeneralSettingDeleteConfirmation
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

export default GeneralSettingManagement;
