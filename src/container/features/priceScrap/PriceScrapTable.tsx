import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import moment from "jalali-moment";
import Typography from "../../../components/typography/Typography";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

import {
  selectGetPriceScrapProductsLoading,
  selectGetPriceScrapProductsData,
} from "../../../redux/slice/priceScrap/PriceScrapSlice";
import { GetPriceScrapProductsAction } from "../../../redux/actions/priceScrap/PriceScrapActions";

interface PriceDto {
  _id: string;
  product_id: string;
  wholesale_price: number;
  retail_price: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryDto {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductItem {
  _id: string;
  name: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryDto | null;
  prices: PriceDto[];
}

interface PriceScrapTableTypes {
  onRowClick?: (action: string, row: ProductItem) => void;
}

// Fluctuation tooltip component (color & icon intensity based on change percentage)
const FluctuationTooltip: React.FC<{ 
  fluctuation: { percentage: number; isIncrease: boolean | null } 
}> = ({ fluctuation }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Determine intensity level based on change percentage
  const change = fluctuation.percentage;
  const isStable = fluctuation.isIncrease === null;
  let textColorClass = "text-gray-600";
  let iconColorClass = "text-gray-500";
  let badgeClass = "bg-gray-100";

  if (isStable || change < 0.5) {
    // ثابت - خاکستری
    textColorClass = "text-gray-600";
    iconColorClass = "text-gray-500";
    badgeClass = "bg-gray-100";
  } else if (fluctuation.isIncrease) {
    // افزایشی - طیف سبز
    if (change < 2) {
      textColorClass = "text-green-600";
      iconColorClass = "text-green-500";
      badgeClass = "bg-green-50";
    } else if (change < 5) {
      textColorClass = "text-green-700";
      iconColorClass = "text-green-600";
      badgeClass = "bg-green-100";
    } else {
      textColorClass = "text-green-800";
      iconColorClass = "text-green-700";
      badgeClass = "bg-green-200";
    }
  } else {
    // کاهشی - طیف قرمز
    if (change < 2) {
      textColorClass = "text-red-600";
      iconColorClass = "text-red-500";
      badgeClass = "bg-red-50";
    } else if (change < 5) {
      textColorClass = "text-red-700";
      iconColorClass = "text-red-600";
      badgeClass = "bg-red-100";
    } else {
      textColorClass = "text-red-800";
      iconColorClass = "text-red-700";
      badgeClass = "bg-red-200";
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`inline-flex items-center gap-1 font-medium cursor-pointer px-2 py-0.5 rounded-full text-xs ${badgeClass}`}
      >
        {isStable ? null : (
          fluctuation.isIncrease ? (
            <FaArrowUp className={`text-[10px] ${iconColorClass}`} />
          ) : (
            <FaArrowDown className={`text-[10px] ${iconColorClass}`} />
          )
        )}
        <span className={textColorClass}>
          {isStable ? "ثابت" : `${fluctuation.percentage.toFixed(1)}%`}
        </span>
      </div>
      
      {/* Tooltip */}
      {showTooltip && tooltipPosition && (
        <div
          className="absolute z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 35}px`,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap"
          }}
        >
          <div className="font-medium">
            {fluctuation.isIncrease === null 
              ? "نوسان: ثابت" 
              : `نوسان: ${fluctuation.percentage.toFixed(2)}%`}
          </div>
          <div className="text-gray-300 text-[10px] mt-0.5">
            {fluctuation.isIncrease === null 
              ? "بدون تغییر" 
              : fluctuation.isIncrease 
                ? "افزایش قیمت" 
                : "کاهش قیمت"}
          </div>
        </div>
      )}
    </div>
  );
};

