import React from 'react';
import ReactToPdf from 'react-to-pdf';

const PDFExportButton = ({ pdfExportRef, handleToPdf }) => {
  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [8.27, 11.69],
  };

  return (
    <ReactToPdf targetRef={pdfExportRef} filename="order_details.pdf" options={options}>
      {({ toPdf }) => <button onClick={() => handleToPdf(toPdf)}>Xuất PDF</button>}
    </ReactToPdf>
  );
};

export default PDFExportButton;

