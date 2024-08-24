import QRCode from 'qrcode';

export const textToQRCode = (text: any) => new Promise((resolve, reject) => {
  QRCode.toDataURL(text, (err, url) => {
    if (err) {
      reject(err);
    } else {
      resolve(url);
    }
  });
});
