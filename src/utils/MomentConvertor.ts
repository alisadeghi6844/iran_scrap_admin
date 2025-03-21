import moment from "jalali-moment";
import { fromUnixTime } from 'date-fns';

export const convertPersianToGregorian = (persian_date: string) => {
  return moment(persian_date, "jYYYY/jMM/jDD").format("YYYY/MM/DD");
};

export const p2e = (s: any) =>
  s.replace(/[۰-۹]/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export const convertGregorianToPersian = (gregorian_date: string) => {
  // تاریخ میلادی را به شیء moment تبدیل کنید
  const gregorianDate = moment(gregorian_date);

  // تاریخ شمسی را دریافت کنید و فرمت صحیح را اعمال کنید
  const jalaliDate = gregorianDate.format('jYYYY/jMM/jDD');

  return jalaliDate;
};


// تابعی برای تبدیل تاریخ شمسی به میلادی
export const convertPersianToGregorian_2 = (persianDate: any) => {
  // بررسی فرمت ورودی
  const regex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  const match = persianDate.match(regex);

  if (!match) {
    throw new Error(
      "فرمت تاریخ شمسی نادرست است. لطفاً از فرمت YYYY/MM/DD استفاده کنید."
    );
  }

  const [_, year, month, day] = match;

  // تبدیل رشته‌ها به عدد
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  // بررسی اعتبار سال، ماه و روز
  if (yearNum < 1 || yearNum > 9999) {
    throw new Error("سال شمسی باید بین ۱ و ۹۹۹۹ باشد.");
  }
  if (monthNum < 1 || monthNum > 12) {
    throw new Error("ماه شمسی باید بین ۱ و ۱۲ باشد.");
  }
  if (dayNum < 1 || dayNum > 31) {
    throw new Error("روز شمسی باید بین ۱ و ۳۱ باشد.");
  }

  // تبدیل تاریخ شمسی به میلادی
  const miladiDate = moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD").format(
    "YYYY-MM-DD"
  );

  return miladiDate;
};

export const getPersianTimeFromNow = (targetDate: any) => {
  // تبدیل تاریخ به local time با در نظر گرفتن timezone
  const gregorianDate = moment(targetDate).local();

  // تبدیل به تاریخ شمسی
  const jalaliDate = gregorianDate
    .locale("fa")
    .format("jYYYY/jMM/jDD HH:mm:ss");

  // محاسبه زمان از حالا
  const timeFromNow = gregorianDate.fromNow();

  return { jalaliDate, timeFromNow };
};


export const getHourAndMinute=(time:any)=>{
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, '0'); // ساعت UTC
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // دقیقه UTC
  return `${hours}:${minutes}`;
}


export const formatDate = (dateString: any) => {
  // تاریخ ورودی را دریافت کرده و 3:30 از آن کم می‌کنیم
  const inputDate = moment(dateString).subtract(3, 'hours').subtract(30, 'minutes');
  const now = moment();
  
  // محاسبه اختلاف زمانی
  const diffSeconds = moment.duration(now.diff(inputDate)).asSeconds();
  const diffMinutes = moment.duration(now.diff(inputDate)).asMinutes();
  const diffHours = moment.duration(now.diff(inputDate)).asHours();
  const diffDays = moment.duration(now.diff(inputDate)).asDays();
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = moment.duration(now.diff(inputDate)).asMonths();
  
  // تعریف ماه‌های فارسی
  const persianMonths = {
    '1': 'فروردین',
    '2': 'اردیبهشت',
    '3': 'خرداد',
    '4': 'تیر',
    '5': 'مرداد',
    '6': 'شهریور',
    '7': 'مهر',
    '8': 'آبان',
    '9': 'آذر',
    '10': 'دی',
    '11': 'بهمن',
    '12': 'اسفند'
  };
  
  // برای زمان‌های آینده یا نامعتبر
  if (diffSeconds < 0) {
    const day = inputDate.format('jD');
    const month = persianMonths[inputDate.format('jM')];
    const year = inputDate.format('jYYYY');
    return `${day} ${month} ${year} ${inputDate.format('HH:mm')}`;
  }
  
  // کمتر از 30 ثانیه
  if (diffSeconds < 30) {
    return 'هم اکنون';
  }
  
  // کمتر از 1 دقیقه
  if (diffSeconds < 60) {
    return 'چند لحظه پیش';
  }
  
  // کمتر از 1 ساعت
  if (diffMinutes < 60) {
    if (Math.floor(diffMinutes) === 1) return 'یک دقیقه پیش';
    if (Math.floor(diffMinutes) === 2) return 'دو دقیقه پیش';
    if (Math.floor(diffMinutes) === 3) return 'سه دقیقه پیش';
    return `${Math.floor(diffMinutes)} دقیقه پیش`;
  }
  
  // امروز
  if (diffHours < 24 && inputDate.format('jYYYY-jMM-jDD') === now.format('jYYYY-jMM-jDD')) {
    if (Math.floor(diffHours) === 1) return 'یک ساعت پیش';
    if (Math.floor(diffHours) === 2) return 'دو ساعت پیش';
    if (Math.floor(diffHours) === 3) return 'سه ساعت پیش';
    return `${Math.floor(diffHours)} ساعت پیش`;
  }
  
  // دیروز
  if (Math.floor(diffDays) === 1 || 
      (diffHours < 36 && inputDate.format('jYYYY-jMM-jDD') === moment().subtract(1, 'days').format('jYYYY-jMM-jDD'))) {
    return `دیروز ${inputDate.format('HH:mm')}`;
  }
  
  // این هفته (تا 6 روز پیش)
  if (diffDays < 7) {
    const weekDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return `${weekDays[inputDate.day()]} ${inputDate.format('HH:mm')}`;
  }
  
  // این ماه و سال‌های دیگر
  const day = inputDate.format('jD');
  const month = persianMonths[inputDate.format('jM')];
  const year = inputDate.format('jYYYY');
  
  // این ماه
  if (diffWeeks < 5 && inputDate.format('jM') === now.format('jM')) {
    return `${day} ${month}`;
  }
  
  // امسال
  if (inputDate.format('jYYYY') === now.format('jYYYY')) {
    return `${day} ${month}`;
  }
  
  // سال‌های قبل
  return `${day} ${month} ${year}`;
};



export const convertToJalali_2 = (timestamp:any) => {
  try {
    // تبدیل تایم استمپ به تاریخ میلادی با استفاده از moment
    const m = moment(timestamp);
    
    // بررسی معتبر بودن تاریخ
    if (!m.isValid()) {
      console.error('تایم استمپ نامعتبر است:', timestamp);
      return null;
    }

    // تبدیل به تاریخ شمسی با فرمت مورد نظر
    return m.locale('fa').format('YYYY/MM/DD');
    
  } catch (error) {
    console.error('خطا در تبدیل تاریخ:', error);
    return null;
  }
};


export const convertToJalali = (timestamp:any) => {
  try {
    // تبدیل تایم استمپ به تاریخ میلادی با استفاده از moment
    const m = moment(timestamp);
    
    // بررسی معتبر بودن تاریخ
    if (!m.isValid()) {
      console.error('تایم استمپ نامعتبر است:', timestamp);
      return null;
    }

    // تبدیل به تاریخ شمسی با فرمت مورد نظر
    return m.locale('fa').format('YYYY/MM/DD');
    
  } catch (error) {
    console.error('خطا در تبدیل تاریخ:', error);
    return null;
  }
};