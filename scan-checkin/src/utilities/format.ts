import dayjs from "dayjs";
import "dayjs/locale/ja";
import i18next from "i18next";

dayjs.locale("vi");

export const YYYYMMDD_JP = "YYYY年MM月DD日";
export const YYYYMMDD = "YYYY/MM/DD";
export const DDMMYYY = "DD/MM/YYYY";
export const DDMM = "DD/MM";

export const changeLocale = (locale: string): void => {
  dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const requireField = (field: string) => {
  return `${field} không được bỏ trống!` || "";
};

export const formatDate = (
  date: Date | string | number,
  defaultFormat = DDMMYYY
) => {
  if (!date) return "";
  return `${dayjs(date).format(defaultFormat)}`;
};
