import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const TicketTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Ticket" */ "../../container/features/ticket/TicketTable"
    )
);

const TicketDetail = lazy(
  () =>
    import(
      /* webpackChunkName: "TicketDetail" */ "../../container/features/ticket/TicketDetail"
    )
);

const TicketAnswerForm = lazy(
  () =>
    import(
      /* webpackChunkName: "TicketAnswer" */ "../../container/features/ticket/TicketAnswerForm"
    )
);

const TicketCloseConfirm = lazy(
  () =>
    import(
      /* webpackChunkName: "TicketClose" */ "../../container/features/ticket/TicketCloseConfirm"
    )
);

const TicketForm = lazy(
  () =>
    import(
      /* webpackChunkName: "TicketForm" */ "../../container/features/ticket/TicketForm"
    )
);

const Ticket = () => {
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
        confirmModalSize="lg"
        detailModalSize="xl"
        formModalSize="lg"
        mode={mode}
        modalHeaders={{
          view: "مشاهده تیکت",
          answer: "پاسخ به تیکت", 
          close: "بستن تیکت",
          create: "ایجاد تیکت جدید",
          update: "ویرایش تیکت"
        }}
        content={
          <Suspense>
            <TicketTable
              onRowClick={(name: string, row: any) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        }
        detail={
          <Suspense>
            <TicketDetail
              ticket={selectedRow ?? {}}
              onSubmit={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        form={
          mode === "answer" ? (
            <Suspense>
              <TicketAnswerForm
                ticket={selectedRow ?? {}}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            </Suspense>
          ) : (mode === "create" || mode === "update") ? (
            <Suspense>
              <TicketForm
                id={selectedRow?._id ?? null}
                mode={mode}
                ticket={selectedRow}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            </Suspense>
          ) : null
        }
        confirmation={
          mode === "close" ? (
            <Suspense>
              <TicketCloseConfirm
                ticket={selectedRow ?? {}}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            </Suspense>
          ) : null
        }
        onModalClose={(fallbackMode: string) => {
          setMode(fallbackMode || "content");
        }}
      />
    </div>
  );
};

export default Ticket;
