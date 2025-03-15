export function formatNumber(num:any) {
    // تبدیل عدد به رشته
    let numStr = num.toString();
    
    // اضافه کردن کاما هر سه رقم از سمت راست
    let result = '';
    for (let i = numStr.length - 1, count = 0; i >= 0; i--, count++) {
        if (count > 0 && count % 3 === 0) {
            result = ',' + result;
        }
        result = numStr[i] + result;
    }
    
    return result;
}
