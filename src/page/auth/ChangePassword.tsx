import { lazy, Suspense } from "react";
import CRUD from "../../container/organism/CRUD";
const ChangePasswordContent = lazy(() =>
    import("../../container/features/account/ChangePasswordContent")
  );
  
const ChangePassword =()=>{
    return(
        <CRUD
        content={
          <Suspense>
            <ChangePasswordContent />
          </Suspense>
        }
      />
    )
}

export default ChangePassword;