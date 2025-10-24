// Test date conversion
const moment = require('jalali-moment');

// Test Persian to Gregorian conversion
const convertPersianToGregorian_2 = (persianDate) => {
  const regex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  const match = persianDate.match(regex);

  if (!match) {
    throw new Error("فرمت تاریخ شمسی نادرست است. لطفاً از فرمت YYYY/MM/DD استفاده کنید.");
  }

  const [_, year, month, day] = match;
  const miladiDate = moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD").format("YYYY-MM-DD");
  return miladiDate;
};

// Test Gregorian to Persian conversion
const convertGregorianToPersian = (gregorian_date) => {
  const gregorianDate = moment(gregorian_date);
  const jalaliDate = gregorianDate.format('jYYYY/jMM/jDD');
  return jalaliDate;
};

// Test cases
console.log("Testing Persian to Gregorian conversion:");
console.log("1403/09/15 ->", convertPersianToGregorian_2("1403/09/15"));
console.log("1403/01/01 ->", convertPersianToGregorian_2("1403/01/01"));

console.log("\nTesting Gregorian to Persian conversion:");
console.log("2024-12-05 ->", convertGregorianToPersian("2024-12-05"));
console.log("2024-03-21 ->", convertGregorianToPersian("2024-03-21"));

// Test the problematic date from your example
console.log("\nTesting the problematic date:");
const testDate = "1403/09/15";
const gregorianResult = convertPersianToGregorian_2(testDate);
const isoResult = moment(gregorianResult, "YYYY-MM-DD").toISOString();
console.log(`${testDate} -> ${gregorianResult} -> ${isoResult}`);