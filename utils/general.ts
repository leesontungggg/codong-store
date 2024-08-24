export const formatMoney = (value: any) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const makeid = (length: any) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const convertToDate = (ddmmyyyy: any) => {
  var dateParts = ddmmyyyy.split("/");

  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};
