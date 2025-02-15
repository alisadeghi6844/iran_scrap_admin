import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionControls from "../../../organism/CollectionControls";
import Button from "../../../../components/button";
import { PublicDictionary } from "../../../../utils/dictionary";
import Table from "../../../../components/table";
import TableHead from "../../../../components/table/TableHead";
import TableRow from "../../../../components/table/TableRow";
import TableHeadCell from "../../../../components/table/TableHeadCell";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableSkeleton from "../../../organism/skeleton/TableSkeleton";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "../../../../components/image/index";
import TableFilterCell from "../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../components/molcols/formik-fields/SearchInputField";
import {
  selectGetAllCreateUserData,
  selectGetAllCreateUserLoading,
} from "../../../../redux/slice/account/CreateUserSlice";
import { getAllCreateUserAction } from "../../../../redux/actions/account/CreateUser";
import { HandleFilterParams } from "../../../../types/FilterParams";
import EmptyImage from "../../../../components/image/EmptyImage";
import { TbPasswordUser } from "react-icons/tb";
import GenderSelect from "../../GenderSelect";
import StatusSelect from "../../StatusSelect";

interface CreateUserTableTypes {
  onRowClick?: any;
}

const CreateUserTable: React.FC<CreateUserTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FirstName: "",
    LastName: "",
    NationalCode: "",
    PersonnelCode: "",
    PhoneNumber: "",
    Gender: null,
    Status: null,
  };

  const loading = useSelector(selectGetAllCreateUserLoading);
  const data = useSelector(selectGetAllCreateUserData);

  useEffect(() => {
    dispatch(getAllCreateUserAction());
  }, []);

  const handleFilter = ({
    filter,
    search,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      getAllCreateUserAction({
        filter,
        search,
        page,
        pageSize,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const {
      FirstName,
      LastName,
      NationalCode,
      PersonnelCode,
      PhoneNumber,
      Gender,
      Status,
    } = data;
    let queryParam = "";
    if (FirstName) queryParam += "firstName=" + FirstName + ",";
    if (LastName) queryParam += "lastName=" + LastName + ",";
    if (NationalCode) queryParam += "nationalCode=" + NationalCode + ",";
    if (PersonnelCode) queryParam += "personnelCode=" + PersonnelCode + ",";
    if (PhoneNumber) queryParam += "phoneNumber=" + PersonnelCode + ",";
    if (Gender?.label) queryParam += "gender=" + Gender?.value + ",";
    if (Status?.label) queryParam += "isActive=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  return (
    <CollectionControls
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      buttons={["filter", "create"]}
      data={data}
      createTitle="ایجاد کاربر جدید"
      onMetaChange={handleFilter}
      onButtonClick={(button: any) => {
        if (!!onRowClick) {
          button === "create" && onRowClick("create");
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell className="w-[140px]">
              {PublicDictionary?.food_image}
            </TableHeadCell>
            <TableHeadCell>{PublicDictionary?.first_name}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.last_name}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.nationalCode}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.personnelCode}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.phoneNumber}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.gender}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.status}</TableHeadCell>
            <TableHeadCell />
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell />

            <TableFilterCell>
              <SearchInputField name="FirstName" />
            </TableFilterCell>
            <TableFilterCell>
              <SearchInputField name="LastName" />
            </TableFilterCell>
            <TableFilterCell>
              <SearchInputField name="NationalCode" />
            </TableFilterCell>
            <TableFilterCell>
              <SearchInputField name="PersonnelCode" />
            </TableFilterCell>
            <TableFilterCell>
              <SearchInputField name="PhoneNumber" />
            </TableFilterCell>
            <TableFilterCell>
              <GenderSelect name="Gender" noBorder label="" />
            </TableFilterCell>
            <TableFilterCell>
              <StatusSelect name="Status" noBorder label="" />
            </TableFilterCell>
            <TableFilterCell />
            <TableFilterCell />
          </TableRow>
          {!loading ? (
            data?.data?.length > 0 ? (
              data?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="w-[66px] h-[66px] rounded-full relative">
                      {row?.image?.length ? (
                        <Image
                          base64
                          src={row?.image[0]?.file}
                          className="w-full h-full rounded-full absolute top-0 right-0"
                        />
                      ) : (
                        <>
                          {row?.gender == 0 ? (
                            <Image
                              src="/images/avatar_9.png"
                              className="w-full h-full rounded-full absolute top-0 right-0"
                            />
                          ) : row?.gender == 1 ? (
                            <Image
                              src="/images/MuiAvatar.png"
                              className="w-full h-full rounded-full absolute top-0 right-0"
                            />
                          ) : (
                            <Image
                              src="/images/core/placeholder.png"
                              className="w-full h-full rounded-full absolute top-0 right-0"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{row?.firstName ?? "_"}</TableCell>
                  <TableCell>{row?.lastName ?? "_"}</TableCell>
                  <TableCell>{row?.nationalCode ?? "_"}</TableCell>
                  <TableCell>{row?.personnelCode ?? "_"}</TableCell>
                  <TableCell>{row?.phoneNumber ?? "_"}</TableCell>
                  <TableCell className="min-w-[160px]">
                    {row?.gender == 0 ? "مرد" : row?.gender == 1 ? "زن" : "_"}
                  </TableCell>
                  <TableCell className="min-w-[160px]">
                    {row?.isActive ? (
                      <div className="py-1 px-3 rounded-lg bg-success-50 text-success-500">
                        فعال
                      </div>
                    ) : (
                      <div className="py-1 px-3 rounded-lg bg-error-50 text-error-500">
                        غیر فعال
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                    className="justify-center"
                  >
                    <Button
                      startIcon={<TbPasswordUser className="text-xl" />}
                      type="button"
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                    >
                      {PublicDictionary.change_password}
                    </Button>
                  </TableCell>
                  <TableCell
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                    className="justify-center"
                  >
                    <Button
                      startIcon={<FaRegEdit className="text-xl" />}
                      type="button"
                      variant="outline-success"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                    >
                      {PublicDictionary.edit}
                    </Button>
                    <Button
                      startIcon={<FaRegTrashCan className="text-lg" />}
                      type="button"
                      variant="outline-error"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        onRowClick && onRowClick("delete", row);
                      }}
                    >
                      {PublicDictionary.delete}
                    </Button>
                  </TableCell>
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
  );
};
export default CreateUserTable;