// Interactive line chart component for 7-day trend with hover tooltip
const TrendChart: React.FC<{ prices: PriceDto[]; priceType?: "wholesale" | "retail" }> = ({
  prices,
  priceType = "retail",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!prices || prices.length === 0) {
    return <div className="w-full h-10 flex items-center justify-center text-gray-400">-</div>;
  }

  // Get last 7 prices based on createdAt, and sort them chronologically (oldest -> newest) for chart
  const sortedByDateAsc = [...prices].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const last7Prices = sortedByDateAsc.slice(
    Math.max(sortedByDateAsc.length - 7, 0)
  );
  
  if (last7Prices.length < 2) {
    return <div className="w-full h-10 flex items-center justify-center text-gray-400">-</div>;
  }

  // Calculate min and max for scaling based on price type
  const allPrices = last7Prices.map(p => priceType === 'wholesale' ? p.wholesale_price : p.retail_price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  // Determine trend color based on percentage change and intensity
  const firstPrice = last7Prices[0]?.[priceType === 'wholesale' ? 'wholesale_price' : 'retail_price'] || 0;
  const lastPrice = last7Prices[last7Prices.length - 1]?.[priceType === 'wholesale' ? 'wholesale_price' : 'retail_price'] || 0;
  let color = "#6b7280"; // default gray for stable
  
  if (firstPrice > 0) {
    const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;
    const absChangePercent = Math.abs(changePercent);
    
    if (absChangePercent < 0.5) {
      // ثابت - خاکستری
      color = "#6b7280";
    } else if (changePercent > 0) {
      // افزایشی - طیف سبز
      if (absChangePercent < 2) {
        color = "#22c55e"; // سبز روشن
      } else if (absChangePercent < 5) {
        color = "#16a34a"; // سبز متوسط
      } else {
        color = "#15803d"; // سبز تیره
      }
    } else {
      // کاهشی - طیف قرمز
      if (absChangePercent < 2) {
        color = "#f87171"; // قرمز روشن
      } else if (absChangePercent < 5) {
        color = "#ef4444"; // قرمز متوسط
      } else {
        color = "#dc2626"; // قرمز تیره
      }
    }
  }

  // Calculate points for line chart (SVG coordinates: 0,0 is top-left)
  const width = 80;
  const height = 16;
  const chartData = last7Prices.map((price, index) => {
    const x = (index / (last7Prices.length - 1 || 1)) * (width - 4) + 2;
    const priceValue = priceType === 'wholesale' ? price.wholesale_price : price.retail_price;
    const normalizedPrice = (priceValue - minPrice) / priceRange;
    const y = height - 2 - normalizedPrice * (height - 4);
    return { x, y, price: priceValue, date: price.createdAt };
  });

  const points = chartData.map(d => `${d.x},${d.y}`).join(" ");

  // Format price with thousand separators
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return moment(dateString).format("jYYYY/jMM/jDD");
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHoveredIndex(index);
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPosition(null);
  };

  return (
    <div ref={containerRef} className="w-full h-8 flex items-center relative">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        preserveAspectRatio="none"
        className="overflow-visible cursor-pointer"
        onMouseLeave={handleMouseLeave}
      >
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Interactive points */}
        {chartData.map((point, index) => (
          <g key={index}>
            {/* Invisible larger circle for easier hover */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="transparent"
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{ cursor: "pointer" }}
            />
            {/* Visible point */}
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? "2.5" : "1.5"}
              fill={hoveredIndex === index ? color : "#fff"}
              stroke={color}
              strokeWidth={hoveredIndex === index ? "1.5" : "1"}
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{ cursor: "pointer", transition: "all 0.2s" }}
            />
          </g>
        ))}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && tooltipPosition && (
        <div
          className="absolute z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 45}px`,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap"
          }}
        >
          <div className="font-medium">{formatPrice(chartData[hoveredIndex].price)} تومان</div>
          <div className="text-gray-300 text-[10px] mt-0.5">
            {formatDate(chartData[hoveredIndex].date)}
          </div>
        </div>
      )}
    </div>
  );
};

