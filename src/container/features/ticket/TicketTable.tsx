import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import Checkbox from "../../../components/checkbox";
import Button from "../../../components/button";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import TicketDetailModal from "./TicketDetailModal";
import TicketAnswerModal from "./TicketAnswerModal";
import TicketCloseModal from "./TicketCloseModal";
import { getSubjectLabel, getPriorityLabel, getStatusLabel } from "../../../utils/ticketHelpers";
import {
  selectGetTicketData,
  selectGetTicketLoading,
  selectCreateTicketData,
  selectUpdateTicketData,
  selectAnswerTicketData,
  selectCloseTicketData,
} from "../../../redux/slice/ticket/TicketSlice";
import {
  GetTicketAction,
} from "../../../redux/actions/ticket/TicketActions";

interface TicketTableTypes {
  onRowClick?: any;
}

const TicketTable: React.FC<TicketTableTypes> = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const filterDefaultInitialValues = {
    Title: "",
    Subject: null,
    Priority: null,
    Status: null,
  };

  const loading = useSelector(selectGetTicketLoading);
  const ticketData = useSelector(selectGetTicketData);
  const createData = useSelector(selectCreateTicketData);
  const updateData = useSelector(selectUpdateTicketData);
  const answerData = useSelector(selectAnswerTicketData);
  const closeData = useSelector(selectCloseTicketData);

  useEffect(() => {
    dispatch(GetTicketAction({ page: 0, size: 20 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetTicketAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Title, Subject, Priority, Status } = data as {
      Title?: string;
      Subject?: { label: string; value: string };
      Priority?: { label: string; value: string };
      Status?: { label: string; value: string };
    };
    let queryParam = "";
    if (Title) queryParam += "title=" + Title + ",";
    if (Subject?.label) queryParam += "subject=" + Subject?.value + ",";
    if (Priority?.label) queryParam += "priority=" + Priority?.value + ",";
    if (Status?.label) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (
      createData?.status == 201 || 
      updateData?.status == 200 || 
      answerData?.status == 200 || 
      answerData?.status == 201 ||
      closeData?.status == 200
    ) {
      dispatch(GetTicketAction({ page: 0, size: 20 }));
    }
  }, [createData, updateData, answerData, closeData, dispatch]);

  const handleCheckboxChange = (ticketId: string) => {
    setSelectedTicketIds((prevSelected) =>
      prevSelected.includes(ticketId)
        ? prevSelected.filter((id) => id !== ticketId)
        : [...prevSelected, ticketId]
    );
  };
  return (
    <>
      <CollectionControls
        buttons={[]}
        hasBox={false}
        filterInitialValues={filterDefaultInitialValues}
        onFilter={handleFilterParameters}
        data={ticketData}
        onMetaChange={handleFilter}
      >
        <Table className="w-full" isLoading={false} shadow={false}>
          <TableHead className="w-full" isLoading={false} shadow={false}>
            <TableRow>
              <TableHeadCell>انتخاب</TableHeadCell>
              <TableHeadCell>عنوان</TableHeadCell>
              <TableHeadCell>موضوع</TableHeadCell>
              <TableHeadCell>اولویت</TableHeadCell>
              <TableHeadCell>وضعیت</TableHeadCell>
              <TableHeadCell>کاربر</TableHeadCell>
              <TableHeadCell>تاریخ ایجاد</TableHeadCell>
              <TableHeadCell>عملیات</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell>
                <SearchInputField
                  name="Title"
                  noBorder
                  placeholder="جستجوی عنوان..."
                />
              </TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
            </TableRow>
            {!loading ? (
              ticketData?.data?.length > 0 ? (
                ticketData?.data?.map((row: any) => (
                  <TableRow key={row?._id}>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <Checkbox
                        checked={selectedTicketIds.includes(row?._id)}
                        onChange={() => handleCheckboxChange(row?._id)}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.title ?? "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {getSubjectLabel(row?.subject)}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row?.priority === "HIGH"
                            ? "bg-red-100 text-red-800"
                            : row?.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : row?.priority === "LOW"
                            ? "bg-primary-100 text-primary-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getPriorityLabel(row?.priority)}
                      </span>
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row?.status === "WAIT_FOR_ANSWER"
                            ? "bg-orange-100 text-orange-800"
                            : row?.status === "ANSWERED"
                            ? "bg-blue-100 text-blue-800"
                            : row?.status === "CLOSED"
                            ? "bg-gray-100 text-gray-800"
                            : row?.status === "OPEN"
                            ? "bg-primary-100 text-primary-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getStatusLabel(row?.status)}
                      </span>
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.user
                        ? `${row.user.firstName} ${row.user.lastName}`
                        : "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.createdAt
                        ? new Date(row.createdAt).toLocaleDateString("fa-IR")
                        : "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedTicketIds.includes(row?._id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            setSelectedTicket(row);
                            setShowDetailModal(true);
                          }}
                        >
                          مشاهده
                        </Button>
                        {row?.status !== "CLOSED" && (
                          <>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => {
                                setSelectedTicket(row);
                                setShowAnswerModal(true);
                              }}
                            >
                              پاسخ
                            </Button>
                            <Button
                              size="sm"
                              variant="error"
                              onClick={() => {
                                setSelectedTicket(row);
                                setShowCloseModal(true);
                              }}
                            >
                              بستن
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colspan="8" className="flex justify-center !py-4">
                    <EmptyImage />
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colspan="8" className="flex justify-center !py-4">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CollectionControls>

      {/* مودال جزئیات تیکت */}
      <TicketDetailModal
        ticket={selectedTicket}
        open={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedTicket(null);
        }}
      />

      {/* مودال پاسخ به تیکت */}
      <TicketAnswerModal
        ticket={selectedTicket}
        open={showAnswerModal}
        onClose={() => {
          setShowAnswerModal(false);
          setSelectedTicket(null);
        }}
        onSuccess={() => {
          // تیکت‌ها به‌روزرسانی می‌شوند از طریق useEffect
        }}
      />

      {/* مودال بستن تیکت */}
      <TicketCloseModal
        ticket={selectedTicket}
        open={showCloseModal}
        onClose={() => {
          setShowCloseModal(false);
          setSelectedTicket(null);
        }}
        onSuccess={() => {
          // تیکت‌ها به‌روزرسانی می‌شوند از طریق useEffect
        }}
      />
    </>
  );
};

export default TicketTable;
