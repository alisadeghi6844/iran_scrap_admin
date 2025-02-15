import React, { useEffect, useState } from "react";
import BigCalendar from "../../../../organism/calander/BigCalander";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodShowAction } from "../../../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";
import {
  selectGetAllFoodShowData,
  selectGetAllFoodShowLoading,
} from "../../../../../redux/slice/foodReservation/management/foodShow/FoodShowSlice";

interface FoodShowTableTypes {
  onRowClick?: any;
}

const FoodShowTable: React.FC<FoodShowTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const [currentDate, setCurrentDate] = useState("");

  const getData: any = useSelector(selectGetAllFoodShowData);
  const getLoading: any = useSelector(selectGetAllFoodShowLoading);

  useEffect(() => {
    if (currentDate) {
      dispatch(getAllFoodShowAction({ date: currentDate, pageSize: 10000 }));
    }
  }, [currentDate]);

  return (
    <div>
      <BigCalendar
        data={getData}
        loading={getLoading}
        onRowClick={(name: any, row: any) => onRowClick(name, row)}
        setCurrent={(e: any) => setCurrentDate(e)}
      />
    </div>
  );
};

export default FoodShowTable;
