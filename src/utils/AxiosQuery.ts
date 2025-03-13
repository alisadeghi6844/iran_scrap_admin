export const AxiosQueryCustom = (query: any): string => {
  
  let params: string[] = [];

  // پردازش فیلدهای اصلی کوئری
  for (const key in query) {
    if (query.hasOwnProperty(key) && query[key] !== undefined && key !== "filter") {
      if (Array.isArray(query[key])) {
        // اگر مقدار آرایه باشد، هر عنصر را به عنوان یک پارامتر اضافه کن
        query[key].forEach(value => {
          params.push(`${key}[]=${value}`);
        });
      } else {
        // اگر مقدار یک رشته باشد، آن را به صورت عادی اضافه کن
        params.push(`${key}=${query[key]}`);
      }
    }
  }

  // پردازش فیلد filter
  if (query.filter && typeof query.filter === 'string') {
    const filterParts = query.filter.split(','); // جدا کردن فیلترها با استفاده از ','
    filterParts.forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        params.push(`${key}=${value}`);
      }
    });
  }

  return params.join('&');
};
