import React from 'react';
import QrCode from 'react-qr-code';

const QRCodeComponent = ({ value }) => {
  return <QrCode value={value} />;
};

export default QRCodeComponent;
