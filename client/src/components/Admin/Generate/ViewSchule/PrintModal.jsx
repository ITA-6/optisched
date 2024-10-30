import React from 'react'
import ReactDOMServer from "react-dom/server"
import html2pdf from "html2pdf.js"
import HeaderSchedule from './PrintableSchedule/HeaderSchedule'
import ScheduleTable from './PrintableSchedule/ScheduleTable'
const PrintModal = ({togglePrintModal, filterScheduleSections}) => {
    const printPage = () => {
        const HeaderContent = ReactDOMServer.renderToString(<HeaderSchedule />);
        const TableContent = ReactDOMServer.renderToString(
            filterScheduleSections?.map((sectionArray, index) =>(
                <div
                    key={index}
                    style={{
                        pageBreakInside: 'avoid',
                        breakInside: 'avoid',
                        marginBottom: '20px'
                    }}
                >
                    <ScheduleTable sectionArray={sectionArray} />
                </div>
            )
            ))
        const contentToPrint = `
            <div class="flex flex-col justify-center px-7 text-center">
                ${HeaderContent}
                ${TableContent}
            </div>
        `;
    
        const options = {
          margin:       0, // Set margins (in mm)
          filename:     'generated-pdf.pdf', // Name of the output PDF file
          image:        { type: 'jpeg', quality: 1.0 }, // Set image quality to 100%
          html2canvas:  { scale: 2 }, // Scale the canvas for higher quality
          jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' } // A4 format
        };
        
        // Create a new element to contain the dynamically created content
        const element = document.createElement("div");
        element.innerHTML = contentToPrint;
        
        // Use html2pdf to convert the dynamically generated content to PDF
        html2pdf()
          .from(element)
          .set(options) // Apply the defined options
          .toPdf()
          .get("pdf")
          .then((pdf) => {
            const pdfBlob = pdf.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);
        
            // Open the customized PDF in a new tab
            const newWindow = window.open(pdfUrl);
            if (newWindow) {
              newWindow.focus();
            } else {
              alert("Please allow popups for this website");
            }
          });
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col w-1/4  bg-white shadow-lg">
            <div className=" text-center m-5">
                <p>Are you sure you want to print this schedule?</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-10 mb-5">
                <button 
                    className="bg-green py-1 px-10 rounded-md text-white font-bold text-base"
                    onClick={printPage}
                >
                    Print
                </button>
                <button 
                    className="bg-red-500 text-white font-bold text-base py-1 px-7"
                    onClick={togglePrintModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default PrintModal