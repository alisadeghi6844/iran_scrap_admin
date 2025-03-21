import { useState, useEffect, useRef } from "react";
import { Form, Formik, useFormikContext } from "formik";
import ReactPaginate from "react-paginate";

import Button from "../../components/button";
import { FiRefreshCw } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";
import { MdFilterAlt } from "react-icons/md";

import { FaRegFileExcel } from "react-icons/fa";

import Typography from "../../components/typography/Typography";
import PageNumberSelect from "../../components/molcols/PageNumberSelect";
import OutsideClickHandler from "react-outside-click-handler";
import { Tooltip } from "react-tooltip";
import { CollectionControlsProps } from "../../types/organism/CollectionControlsTypes";
import useDebounce from "../../hooks/UseDebounce";

interface FormObserverProps {
  onChange: (values: any) => void; // نوع values را می‌توانید با توجه به نیاز خود تغییر دهید
}

const FormObserver: React.FC<FormObserverProps> = ({ onChange }) => {
  const { values } = useFormikContext();
  useDebounce(
    () => {
      onChange(values);
    },
    [values],
    1000
  );
  return null;
};

// پیاده‌سازی ساده‌تر pagination
const SimplePagination = ({ 
  currentPage, 
  pageCount, 
  onPageChange 
}: { 
  currentPage: number, 
  pageCount: number, 
  onPageChange: (page: number) => void 
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        className="border rounded px-3 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50"
      >
        قبلی
      </Button>
      
      <span className="px-3 py-1">
        صفحه {currentPage + 1} از {pageCount}
      </span>
      
      <Button 
        onClick={() => currentPage < pageCount - 1 && onPageChange(currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        className="border rounded px-3 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50"
      >
        بعدی
      </Button>
    </div>
  );
};

const CollectionControls: React.FC<CollectionControlsProps> = (props) => {
  const {
    children,
    isLoading = false,
    buttons = [],
    buttonsAfter,
    buttonsBefore,
    onButtonClick,
    data,
    title,
    hasBox = true,
    onMetaChange,
    filterInitialValues,
    Filter,
    onFilter,
    createTitle,
    className,
    errorTitle,
    excelTitle,
    excelLoading = false,
  } = props;

  const [meta, setMeta] = useState<any>(); // نوع meta را می‌توانید با توجه به نیاز خود تغییر دهید
  const [filter, setFilter] = useState<string>("");
  const [pageNumberFilterOpen, setPageNumberFilterOpen] = useState<boolean>(false);
  
  // برای ذخیره صفحه فعلی
  const [currentPage, setCurrentPage] = useState<number>(0);
  // برای جلوگیری از فراخوانی‌های مکرر
  const isInitialMount = useRef(true);

  useEffect(() => {
    setMeta({
      page: data?.pageNumber ?? Number(data?.page) + 1,
      pageSize: data?.size,
      totalCount: data?.totalCount ?? data?.countAll,
      totalCountDisplay: data?.totalCountDisplay,
      totalPages: data?.totalPages,
      hasPreviousPage: data?.hasPreviousPage,
      hasNextPage: data?.hasNextPage,
      totalPagesDisplay: data?.totalPagesDisplay,
      pageCountAndCurrentLocationDisplay:
        data?.pageCountAndCurrentLocationDisplay,
      rowCounterNumber: data?.rowCounterNumber,
    });
    
    // به‌روزرسانی صفحه فعلی فقط وقتی data تغییر می‌کند
    if (data?.page !== undefined) {
      setCurrentPage(Number(data.page));
    }
    
    console.log("data", data);
  }, [data]);

  const handlePageChange = (page: number) => {
    // اگر صفحه انتخاب شده با صفحه فعلی متفاوت باشد، فقط در این صورت onMetaChange را فراخوانی کن
    if (page !== currentPage && onMetaChange) {
      onMetaChange({
        ...meta,
        filter: filter,
        page: page,
      });
    }
  };

  // محاسبه تعداد کل صفحات
  const pageCount = meta?.pageSize > 0 && meta?.totalCount > 0
    ? Math.ceil(Number(meta?.totalCount) / Number(meta?.pageSize))
    : 1;

  return (
    <div>
      <Formik
        validateOnBlur={false}
        validateOnChange={true}
        initialValues={filterInitialValues}
      >
        {(formProps) => (
          <Form>
            <FormObserver
              onChange={(values) => {
                if (onFilter) {
                  const queryString = onFilter(values);
                  if (filter !== queryString) {
                    setFilter(queryString);
                    onMetaChange &&
                      onMetaChange({
                        ...meta,
                        filter: queryString,
                      });
                  }
                }
              }}
            />
            <>
              {!!Filter && <div className="mt-4 ">{Filter}</div>}
              <Typography
                tag={hasBox ? "box" : undefined}
                className={`mb-5 mt-4 w-full ${
                  hasBox ? "border-2 px-10 py-2" : ""
                } ${className ? className : ""}`}
              >
                <div>
                  {/* Toolbar */}
                  <div>
                    {title && (
                      <Typography
                        tag="h4"
                        className={`text-grey-800 dark:text-dark-text-primary max-sm:text-[10px] sm:text-[12px] md:mb-1 md:text-[14px] lg:text-[14px]  xl:text-[16px]
                        ${errorTitle ? errorTitle : ""}`}
                      >
                        {title}
                      </Typography>
                    )}
                  </div>
                  <div className="flex justify-end p-0 max-md:mt-3">
                    <div className="xs:gap-0 mb-2 flex justify-start gap-2 md:justify-end ">
                      <div className="w-[370px]">{buttonsBefore}</div>
                      {buttons.includes("word") && (
                        <Button
                          variant="outline-secondary"
                          size="xs"
                          onClick={() => {
                            onButtonClick && onButtonClick("word");
                          }}
                        >
                          <LuClipboardCheck className="text-2xl" />
                        </Button>
                      )}
                      {buttons.includes("excel") && (
                        <Button
                          type="button"
                          loading={excelLoading ?? false}
                          variant="outline-success"
                          size="sm"
                          className="px-[5px] ml-2"
                          onClick={() => {
                            onButtonClick && onButtonClick("excel");
                          }}
                        >
                          {excelTitle}
                          <FaRegFileExcel className="mx-1 text-2xl" />
                        </Button>
                      )}
                      {buttons.includes("pdf") && (
                        <Button
                          variant="outline-secondary"
                          size="xs"
                          onClick={() => {
                            onButtonClick && onButtonClick("pdf");
                          }}
                        >
                          <LuClipboardCheck className="text-2xl" />
                        </Button>
                      )}
                      {buttons.includes("create") && (
                        <Button
                          type="button"
                          variant="outline-primary"
                          size="sm"
                          loading={isLoading}
                          className="px-[5px]"
                          onClick={() => {
                            onButtonClick && onButtonClick("create");
                          }}
                        >
                          {createTitle}
                          <TiPlus className="mx-1 text-2xl" />
                        </Button>
                      )}
                      {buttons.includes("update") && (
                        <Button
                          variant="outline-primary"
                          className={`px-[5px]`}
                          size="sm"
                          onClick={() => {
                            onButtonClick && onButtonClick("update");
                          }}
                        >
                          <FiRefreshCw className="text-2xl" />
                        </Button>
                      )}
                      {buttons.includes("filter") && (
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            setPageNumberFilterOpen(false);
                          }}
                        >
                          <div className="relative">
                            <Button
                              data-tooltip-id="md-filter"
                              data-tooltip-content="تعداد سطر"
                              variant="outline-primary"
                              className="px-[5px] mr-2"
                              size="sm"
                              onClick={() => {
                                setPageNumberFilterOpen((prev) => !prev);
                              }}
                            >
                              <MdFilterAlt className="text-2xl" />
                            </Button>
                            <Tooltip id="md-filter" />
                            {pageNumberFilterOpen && (
                              <div className="absolute left-8 top-8 z-10 ">
                                <PageNumberSelect
                                  defaultValue={meta?.pageSize ?? meta?.size}
                                  onChange={(number: any) => {
                                    setPageNumberFilterOpen(false);
                                    !!onMetaChange &&
                                      onMetaChange({
                                        ...meta,
                                        filter: filter,
                                        pageSize: number,
                                      });
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </OutsideClickHandler>
                      )}

                      {buttonsAfter}
                    </div>
                  </div>
                </div>
                {/* Children  */}
                <div>{children}</div>
                {!!data && (
                  <div className="flex justify-between pl-0">
                    <div>
                      <div className="py-4 mt-2">
                        {pageCount > 1 && (
                          <SimplePagination
                            currentPage={currentPage}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {buttons.includes("submit") && (
                        <>
                          <Typography>
                            توجه داشته باشید که پس از ثبت نهایی هیچگونه تغییری
                            در جدول امکان پذیر نیست.
                          </Typography>
                          <Button
                            variant="primary"
                            size="md"
                            className="px-8"
                            onClick={() => {
                              onButtonClick && onButtonClick("submit");
                            }}
                          >
                            ثبت نهایی
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Typography>
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CollectionControls;
