import {
  FaChartBar,
  FaHeadphones,
  FaHome,
  FaProjectDiagram,
  FaRegCalendarAlt,
  FaShoppingCart,
  FaUserAlt,
  FaUserCheck,
  FaUserEdit,
  FaVoicemail,
} from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { MdAccessibility, MdManageHistory, MdOutlineFindInPage, MdOutlineSettingsPhone, MdOutlineSpaceDashboard, MdOutlineWorkHistory } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { PiQueueBold, PiVideoConference } from "react-icons/pi";
import { GiVideoConference } from "react-icons/gi";
import { HiQueueList } from "react-icons/hi2";
import { TbMessageReport, TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";


export const IconOptions = [
  { value: "Home", label: `Home`, icon: FaHome },
  { value: "User", label: "User", icon: FaUserAlt },
  { value: "ShoppingCart", label: "ShoppingCart", icon: FaShoppingCart },
  { value: "Calendar", label: "Calendar", icon: FaRegCalendarAlt },
  { value: "Access", label: "Access", icon: MdAccessibility },
  { value: "PageAccess", label: "PageAccess", icon: MdOutlineFindInPage },
  { value: "Role", label: "Role", icon: FaUserGear },
  { value: "RoleAccess", label: "RoleAccess", icon: FaUserCheck },
  { value: "CreateUser", label: "CreateUser", icon: FaUserEdit },
  { value: "MenuManagement", label: "MenuManagement", icon: RiMenu3Fill },
  { value: "MenuItemManagement", label: "MenuItemManagement", icon: BsFillMenuButtonWideFill },
  { value: "LogManagement", label: "LogManagement", icon: MdOutlineWorkHistory },
  { value: "Setting", label: "Setting", icon: IoMdSettings },
  { value: "Diagram", label: "Diagram", icon: FaProjectDiagram },
  { value: "Conference", label: "Conference", icon: PiVideoConference },
  { value: "ActiveConference", label: "ActiveConference", icon: GiVideoConference},
  { value: "ManagementConference", label: "ManagementConference", icon: MdManageHistory},
  { value: "AccessQueue", label: "AccessQueue", icon: PiQueueBold},
  { value: "ManagementQueue", label: "ManagementQueue", icon: HiQueueList},
  { value: "ManagementCalls", label: "ManagementCalls", icon: MdOutlineSettingsPhone},
  { value: "Reports", label: "Reports", icon: TbReportAnalytics},
  { value: "VoiceMail", label: "VoiceMail", icon: FaVoicemail},
  { value: "DashboardReports", label: "DashboardReports", icon: TfiDashboard},
  { value: "LocalReports", label: "LocalReports", icon: MdOutlineSpaceDashboard},
  { value: "Report", label: "Report", icon: TbMessageReport},
  { value: "InternalReports", label: "InternalReports", icon: TbReportSearch},
  { value: "QueueChart", label: "QueueChart", icon: FaChartBar},
  { value: "Phone", label: "Phone", icon: FaHeadphones},
  { value: "Profile", label: "Profile", icon: CgProfile},
];
