import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import ProductPriceDeleteConfirmation from "../../container/features/productPrice/ProductPriceDeleteConfirmation";
// import CategoryAttributeForm from "../../container/features/category/CategoryAttributeForm";
// import ShowAttributes from "../../container/features/category/ShowAttributes";

const ProductPriceTable = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductPrice" */ "../../container/features/productPrice/ProductPriceTable"
    )
);
const ProductPriceForm = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductPrice" */ "../../container/features/productPrice/ProductPriceForm"
    )
);

const ProductPriceManagement = () => {
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
            <ProductPriceTable
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
            <ProductPriceForm
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
            <ProductPriceDeleteConfirmation
              id={selectedRow?._id ?? null}
              mode={mode}
              onSubmit={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        // detail={
        //   <Suspense>
        //     <ShowAttributes
        //       value={selectedRow ?? {}}
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

export default ProductPriceManagement;