const PriceScrapTable: React.FC<PriceScrapTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false);

  const loading = useSelector(selectGetPriceScrapProductsLoading);
  const productsData = useSelector(selectGetPriceScrapProductsData);

  // Refs for intervals
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Constants
  const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

  // Fetch data function
  const fetchData = useCallback((meta?: { page?: number; pageSize?: number; filter?: string }, showNotification: boolean = false) => {
    dispatch(GetPriceScrapProductsAction({
      page: meta?.page ?? 0,
      size: meta?.pageSize ?? 20,
      filter: meta?.filter
    }));
    if (showNotification) {
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    }
  }, [dispatch]);

  // Handle filter and pagination
  const handleFilter = useCallback(({ filter, page, pageSize }: HandleFilterParams) => {
    fetchData({ page: page ?? 0, pageSize: pageSize ?? 20, filter });
  }, [fetchData]);

  // Load data on mount
  useEffect(() => {
    fetchData({ page: 0, pageSize: 20 }, false);
    setIsInitialLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    if (!isInitialLoad) {
      refreshIntervalRef.current = setInterval(() => {
        fetchData({ page: 0, pageSize: 20 }, false);
      }, REFRESH_INTERVAL);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [fetchData, isInitialLoad]);


  // Handle button click (update button)
  const handleButtonClick = useCallback(
    (action: string) => {
      if (action === "update") {
        fetchData({ page: 0, pageSize: 20 }, true);
      }
    },
    [fetchData]
  );

  // Format price with thousand separators
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // Calculate price range (min and max from last 2 days only)
  const getPriceRange = (prices: PriceDto[]): { 
    wholesale: { min: number; max: number } | null;
    retail: { min: number; max: number } | null;
  } | null => {
    if (!prices || prices.length === 0) return null;
    
    // Get last 2 prices (newest first, so take first 2)
    const last2Prices = prices.slice(0, 2);
    
    if (last2Prices.length === 0) return null;
    
    const wholesalePrices = last2Prices.map((p) => p.wholesale_price);
    const retailPrices = last2Prices.map((p) => p.retail_price);
    
    return {
      wholesale: {
        min: Math.min(...wholesalePrices),
        max: Math.max(...wholesalePrices),
      },
      retail: {
        min: Math.min(...retailPrices),
        max: Math.max(...retailPrices),
      },
    };
  };

  // Calculate days span from prices array (based on oldest & newest createdAt in array)
  const getDaysSpan = (prices: PriceDto[]): number => {
    if (!prices || prices.length === 0) return 0;

    // Use timestamps to avoid dependency on array ordering
    const timestamps = prices
      .map((p) => new Date(p.createdAt).getTime())
      .filter((t) => !Number.isNaN(t));

    if (timestamps.length === 0) return 0;

    const minTime = Math.min(...timestamps);
    const maxTime = Math.max(...timestamps);

    // Difference in full days + 1 to include both endpoints
    const diffInDays = Math.floor((maxTime - minTime) / (1000 * 60 * 60 * 24));

    return diffInDays + 1;
  };

  // Calculate fluctuation percentage from OLDEST to NEWEST based on WHOLESALE price (تومان)
  const getTodayFluctuation = (prices: PriceDto[]): { percentage: number; isIncrease: boolean | null } | null => {
    if (!prices || prices.length < 2) return null;

    // Sort prices by createdAt (oldest first) to compare from first date to last date
    const sorted = [...prices].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Use wholesale_price for fluctuation logic
    const first = sorted[0].wholesale_price;
    const last = sorted[sorted.length - 1].wholesale_price;

    if (first === 0) return null;

    // If prices are exactly equal, treat as stable
    if (last === first) {
      return {
        percentage: 0,
        isIncrease: null, // null means stable/no change
      };
    }

    const percentage = ((last - first) / first) * 100;
    const absPercentage = Math.abs(percentage);

    return {
      percentage: absPercentage,
      isIncrease: percentage > 0,
    };
  };

  // Calculate fluctuation percentage from OLDEST to NEWEST based on RETAIL price (تومان)
  const getTodayFluctuationRetail = (prices: PriceDto[]): { percentage: number; isIncrease: boolean | null } | null => {
    if (!prices || prices.length < 2) return null;

    // Sort prices by createdAt (oldest first) to compare from first date to last date
    const sorted = [...prices].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Use retail_price for fluctuation logic
    const first = sorted[0].retail_price;
    const last = sorted[sorted.length - 1].retail_price;

    if (first === 0) return null;

    // If prices are exactly equal, treat as stable
    if (last === first) {
      return {
        percentage: 0,
        isIncrease: null, // null means stable/no change
      };
    }

    const percentage = ((last - first) / first) * 100;
    const absPercentage = Math.abs(percentage);

    return {
      percentage: absPercentage,
      isIncrease: percentage > 0,
    };
  };

  // Get category color dot based on slug
  const getCategoryColor = (categorySlug: string): string => {
    const slug = categorySlug.toLowerCase();
    if (slug.includes("iron") || slug.includes("آهن")) {
      return "#374151"; // Dark gray for iron
    }
    if (slug.includes("copper") || slug.includes("مس")) {
      return "#f97316"; // Orange for copper
    }
    if (slug.includes("aluminum") || slug.includes("آلومینیوم")) {
      return "#a855f7"; // Purple for aluminum
    }
    if (slug.includes("brass") || slug.includes("برنج")) {
      return "#eab308"; // Yellow for brass
    }
    return "#6b7280"; // Default gray
  };

  return (
    <CollectionControls
      hasBox={false}
      isLoading={loading}
      data={productsData}
      buttons={["update"]}
      onButtonClick={handleButtonClick}
      onMetaChange={handleFilter}
    >
      {/* Main Header */}
      <div className="mb-6">
        <Typography tag="h1" className="text-2xl font-bold text-gray-900 mb-4">
          بازه قیمتهای ضایعات
        </Typography>

        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiCheck className="w-5 h-5" />
              <Typography className="text-sm font-medium">
                قیمت ها بروزرسانی شده
              </Typography>
            </div>
            <button
              onClick={() => setShowSuccessNotification(false)}
              className="hover:opacity-80"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>کالا / دسته بندی</TableHeadCell>
            <TableHeadCell>واحد</TableHeadCell>
            <TableHeadCell>قیمت عمده (تومان)</TableHeadCell>
            <TableHeadCell>قیمت خرده (تومان)</TableHeadCell>
            <TableHeadCell>نوسان امروز (عمده)</TableHeadCell>
            <TableHeadCell>روند (عمده)</TableHeadCell>
            <TableHeadCell>نوسان امروز (خرده)</TableHeadCell>
            <TableHeadCell>روند (خرده)</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            productsData?.data && productsData.data.length > 0 ? (
              productsData.data.map((row: ProductItem) => {
                const priceRange = getPriceRange(row.prices);
                const fluctuation = getTodayFluctuation(row.prices);
                const fluctuationRetail = getTodayFluctuationRetail(row.prices);
                const categoryColor = row.category
                  ? getCategoryColor(row.category.slug)
                  : "#6b7280";

                return (
                  <TableRow key={row._id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{row.name}</div>
                          {row.category && (
                            <div className="text-xs text-gray-500 mt-1">
                              {row.category.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">کیلوگرم</div>
                    </TableCell>
                    <TableCell>
                      {priceRange?.wholesale ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {formatPrice(priceRange.wholesale.min)} - {formatPrice(priceRange.wholesale.max)} تومان
                          </div>
                          {getDaysSpan(row.prices) > 0 && (
                            <div className="text-xs text-gray-400 mt-1">
                              {getDaysSpan(row.prices)} روز اخیر
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {priceRange?.retail ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {formatPrice(priceRange.retail.min)} - {formatPrice(priceRange.retail.max)} تومان
                          </div>
                          {getDaysSpan(row.prices) > 0 && (
                            <div className="text-xs text-gray-400 mt-1">
                              {getDaysSpan(row.prices)} روز اخیر
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {fluctuation ? (
                        <FluctuationTooltip fluctuation={fluctuation} />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <TrendChart prices={row.prices} priceType="wholesale" />
                    </TableCell>
                    <TableCell>
                      {fluctuationRetail ? (
                        <FluctuationTooltip fluctuation={fluctuationRetail} />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <TrendChart prices={row.prices} priceType="retail" />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="flex justify-center !py-8">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="flex justify-center !py-8">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PriceScrapTable;
