import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DocumentRecibo from "./DocumentRecibo";
import { useNavigate } from "react-router-dom";


// Componente principal
export default function PDFGenerator(props) {

  const navigate = useNavigate();

  const finishDownload = () => {
    const checkDownloadStatus = setInterval(() => {
      const downloadedFile = document.getElementById('pdf-download-link');
      if (downloadedFile) {
        clearInterval(checkDownloadStatus); //
        window.localStorage.removeItem('cartMemory');
        window.localStorage.removeItem('recibo');
        navigate("/products-dashboard/riego")
      }
    }, 1000); // Verificar cada segundo
  };

  return (
    <PDFDownloadLink id="pdf-download-link" onClick={finishDownload} document={<DocumentRecibo recibo={props.recibo} />} fileName={"FYAC-00"+props.recibo.nro_recibo+".pdf"} style={{ textDecoration: 'none', color: 'white' }}>
      {({ blob, url, loading, error }) =>
        loading ? 'Generando PDF...' : 'Descargar PDF'
      }
    </PDFDownloadLink>
  );
};

