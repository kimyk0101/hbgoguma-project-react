import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({url}) => {

  return (
    <div>
      <QRCodeCanvas value={url} size={100} />
    </div>
  );
};

export default QRCodeGenerator;
