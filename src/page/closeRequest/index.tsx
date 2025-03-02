import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import CloseRequestDetail from "../../container/features/closeRequest/CloseRequestDetail";

const CloseRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestTable"
    )
);
const CloseRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestForm"
    )
);

const CloseRequest = () => {
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
        formModalSize="2xl"
        mode={mode}
        content={
          <Suspense>
            <CloseRequestTable
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
            <CloseRequestForm
              handleSubmit={() => setMode("content")}
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        // detail={
        //   <Suspense>
        //     <CloseRequestDetail
        //       handleSubmit={() => setMode("content")}
        //       id={selectedRow?.id ?? null}
        //       mode={mode}
        //       onSubmitForm={() => {
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

export default CloseRequest;
