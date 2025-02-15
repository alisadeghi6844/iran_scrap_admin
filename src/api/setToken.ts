export const SetToken = (name: string, token: string, time: any) => {
  let expires = "";
  if (time) {
    let date: any = new Date();
    date.setTime(date.getTime() + time);
    expires = "; expires=" + date.toUTCString();
  }

  // const isProduction = process.env.NODE_ENV === 'production';
  // const secureFlag = isProduction ? ';Secure' : '';
  // const sameSiteFlag = isProduction ? ';SameSite=Lax' : '';

  const secureFlag = "";
  const sameSiteFlag = "";

  document.cookie =
    name +
    "=" +
    (token || "") +
    expires +
    "; path=/" +
    secureFlag +
    sameSiteFlag;
};
