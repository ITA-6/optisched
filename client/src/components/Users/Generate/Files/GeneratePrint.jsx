import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import  pncHeader from "../../../../assets/pncHeader.png"
import html2pdf from "html2pdf.js"

const GeneratePrint = () => {
  const printPage = () => {
    // Dynamically create the content that you want to print
    const contentToPrint = `
      <div class="flex flex-col justify-center px-7 text-center">
        <div class="flex flex-col items-center mt-5">
          <p class="text-sm">Republic of the Philippines</p>
          <img src="${pncHeader}" alt="PNC Header" style="width:23rem;" />
          <p class="font-bold text-sm">Academic Affairs Division</p>
          <p class="font-bold text-sm" >Office of the University Registrar</p>
          <p class="text-xs">Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025</p>
        </div>

        <div class="flex flex-col justify-center items-center mt-5">
          <p class="text-base font-bold">SCHEDULE FORM</p>
          <p class="text-sm">First Semester, Academic Year 2024-2025</p>
        </div>
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
    <>
      <div className="mx-5 grid grid-areas-generateInteraction grid-in-interaction xm:mt-0">
        <div className="flex items-center justify-start gap-5 grid-in-generatedText">
          <h1 className="font-medium xm:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">Generated Schedule</h1>
        </div>
        <div className="flex items-center justify-end pr-5 xm:pr-0 grid-in-printBtn">
          <FontAwesomeIcon
            icon={faPrint}
            className='sm:text-lg md:text-2xl'
            onClick={printPage} // Generate PDF and open in new tab
          />
        </div>
      </div>
    </>
  );
};

export default GeneratePrint;
