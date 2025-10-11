import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import ShipmentDeleteConfirmation from "../../container/features/shipment/ShipmentDeleteConfirmation";

const ShipmentTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Shipment" */ "../../container/features/shipment/ShipmentTable"
    )
);
const ShipmentForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Shipment" */ "../../container/features/shipment/ShipmentForm"
    )
);

const ShipmentManagement = () => {
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
        confirmModalSize="xl"
        mode={mode}
        content={
          <Suspense>
            <ShipmentTable
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
            <ShipmentForm
              value={selectedRow ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
                setSelectedRow({}); // Reset selected row
              }}
            />
          </Suspense>
        }
        confirmation={
          <Suspense>
            <ShipmentDeleteConfirmation
              id={selectedRow?.id ?? null}
              mode={mode}
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

export default ShipmentManagement;