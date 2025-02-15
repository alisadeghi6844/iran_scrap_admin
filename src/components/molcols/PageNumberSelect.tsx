import React from "react";

import Box from "../box";
import Typography from "../typography/Typography";
import Button from "../button";
import { PageNumberSelectTypes } from "../../types/components/molcols/PageNumberSelectTypes";

const PageNumberSelect: React.FC<PageNumberSelectTypes> = (props) => {
  const { defaultValue, onChange } = props;
  const arr = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
    { label: "60", value: 60 },
    { label: "80", value: 80 },
    { label: "120", value: 120 },
  ];

  return (
    <Box className="inline-block w-[150px] rounded-lg p-4 shadow-lg">
      <Typography>چیدمان نمایش</Typography>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {arr.map(({ value, label }) => (
          <Button
            key={value}
            size="xs"
            variant={value === defaultValue ? "primary" : "cancel"}
            className=" hover:bg-primary-500 hover:text-white"
            onClick={() => {
              onChange(value);
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </Box>
  );
};

export default PageNumberSelect;
