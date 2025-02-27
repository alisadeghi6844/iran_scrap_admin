export const AxiosQueryCustom = (query:any) => {
  let text = "";

  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      if (!!query[key] && key !== "filter") {
        text += `${key}=${query[key]}&`;
      }
    }
  }

 

  if (query?.filter?.length) {
    const parsedFilter = JSON.parse(query.filter);
    for (const key in parsedFilter) {
      if (parsedFilter[key]) {
        text += `${key}=${parsedFilter[key]}&`;
      }
    }
  }
  return text.substring(0, text.length - 1);
};
