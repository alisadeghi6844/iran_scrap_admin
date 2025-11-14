import { lazy, Suspense } from "react";

const PurchasePriceTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PurchasePrice" */ "../../container/features/purchasePrice/PurchasePriceTable"
    )
);

const PurchasePriceManagement = () => {
  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <Suspense>
        <PurchasePriceTable />
      </Suspense>
    </div>
  );
};

export default PurchasePriceManagement;