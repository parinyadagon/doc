// ใช้เพื่อให้ Date เป็นเวลา (GMT+7)
const DateToDateLocal = (date: Date) => {
  const offsetInMinutes = 7 * 60; // +7 hours converted to minutes
  const offsetDate = new Date(date.getTime() + offsetInMinutes * 60000);
  return offsetDate;
};

export default {
  DateToDateLocal,
};
