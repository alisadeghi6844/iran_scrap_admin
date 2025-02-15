import React, { lazy, Suspense, useState } from "react";

import CRUD from "../../../../container/organism/CRUD";

const FoodShowForm = lazy(
  () =>
    import(
      /* webpackChunkName: "food-show" */ "../../../../container/features/reservationFood/management/foodShow/FoodShowForm"
    )
);

const FoodShowTable = lazy(
  () =>
    import(
      /* webpackChunkName: "food-show" */ "../../../../container/features/reservationFood/management/foodShow/FoodShowTable"
    )
);

const FoodShowDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "food-show" */ "../../../../container/features/reservationFood/management/foodShow/FoodShowDeleteConfirmation"
    )
);

const FoodShow = () => {
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [createDate, setCreateDate] = useState<any>("");
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
            <FoodShowTable
              onRowClick={(name: string, row: any) => {
                setMode(name);
                if (name === "create") {
                  setCreateDate(row);
                } else {
                  if (row?.length) {
                    setSelectedRow(row[0]);
                  }
                }
              }}
            />
          </Suspense>
        }
        form={
          <Suspense>
            <FoodShowForm
              createDate={createDate}
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
            <FoodShowDeleteConfirmation
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
export default FoodShow;
