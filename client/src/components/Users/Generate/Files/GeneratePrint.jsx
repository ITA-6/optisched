import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import pncHeader from "../../../../assets/pncHeader.png";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../../../api";

const GeneratePrint = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("schedule/professor/");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openPdfInNewTab = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    });

    // Add header content
    doc.setFontSize(10);
    doc.text('Republic of the Philippines', 105, 10, { align: 'center' });
    doc.addImage(pncHeader, 'JPEG', 50, 15, 110, 15);
    doc.text('Academic Affairs Division', 105, 35, { align: 'center' });
    doc.text('Office of the University Registrar', 105, 40, { align: 'center' });
    doc.text('Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025', 105, 45, { align: 'center' });
    doc.setFontSize(14);
    doc.text('SCHEDULE FORM', 105, 55, { align: 'center' });
    doc.setFontSize(10);
    doc.text('First Semester, Academic Year 2024-2025', 105, 60, { align: 'center' });

    // Prepare table data and headers
    const tableData = data.map((sched) => {
      return sched.courses.map((course) => [
        course.course.code,
        course.course.description,
        course.course.lecture_units,
        course.course.lab_units,
        `${course.lecture_time_range.day_of_week} ${course.course.lab_units === 1 ? "/ " + course.lab_time_range.day_of_week : ""}`,
        `${course.lecture_time_range.start_time} - ${course.lecture_time_range.end_time}  ${course.course.lab_units > 0 ? "/" + course.lab_time_range.start_time + "-" + course.lab_time_range.end_time : ""}`,
        `${course.lecture_room.number} ${course.course.lab_units > 0 && !course.lecture_room.number ? course.lab_room.number : ""}`,
        sched.section_label
      ]);
    }).flat();

    const headers = [
      ["Course Code", "Course Description", "Lec Units", "Lab Units", "Day", "Time", "Room", "Section"]
    ];

    // Generate table with custom header and body styles
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 70,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding : 1,
        lineColor: [0, 0, 0], // Black border color for both header and body
        lineWidth: 0.1, // Single thin border
      },
      headStyles: {
        fillColor: [255, 255, 255], // White background color
        textColor: [0, 0, 0], // Black text color
        halign: 'center', // Center-align header text
        lineColor: [0, 0, 0], // Ensure consistent black border
        lineWidth: 0.1, // Match line width to avoid double borders
        cellPadding : 2,
      },
      bodyStyles: {
        halign: 'center', // Center-align body text
        minCellHeight:  0,
        lineColor: [0, 0, 0], // Black border color for body cells
        lineWidth: 0.1, // Single thin border
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 },
        6: { cellWidth: 15 },
        7: { cellWidth: 15 },
      },
      margin: { left: 15, right: 15 }, // Padding on each side
      tableWidth: 'wrap', // Wrap content within the page width
      rowPageBreak: 'avoid', // Avoid page breaks within rows
    });
    

    // Generate the PDF as a Blob
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab without forcing download
    const newTab = window.open(pdfUrl, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      alert("Please allow pop-ups for this website to view the PDF.");
    }

    // Revoke the Blob URL after a short delay (to allow it to be loaded in the new tab)
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);
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
            onClick={openPdfInNewTab} // Generates PDF and opens in a new tab
          />
        </div>
      </div>
    </>
  );
};

export default GeneratePrint;
