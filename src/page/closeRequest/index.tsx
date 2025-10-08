import React, { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUD from "../../container/organism/CRUD";
import OpenRequestDetail from "../../container/features/openRequest/OpenRequestDetail";
import { VerifyRequestPaymentAction } from "../../redux/actions/requestOrder/RequestOrderActions";
import {
  selectVerifyRequestPaymentLoading,
  selectVerifyRequestPaymentData,
} from "../../redux/slice/requestOrder/requestOrderSlice";

const CloseRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestTable"
    )
);
const CloseRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestForm"
    )
);
const RequestOrderPaymentModal = lazy(
  () =>
    import(
      /* webpackChunkName: "RequestOrderPayment" */ "../../container/features/requestOrder/RequestOrderPaymentModal"
    )
);

const CloseRequest = () => {
  const dispatch: any = useDispatch();
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<any>({});

  const verifyRequestPaymentLoading = useSelector(selectVerifyRequestPaymentLoading);
  const verifyRequestPaymentData = useSelector(selectVerifyRequestPaymentData);

  const handleRequestPayment = (requestOrderId: string) => {
    dispatch(
      VerifyRequestPaymentAction({
        requestOrderId,
        verified: true,
        comment: "پرداخت توسط خریدار انجام شد",
        onSubmitForm: () => {
          setMode("content");
          setSelectedRow({});
        },
      })
    );
  };

  const handleClosePaymentModal = () => {
    if (!verifyRequestPaymentLoading) {
      setMode("content");
      setSelectedRow({});
    }
  };

  // Handle successful payment response
  useEffect(() => {
    if (verifyRequestPaymentData?.status === 200) {
      setMode("content");
      setSelectedRow({});
    }
  }, [verifyRequestPaymentData]);

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <CRUD
        formModalSize="2xl"
        mode={mode}
        content={
          <Suspense>
            <CloseRequestTable
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
            <CloseRequestForm
              handleSubmit={() => setMode("content")}
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        }
        detail={
          <Suspense>
            <OpenRequestDetail
              handleSubmit={() => setMode("content")}
              id={selectedRow ?? null}
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

      {/* Render RequestOrderPaymentModal separately outside CRUD */}
      {mode === "payment" && (
        <Suspense>
          <RequestOrderPaymentModal
            isOpen={true}
            onClose={handleClosePaymentModal}
            requestOrder={selectedRow}
            onPayment={handleRequestPayment}
            loading={verifyRequestPaymentLoading}
          />
        </Suspense>
      )}
    </div>
  );
};

export default CloseRequest;
