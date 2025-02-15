import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../../../container/organism/CRUD";

const RestaurantManagementTable = lazy(
  () =>
    import(
      /* webpackChunkName: "restaurant" */ "../../../../container/features/reservationFood/management/restaurant/RestaurantManagementTable"
    )
);
const RestaurantManagementForm = lazy(
  () =>
    import(
      /* webpackChunkName: "restaurant" */ "../../../../container/features/reservationFood/management/restaurant/RestaurantManagementForm"
    )
);
const RestaurantDeleteConfirmation = lazy(
  () =>
    import(
      /* webpackChunkName: "restaurant" */ "../../../../container/features/reservationFood/management/restaurant/RestaurantDeleteConfirmation"
    )
);

const ManagementRestaurant = () => {
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
            <RestaurantManagementTable
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
            <RestaurantManagementForm
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
            <RestaurantDeleteConfirmation
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

export default ManagementRestaurant;
