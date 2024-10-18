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

        <div class="grid grid-cols-[1fr] mt-10">
          <div class="flex flex-col">
            <div class="flex justify-between w-56">
              <p class="text-sm">Professor Name :</p>
              <p class="font-medium text-sm">Miro dela cruz</p>
            </div>
            <div class="flex gap-4 justify-between w-40">
              <p class="text-sm">Department : </p>
              <p class=" text-sm font-medium">CCS</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col mt-4 mb-4">
          <p class="font-bold text-sm text-start">
            Enlisted Schedules
          </p>

          <table class="mt-2 table-auto">
            <thead class="text-[12px]">
              <tr class="h-[2.5rem] text-center -pt-[20px] text-black border-[0.5px] border-collapse border-black">
                <th class="border-[0.5px] text-xs border-black">Course Code</th>
                <th class="border-[0.5px] text-xs border-black">Course Description</th>
                <th class="border-[0.5px] text-xs border-black w-[50px]">Lec Units</th>
                <th class="border-[0.5px] text-xs border-black w-[50px]">Lab Units</th>
                <th class="border-[0.5px] text-xs border-black">Day</th>
                <th class="border-[0.5px] text-xs border-black w-[130px]">Time</th>
                <th class="border-[0.5px] text-xs border-black">Room</th>
                <th class="border-[0.5px] text-xs border-black">Section</th>
              </tr>
            </thead>
              <tbody class="text-xs font-medium">
                <tr class="border border-black border-collapse">
                  <th class="  border border-black font-medium">RIZ101</th>
                  <th class="text-start px-2  border border-black font-medium">Life and Works of Rizal</th>
                  <th class="  border-[0.5px] border-black font-medium">3</th>
                  <th class="  border-[0.5px] border-black font-medium">0</th>
                  <th class="  border-[0.5px] border-black font-medium px-2">M/WF</th>
                  <th class="  border-[0.5px] border-black font-medium px-1">9:00-10:00 AM/ 9:00-10:00 AM</th>
                  <th class="  border-[0.5px] border-black font-medium">Room 101</th>
                  <th class="  border-[0.5px] border-black font-medium px-5">A1</th>
                </tr>
                <tr class="border border-black border-collapse">
                  <th class="  border-[0.5px] border-black font-medium">CS101</th>
                  <th class="text-start px-2  border-[0.5px] border-black font-medium">Introduction to Computer Science</th>
                  <th class="  border-[0.5px] border-black font-medium">3</th>
                  <th class="  border-[0.5px] border-black font-medium">1</th>
                  <th class="  border-[0.5px] border-black font-medium">T/Th</th>
                  <th class="  border-[0.5px] border-black font-medium text-center px-1">10:00-11:30 AM/ 9:00-10:00 AM</th>
                  <th class="  border-[0.5px] border-black font-medium px-5">Room 202</th>
                  <th class="  border-[0.5px] border-black font-medium">B2</th>
                </tr>
                <tr class="border border-black border-collapse">
                  <th class="  border-[0.5px] border-black font-medium">MATH201</th>
                  <th class="text-start px-2  border-[0.5px] border-black font-medium">Calculus I</th>
                  <th class="  border-[0.5px] border-black font-medium">4</th>
                  <th class="  border-[0.5px] border-black font-medium">0</th>
                  <th class="  border-[0.5px] border-black font-medium">M/WF</th>
                  <th class="  border-[0.5px] border-black font-medium px-1">1:00-2:30 PM / 10:00-11:30 AM</th>
                  <th class="  border-[0.5px] border-black font-medium">Room 105</th>
                  <th class="  border-[0.5px] border-black font-medium">C3</th>
                </tr>
                <tr class="border-[0.5px] border-black border-collapse">
                  <th class=" border-[0.5px] border-black font-medium">PHY301</th>
                  <th class="text-start px-2  border-[0.5px] border-black font-medium">Physics I</th>
                  <th class="  border-[0.5px] border-black font-medium">3</th>
                  <th class="  border-[0.5px] border-black font-medium">1</th>
                  <th class="  border-[0.5px] border-black font-medium">T/Th</th>
                  <th class="  border-[0.5px] border-black font-medium px-1">3:00-4:30 PM</th>
                  <th class="  border-[0.5px] border-black font-medium">Room 303</th>
                  <th class="  border-[0.5px] border-black font-medium">D4</th>
                </tr>
                <tr class="border-[0.5px] border-black border-collapse">
                  <th class="  border-[0.5px] border-black font-medium">ENG102</th>
                  <th class="text-start px-2  border-[0.5px] border-black font-medium">English Communication Skills</th>
                  <th class="  border-[0.5px] border-black font-medium">3</th>
                  <th class="  border-[0.5px] border-black font-medium">0</th>
                  <th class="  border-[0.5px] border-black font-medium">MWF</th>
                  <th class="  border-[0.5px] border-black font-medium px-1">2:00-3:00 PM / 1:00-2:30 PM </th>
                  <th class="  border-[0.5px] border-black font-medium">Room 204</th>
                  <th class="  border-[0.5px] border-black font-medium">E5</th>
                </tr>
              </tbody>
          </table>
          <div class="flex justify-center items center text-xs mt-2 gap-5">
              <p class="">
                Total Units : <span class="ml2"> 18</span>
              </p>
              <p class=""> 
                Lecture : <span class="ml-2"> 16 </span>
              </p>
              <p class="">
                 Laboratory : <span class="ml-2"> 2</span>
              </p>
          </div>
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
      <div className="mx-5 grid grid-areas-generateInteraction grid-in-interaction">
        <div className="flex items-center justify-start gap-5 grid-in-generatedText">
          <h1 className="text-xl font-medium">Generated Schedule</h1>
        </div>
        <div className="flex items-center justify-end pr-5 grid-in-printBtn">
          <FontAwesomeIcon
            icon={faPrint}
            size="xl"
            onClick={printPage} // Generate PDF and open in new tab
          />
        </div>
      </div>
    </>
  );
};

export default GeneratePrint;
