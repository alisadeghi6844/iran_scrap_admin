import React, { useEffect, useState } from "react"; // useState را اضافه کنید
import { useDispatch, useSelector } from "react-redux";
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
import {
  selectGetUsersData,
  selectGetUsersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersAction } from "../../../redux/actions/users/UsersActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Checkbox from "../../../components/checkbox";
import Button from "../../../components/button";
import { UpdateRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";

interface UsersTableTypes {
  onRowClick?: any;
  id?:any;
  setCloseModal?:any
}

const UsersTable: React.FC<UsersTableTypes> = (props) => {
  const { onRowClick,id,setCloseModal } = props;

  const dispatch: any = useDispatch();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); // وضعیت برای نگهداری آی‌دی‌های انتخاب شده

  const filterDefaultInitialValues = {
    firstName: "",
    lastName: null,
    phoneNumber: null,
  };

  const loading = useSelector(selectGetUsersLoading);
  const usersData = useSelector(selectGetUsersData);

  useEffect(() => {
    dispatch(GetUsersAction({ credentials: { page: 0, size: 20,usertype:"Provider" } }));
  }, []);

  const handleFilter = ({
    filter,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      GetUsersAction({
        credentials: {
          filter,
          page: page ?? 0,
          size: pageSize??20,
          firstName: filter.firstName,
          lastName: filter.lastName,
          mobile: filter.phoneNumber,
          usertype:"Provider"
        },
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { firstName, lastName, phoneNumber } = data;
    const queryParams: { [key: string]: string | null } = {};

    if (firstName) queryParams.firstName = firstName;
    if (lastName) queryParams.lastName = lastName;
    if (phoneNumber) queryParams.phoneNumber = phoneNumber;

    return queryParams;
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // اگر کاربر قبلاً انتخاب شده بود، آن را حذف کن
          : [...prevSelected, userId] // در غیر این صورت، آن را اضافه کن
    );
  };

  const onSuccess=()=>{
    setCloseModal(false)
  }

  const handleRegisterBuyers = () => {

    dispatch(UpdateRequestProductAdminAction({credentials:id,item:{
      providerIds:selectedUserIds
    },onSuccess}))
  };

  return (
    <>
      <div className="flex justify-end -mb-3">
        <Button
          onClick={handleRegisterBuyers}
          disable={!selectedUserIds?.length}
        >
          ثبت فروشندگان
        </Button>
      </div>
      <CollectionControls
        hasBox={false}
        filterInitialValues={filterDefaultInitialValues}
        onFilter={handleFilterParameters}
        data={usersData?.data}
        onMetaChange={handleFilter}
        onButtonClick={(button) => {
          if (!!onRowClick) {
            button === "create" && onRowClick("create");
          }
        }}
      >
        <Table className="w-full" isLoading={false} shadow={false}>
          <TableHead className="w-full" isLoading={false} shadow={false}>
            <TableRow>
              <TableHeadCell>انتخاب</TableHeadCell> {/* ستون انتخاب */}
              <TableHeadCell>نام</TableHeadCell>
              <TableHeadCell>نام خانوادگی</TableHeadCell>
              <TableHeadCell>تلفن همراه</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableFilterCell />
              <TableFilterCell>
                <SearchInputField name="firstName" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="lastName" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="phoneNumber" />
              </TableFilterCell>
            </TableRow>
            {!loading ? (
              usersData?.data?.data?.length > 0 ? (
                usersData?.data?.data?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUserIds.includes(row?.id)} // چک باکس بر اساس انتخاب‌ها
                        onChange={() => handleCheckboxChange(row?.id)} // مدیریت تغییرات چک باکس
                      />
                    </TableCell>
                    <TableCell>{row?.firstName ?? "_"}</TableCell>
                    <TableCell>{row?.lastName ?? "_"}</TableCell>
                    <TableCell>{row?.mobile ?? "_"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colspan="9" className="flex justify-center !py-4">
                    <EmptyImage />
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colspan="9" className="flex justify-center !py-4">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CollectionControls>
    </>
  );
};

export default UsersTable;
