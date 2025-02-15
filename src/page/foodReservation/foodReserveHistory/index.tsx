import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../../container/organism/CRUD";

const CurrentUserFoodHistory = lazy(
  () =>
    import(
      /* webpackChunkName: "food-history" */ "../../../container/features/reservationFood/FoodHistory/CurrentUserFoodHistory"
    )
);


const FoodReserveHistory = () => {
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
            <CurrentUserFoodHistory
              onRowClick={(name: string, row: any) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
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

export default FoodReserveHistory;
