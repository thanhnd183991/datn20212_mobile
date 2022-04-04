import dayjs from "dayjs";
import "dayjs/locale/vi";

export const getDateOfMonth = (d) => {
  return dayjs(d).date();
};

export const getMonth = (d) => {
  return dayjs(d).month();
};

export const getYear = (d) => {
  return dayjs(d).year();
};

export const fromNow = (d) => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  return dayjs(d).locale("vi").fromNow();
};

export const dateFormat = (d, format) => {
  return dayjs(d).locale("vi").format(format);
};
