import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import BlogCategoryDeleteConfirmation from "../../container/features/blogCategory/BlogCategoryDeleteConfirmation";



const BlogCategoryTable = lazy(
  () =>
    import(
      /* webpackChunkName: "BlogCategory" */ "../../container/features/blogCategory/BlogCategoryTable"
    )
);
const BlogCategoryForm = lazy(
  () =>
    import(
      /* webpackChunkName: "BlogCategory" */ "../../container/features/blogCategory/BlogCategoryForm"
    )
);

const BlogCategoryManagement = () => {
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
            <BlogCategoryTable
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
            <BlogCategoryForm
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        confirmation={
          <Suspense>
            <BlogCategoryDeleteConfirmation
              value={selectedRow ?? null}
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

export default BlogCategoryManagement;
