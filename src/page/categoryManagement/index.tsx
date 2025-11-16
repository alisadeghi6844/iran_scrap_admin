import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import CategoryDeleteConfirmation from "../../container/features/account/createUser/CreateUserDeleteConfirmation";
import CategoryAttributeForm from "../../container/features/category/CategoryAttributeForm";
import ShowAttributes from "../../container/features/category/ShowAttributes";

const CategoryTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Category" */ "../../container/features/category/CategoryTable"
    )
);
const CategoryForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Category" */ "../../container/features/category/CategoryForm"
    )
);

const Category = () => {
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
            {mode === "content" ? (
              <CategoryTable
                onRowClick={(name: string, row: any) => {
                  setMode(name);

                  if (row) {
                    setSelectedRow(row);
                  }
                }}
              />
            ) : null}
          </Suspense>
        }
        form={
          <Suspense>
            {mode == "update" || mode == "create" || mode == "edit" ? (
              <CategoryForm
                id={selectedRow?._id ?? null}
                mode={mode}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            ) : null}
          </Suspense>
        }
        confirmation={
          <Suspense>
            <CategoryAttributeForm
              id={selectedRow?._id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        detail={
          <Suspense>
            <ShowAttributes
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

export default Category;
