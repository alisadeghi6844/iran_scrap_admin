import React, { useEffect } from "react";
import { useFormikContext } from "formik";

type Props = {
  enabled: boolean;
  valuesFactory: () => any;
  deps: any[];
};

/**
 * Keeps behavior identical to the previous inline useEffect inside Formik render-prop:
 * when data is available and modal is open, force-set the full form values.
 */
const FormikValuesSync: React.FC<Props> = ({ enabled, valuesFactory, deps }) => {
  const { setValues } = useFormikContext<any>();

  useEffect(() => {
    if (enabled) {
      setValues(valuesFactory());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, setValues, valuesFactory, ...deps]);

  return null;
};

export default FormikValuesSync;


