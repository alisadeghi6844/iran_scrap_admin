import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";
import BlogDeleteConfirmation from "../../container/features/blog/BlogDeleteConfirmation";

const BlogTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Blog" */ "../../container/features/blog/BlogTable"
    )
);
const BlogForm = lazy(
  () =>
    import(
      /* webpackChunkName: "Blog" */ "../../container/features/blog/BlogForm"
    )
);

const BlogManagement = () => {
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
            <BlogTable
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
            <BlogForm
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
            <BlogDeleteConfirmation
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

export default BlogManagement;
