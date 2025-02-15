import React, { useEffect, useState } from "react";
import Input from "../input";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Typography from "../typography/Typography";
import useDebounce from "../../hooks/UseDebounce";

interface PaginationProps {
  page: any;
  totalPages: any;
  setChangePage: (page: any) => void;
  inputWidth?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { page, totalPages, setChangePage, inputWidth = "34px" } = props;

  const [pageNumber, setPageNumber] = useState<any>(page);
  const [internalChange, setInternalChange] = useState<boolean>(false);

  useEffect(() => {
    if (!internalChange) {
      setPageNumber(page);
    }
    setInternalChange(false);
  }, [page]);

  useDebounce(
    () => {
      if (pageNumber !== page) {
        setChangePage(pageNumber);
        window.scrollTo(0,0)
      }
    },
    [pageNumber],
    600
  );

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev:any) => prev - 1);
      setInternalChange(true);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev:any) => prev + 1);
      setInternalChange(true);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setPageNumber(value);
      setInternalChange(true);

    }
  };

  return (
    <>
      {totalPages > 1 ? (
        <div className="flex items-center gap-x-3">
          <div className="flex items-center">
            <FaChevronRight
              className="cursor-pointer"
              onClick={handlePrevPage}
            />
            <FaChevronLeft
              className="cursor-pointer fill-grey-900"
              onClick={handleNextPage}
            />
          </div>
          <div
            style={{
              width: `calc(${inputWidth} + ${
                pageNumber.toString().length > 1
                  ? pageNumber.toString().length * 5.4
                  : 0
              }px)`,
            }}
          >
            <Input
              name="Page"
              type="number"
              size="sm"
              className="w-full"
              value={pageNumber}
              onChange={handleChangeInput}
              onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
            />
          </div>
          <div className="flex">
            <Typography className="pl-2">از</Typography>
            <Typography>{totalPages}</Typography>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
