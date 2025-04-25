
import jsPDF from "jspdf";
import html2canvas from "html2canvas";





export default function DownloadReportButton() {


// Helper to compress base64 image
const compressBase64Image = (base64, quality = 1) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = base64;
  });


  const downloadPDF = async () => {
    const input = document.getElementById("root");
  
    // Compress all base64 images first
    const imgs = input.querySelectorAll("img");
    for (const img of imgs) {
      const originalBase64 = img.src;
      const compressed = await compressBase64Image(originalBase64, 0.4);
      img.src = compressed;
    }
  
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.9); // already compressed
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) pdf.addPage();
      }
  
      pdf.save("Branching_Report.pdf");
    });
  };  
  return (
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <button onClick={downloadPDF} className="download-btn">
        Download Report as PDF
      </button>
      </div>
  );
}
