import { LinkItemProps } from "../../types";
import {
  FiHome,
  FiImage,
  FiSettings,
  FiMail,
  FiActivity,
  FiUsers,
  FiUser,
  FiEdit,
} from "react-icons/fi";
import {
  BiShoppingBag,
  BiTimeFive,
  BiBookContent,
  BiCalendar,
  BiClinic,
} from "react-icons/bi";

export const LinkItems: Array<LinkItemProps> = [
  { name: "Trang chủ", icon: FiHome, href: "/" },
  { name: "Quản lý tài khoản", icon: FiUsers, href: "/user" },
  { name: "Quản lý thai phụ", icon: FiUsers, href: "/pregnant-women" },
  { name: "Cơ sở y tế", icon: BiClinic, href: "/clinic" },
  { name: "Quản lý xét nghiệm", icon: FiUsers, href: "/forms" },
];
