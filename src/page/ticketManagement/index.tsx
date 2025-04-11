import React, { lazy, Suspense, useState } from "react";
import CRUD from "../../container/organism/CRUD";

const TicketTable = lazy(
  () =>
    import(
      /* webpackChunkName: "Ticket" */ "../../container/features/ticket/TicketTable"
    )
);
// const TicketForm = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "Ticket" */ "../../container/features/ticket/TicketForm"
//     )
// );

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
        formModalSize="xl"
        confirmModalSize="xl"
        mode={mode}
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
        // form={
        //   <Suspense>
        //     <TicketForm
        //       id={selectedRow?._id ?? null}
        //       mode={mode}
        //       onSubmitForm={() => {
        //         setMode("content");
        //       }}
        //     />
        //   </Suspense>
        // }
        // confirmation={
        //   <Suspense>
        //     <TicketAttributeForm
        //       id={selectedRow?._id ?? null}
        //       mode={mode}
        //       onSubmitForm={() => {
        //         setMode("content");
        //       }}
        //     />
        //   </Suspense>
        // }
        //  detail={
        //    <Suspense>
        //      <ShowAttributes
        //        value={selectedRow ?? {}}
        //        onSubmit={() => {
        //          setMode("content");
        //        }}
        //      />
        //    </Suspense>
        //  }
        onModalClose={() => {
          setMode("content");
        }}
      />
    </div>
  );
};

export default Ticket;
