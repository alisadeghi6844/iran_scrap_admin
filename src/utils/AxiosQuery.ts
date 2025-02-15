export const AxiosQueryCustom = (query: any): string => {
  
  let params: string[] = [];

  // پردازش فیلدهای اصلی کوئری
  for (const key in query) {
    if (query.hasOwnProperty(key) && query[key] !== undefined && key !== "filter") {
      params.push(`${key}=${query[key]}`);
    }
  }

  // پردازش فیلد filter
  if (query.filter && typeof query.filter === 'string') {
    const filterParts = query.filter.split(','); // جدا کردن فیلترها با استفاده از '&'
    filterParts.forEach(part => {
      const [key, value] = part.split('=');
      if (key && value) {
        params.push(`${key}=${value}`);
      }
    });
  }

  return params.join('&');
};
