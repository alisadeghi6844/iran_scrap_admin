import { lazy } from "react";

export const ProductRequestsTable = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestsTable"
    )
);

export const ProductRequestDetailsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestDetailsModal"
    )
);

export const ProductRequestEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestEditModal"
    )
);

export const ProductRequestEditRequestModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestEditRequestModal"
    )
);

export const ProductRequestProvidersModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestProvidersModal"
    )
);

export const ProductRequestSuggestionsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestSuggestionsModal"
    )
);

export const ProductRequestApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestApprovalModal"
    )
);

export const ProductRequestRejectionModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestRejectionModal"
    )
);

export const ProductRequestDeliveryModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestDeliveryModal"
    )
);


