/**
 * แสดงผลการตรวจสอบหมายเลขบัตรประชาชน
 *
 * @param {string | number} idCardNumber หมายเลขบัตรประชาชน
 * @return {string} ผลการตรวจสอบ "ถูกต้อง" หรือ "ไม่ถูกต้อง"
 * @customfunction
 */

type ReturnResult = {
  hasErr: boolean;
  message: string;
};

export function THAIIDCHECK(idCardNumber: string | number): ReturnResult {
  if (typeof idCardNumber === "number") {
    idCardNumber = idCardNumber.toString();
  }

  const regex = /^[0-9]\d*$/;
  if (idCardNumber.length === 13 && idCardNumber.match(regex) && idCardNumber !== null && idCardNumber !== "undefined") {
    // Check valid id card number
    return idCardCheck(idCardNumber);
  } else {
    return { hasErr: true, message: "กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง" };
  }
}

function idCardCheck(idCardNumber: string): ReturnResult {
  let sum = 0;
  for (let i = 0; i < idCardNumber.length - 1; i++) {
    sum += parseInt(idCardNumber[i], 10) * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;

  if (checkDigit === parseInt(idCardNumber[12], 10)) {
    return { hasErr: false, message: "หมายเลขบัตรถูกต้อง" };
  } else {
    return { hasErr: true, message: "หมายเลขบัตรไม่ถูกต้อง" };
  }
}
