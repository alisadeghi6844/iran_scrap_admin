import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const ProductTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Product" */ "../../container/features/product/ProductTable"
    )
);
const ProductEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "Product" */ "../../container/features/product/ProductEditModal"
    )
);

const ProductManagement = () => {
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
            <ProductTable
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
            <ProductEditModal
              id={selectedRow?._id ?? null}
              product={selectedRow ?? {}}
              mode={mode}
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

export default ProductManagement;