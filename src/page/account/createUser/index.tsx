import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../../container/organism/CRUD";

const CreateUserTable = lazy(
  () =>
    import(
      /* webpackChunkName: "createUser" */ "../../../container/features/account/createUser/CreateUserTable"
    )
);
const CreateUserForm = lazy(
  () =>
    import(
      /* webpackChunkName: "createUser" */ "../../../container/features/account/createUser/CreateUserForm"
    )
);
const CrateUserDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "createUser" */ "../../../container/features/account/createUser/CreateUserDeleteConfirmation"
    )
);
const ChangePasswordForm = lazy(
  () =>
    import(
      /* webpackChunkName: "createUser" */ "../../../container/features/account/createUser/ChangePasswordForm"
    )
);

const CreateUser = () => {
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
            <CreateUserTable
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
            <CreateUserForm
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
            <CrateUserDeleteConfirmation
              value={selectedRow ?? {}}
              onSubmit={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        detail={
          <Suspense>
          <ChangePasswordForm
            value={selectedRow ?? {}}
            onSubmitForm={() => {
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

export default CreateUser;
