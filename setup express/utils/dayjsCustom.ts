import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

/* 07 กุมภาพันธ์ 2566 */
const DateLongTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMMM BBBB");
};

/* 07 ก.พ. 2566 */
const DateShortTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BB");
};

const DateShortLongYearTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BBBB");
};

/* 07 February 2023 */
const DateLongEN = (date: Date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMMM YYYY");
};

/* 07 Feb 23 */
const DateShortEN = (date: Date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMM YY");
};

const DateNumberShortTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("DDMMBBBB");
};
const DateYearBB = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("BBBB");
};
const DateLongTimeToTimeTH = (
  dateStart: Date,
  dateEnd: Date,
  onlyTime = false
) => {
  dayjs.locale("th");
  if (onlyTime)
    return dayjs(dateStart)
      .format("HH:mm")
      .concat(" - ", dayjs(dateEnd).format("HH:mm"));
  else
    return dayjs(dateStart)
      .format("DD MMMM BBBB HH:mm")
      .concat(" - ", dayjs(dateEnd).format("HH:mm"));
};

const TimeTH = (date: Date) => {
  dayjs.locale("th");
  return dayjs(date).format("HH:mm");
};

/**
 * use only component cardManageRoom
 * @param date input date format
 * @param time input time format
 * @returns format string
 */
const MapDateAndTimeFormat = (date: string | Date, time: string): string => {
  return dayjs(dayjs(date).format("YYYY-MM-DD") + " " + time).format();
};

export default {
  DateLongEN,
  DateShortEN,
  DateLongTH,
  DateShortTH,
  DateNumberShortTH,
  DateLongTimeToTimeTH,
  MapDateAndTimeFormat,
  DateYearBB,
  DateShortLongYearTH,
  TimeTH,
};
