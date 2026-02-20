import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { GetUsersStatisticAction } from "../../../redux/actions/users/UsersActions";
import {
  selectGetUsersStatisticData,
  selectGetUsersStatisticLoading,
} from "../../../redux/slice/users/UsersSlice";
import StatisticCard from "./StatisticCard";
import { FiUsers } from "react-icons/fi";
import { FaVenusMars, FaIdCard, FaFileSignature } from "react-icons/fa";
import { LuGitPullRequest, LuPackageOpen } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const UserStatisticsPage = () => {
  const dispatch: any = useDispatch();
  const [days, setDays] = useState(1);

  const loading = useSelector(selectGetUsersStatisticLoading);
  const statisticResponse = useSelector(selectGetUsersStatisticData);

  const fetchData = useCallback(
    (filter: { days: number }) => {
      dispatch(GetUsersStatisticAction({ credentials: filter }));
    },
    [dispatch]
  );

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  useEffect(() => {
    if (days > 0) {
      debouncedFetchData({ days });
    }
  }, [days, debouncedFetchData]);

  const statisticPayload = statisticResponse?.data;
  const stats = statisticPayload?.userStats || {};
  const totalUsers = statisticPayload?.totalUsers;
  const totalProducts = statisticPayload?.totalProducts;
  const totalProductRequests = statisticPayload?.totalProductRequests;
  const totalOrders = statisticPayload?.totalOrders;

  const statusToLabel = (id: string | null) => {
    if (id === null) return "نامشخص";
    switch (id) {
      case "PENDING":
        return "در انتظار";
      case "CONFIRMED":
        return "تایید شده";
      default:
        return id;
    }
  };

  const userTypeToLabel = (id: string | null) => {
    if (id === null) return "نامشخص";
    switch (id) {
      case "Provider":
        return "تامین کننده";
      case "Buyer":
        return "خریدار";
      default:
        return id;
    }
  };

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">آمار کلی</h1>
        <div className="w-48">
          <label htmlFor="days-input" className="block text-sm font-medium text-gray-700 mb-1">
            بازه زمانی (روز)
          </label>
          <input
            id="days-input"
            name="days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value) || 1)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticCard
          title="تعداد کل کاربران"
          total={totalUsers}
          loading={loading}
          icon={<FiUsers />}
          color="green"
        />
        <StatisticCard
          title="تعداد کل محصولات"
          total={totalProducts}
          loading={loading}
          icon={<MdOutlineProductionQuantityLimits />}
          color="amber"
        />
        <StatisticCard
          title="تعداد کل مناقصات"
          total={totalProductRequests}
          loading={loading}
          icon={<LuGitPullRequest />}
          color="orange"
        />
        <StatisticCard
          title="تعداد کل سفارشات"
          total={totalOrders}
          loading={loading}
          icon={<LuPackageOpen />}
          color="red"
        />
        <StatisticCard
          title="تفکیک نوع کاربر"
          data={stats.userTypeCategorization || []}
          loading={loading}
          icon={<FaVenusMars />}
          color="green"
          idToLabel={userTypeToLabel}
        />
        <StatisticCard
          title="تفکیک وضعیت کاربر"
          data={stats.userStatusCategorization || []}
          loading={loading}
          icon={<FaIdCard />}
          color="amber"
          idToLabel={statusToLabel}
        />

      </div>
    </div>
  );
};

export default UserStatisticsPage;
