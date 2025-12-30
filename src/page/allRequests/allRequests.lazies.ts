import { lazy } from "react";

export const ProductRequestAdminTable = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestAdmin" */ "../../container/features/productRequestAdmin/ProductRequestAdminTable"
    )
);

export const CloseRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestTable"
    )
);

export const OpenRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "openRequest" */ "../../container/features/openRequest/OpenRequestTable"
    )
);

export const ProductRequestAdminForm = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestAdmin" */ "../../container/features/productRequestAdmin/ProductRequestAdminForm"
    )
);

export const ProductRequestEditForm = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestEdit" */ "../../container/features/productRequestAdmin/ProductRequestEditForm"
    )
);

export const CloseRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestForm"
    )
);

export const OpenRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "openRequest" */ "../../container/features/openRequest/OpenRequestForm"
    )
);

export const RequestOrderPaymentModal = lazy(
  () =>
    import(
      /* webpackChunkName: "RequestOrderPayment" */ "../../container/features/requestOrder/RequestOrderPaymentModal"
    )
);

export const TenderRequestEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "TenderRequest" */ "../../container/features/tenderRequest/TenderRequestEditModal"
    )
);

export const FinancialApprovalTable = lazy(
  () =>
    import(
      /* webpackChunkName: "FinancialApproval" */ "../../container/features/financialApproval/FinancialApprovalTable"
    )
);

export const PendingDeliveryTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingDelivery" */ "../../container/features/pendingDelivery/PendingDeliveryTable"
    )
);

export const ProductRequestApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestApproval" */ "../../container/features/productRequest/ProductRequestApprovalModal"
    )
);

export const ProductRequestRejectionModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestRejection" */ "../../container/features/productRequest/ProductRequestRejectionModal"
    )
);

export const ProductRequestDetailsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestDetails" */ "../../container/features/productRequest/ProductRequestDetailsModal"
    )
);


