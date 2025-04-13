import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import GeneralSettingDeleteConfirmation from "../../container/features/generalSetting/GeneralSettingDeleteConfirmation";
import AllUsersTable from "../../container/features/allUsers/AllUsersTable";
import SimpleRoleTable from "../../container/features/roleManagement/SimpleRoleTable";

const GeneralSettingManagement = () => {
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<any>({})

  const [userIds, setUserIds] = useState([]);
  const [defaultRolesId, setDefaultRolesId] = useState([]);

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <CRUD
        formModalSize="2xl"
        mode={mode}
        content={
          <Suspense>
            <AllUsersTable
            setDefaultRolesId={(e:any)=>setDefaultRolesId(e)}
              setUserIds={(e:any) => setUserIds(e)}
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
            <SimpleRoleTable
            defaultRolesId={defaultRolesId}
              userIds={userIds}
              value={selectedRow ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        // confirmation={
        //   <Suspense>
        //     <GeneralSettingDeleteConfirmation
        //       value={selectedRow ?? null}
        //       onSubmit={() => {
        //         setMode("content");
        //       }}
        //     />
        //   </Suspense>
        // }
        onModalClose={() => {
          setMode("content");
        }}
      />
    </div>
  );
};

export default GeneralSettingManagement;
