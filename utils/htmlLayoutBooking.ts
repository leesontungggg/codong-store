import { formatMoney } from "./general";

export default function htmlLayoutBooking(
  GUEST_NAME: any,
  GUEST_EMAIL: any,
  GUEST_PHONE: any,
  GUEST_ADDRESS: any,
  ITEMS_LIST: any,
  ORDER_NUMBER: any,
  GUEST_TOTAL_MONEY: any
) {
  return `
    <html>
  <body
    style="
      background-color: #e2e1e0;
      font-family: Open Sans, sans-serif;
      font-size: 100%;
      font-weight: 400;
      line-height: 1.4;
      color: #000;
    "
  >
    <table
      style="
        max-width: 670px;
        margin: 50px auto 10px;
        background-color: #fff;
        padding: 50px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24);
        -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.24);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        border-top: solid 10px red;
      "
    >
      <thead>
        <tr>
          <th style="text-align: left">
            <img
              style="max-width: 150px"
              src="https://codong.s3.ap-southeast-1.amazonaws.com/codong-black.png"
              alt="co-dong"
            />
          </th>
          <th style="text-align: right; font-weight: 400">
            ${new Date().toDateString()}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height: 35px"></td>
        </tr>
        <tr>
          <td colspan="2" style="border: solid 1px #ddd; padding: 10px 20px">
            <p style="font-size: 14px; margin: 0 0 6px 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 204px;
                "
                >Tình trạng thanh toán</span
              ><b style="color: red; font-weight: normal; margin: 0"
                >Chưa thanh toán</b
              >
            </p>
            <p style="font-size: 14px; margin: 0 0 6px 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 200px;
                "
                >Mã đơn hàng</span
              >
              ${ORDER_NUMBER}
            </p>
            <p style="font-size: 14px; margin: 0 0 0 0">
              <span
                style="
                  font-weight: bold;
                  display: inline-block;
                  min-width: 200px;
                "
                >Tổng tiền</span
              >
              ${formatMoney(GUEST_TOTAL_MONEY)} VNĐ
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-top: 12px; padding-bottom: 12px;">Vui lòng thanh toán theo mã QR bên dưới<td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 24px">
            <img
              style="width: 100%"
              src="https://img.vietqr.io/image/vietcombank-1028169568-compact2.png?amount=${GUEST_TOTAL_MONEY}&addInfo=${`CD-${ORDER_NUMBER}-${GUEST_PHONE}`}&accountName=LE%20HUYEN%20LINH"
              alt="co-dong"
            />
          <td>
        </tr>
        <tr>
          <td style="height: 35px"></td>
        </tr>
        <tr>
          <td style="padding: 20px; vertical-align: top">
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Họ và tên</span
              >
              ${GUEST_NAME}
            </p>
            <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
              <span style="display: block; font-weight: bold; font-size: 13px"
                >Số điện thoại</span
              >
              ${GUEST_PHONE}
            </p>
          </td>
          <td style="width: 50%; padding: 20px; vertical-align: top">
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Email</span
                >
                ${GUEST_EMAIL}
              </p>
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Địa chỉ</span
                >
                ${GUEST_ADDRESS}
              </p>
          </td>
        </tr>
        
        ${ITEMS_LIST.map(
          (item: any) => `
          <tr>
            <td colspan="2" style="border: solid 1px #ddd; padding: 10px 20px">
              <p style="font-size: 14px; margin: 0 0 6px 0">
                <span
                  style="
                    font-weight: bold;
                    display: inline-block;
                    min-width: 50%;
                  "
                >${item.name} - ${item.color} - ${item.size}</span
                ><b style="font-weight: normal; margin: 0"
                  >Số lượng: ${item.amount}</b
                >
              </p>
              <img
              style="max-width: 150px"
              src="https://codong.s3.ap-southeast-1.amazonaws.com/${item.image}"
              alt="co-dong"
              />
              <p style="font-size: 14px; margin: 0 0 0 0">
                <span
                  style="
                    font-weight: bold;
                    display: inline-block;
                    min-width: 50%;
                  "
                  >Thành tiền</span
                >
                <strong>${formatMoney(item.itemTotal)} VNĐ</strong>
              </p>
            </td>
            </tr>
          `
        )}
        <tr>
          <td colspan="2" style="padding-top: 24px">Mọi người sẽ nhận được hàng sau 7 - 10 ngày kể từ khi đóng link pre-order vào ngày 9/9/2024<td>
        </tr>
          
      </tbody>
      <tfooter>
        <tr>
          <td colspan="2" style="font-size: 14px; padding: 50px 15px 0 15px">
            Mọi thắc mắc xin liên hệ:
            <br />
            <b>Email:</b> codongmerch@gmail.com
            <br />
            <b>Fanpage:</b> <a href="https://www.facebook.com/Codongpage">https://www.facebook.com/Codongpage</a>
            <br />
          </td>
        </tr>
      </tfooter>
    </table>
  </body>
</html>
  `;
}
