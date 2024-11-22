import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import pncHeader from "../../../../assets/pncHeader.png";
const PrintModal = ({ togglePrintModal, filterScheduleSections }) => {
  const printPage = () => {
    togglePrintModal();
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    doc.setFontSize(10);
    doc.text("Republic of the Philippines", 105, 10, { align: "center" });
    doc.addImage(pncHeader, "JPEG", 50, 15, 110, 15);
    doc.text("Academic Affairs Division", 105, 35, { align: "center" });
    doc.text("Office of the University Registrar", 105, 40, {
      align: "center",
    });
    doc.text(
      "Katapatan Mutual Homes, Brgy. Banay-banay, City of Cabuyao, Laguna 4025",
      105,
      45,
      { align: "center" },
    );
    doc.setFontSize(14);
    doc.text("SCHEDULE FORM", 105, 55, { align: "center" });
    doc.setFontSize(10);
    doc.text("First Semester, Academic Year 2024-2025", 105, 60, {
      align: "center",
    });

    // Render section header (adapted from HeaderSchedule)
    doc.setFontSize(10);

    // Table headers
    const headers = [
      [
        "Professor Name",
        "Course Code",
        "Course Description",
        "Lec",
        "Lab",
        "Day",
        "Time",
        "Building",
        "Room",
        "Section",
      ],
    ];

    // Flattened rows by extracting courses directly
    const rows = filterScheduleSections.flatMap((section) =>
      section.flatMap((sched) =>
        sched.courses.map((course) => [
          course.professor_name || "TBA",
          course.course_code,
          course.course_description || "N/A",
          course.lecture_units || "N/A",
          course.lab_units || 0,
          `${course.lecture_day_of_week || ""}${course.lecture_units !== 3 && course.lab_day_of_week !== "Day Not Assigned" ? `/${course.lab_day_of_week}` : ""}`,
          `${course.lecture_time_range || ""}${course.lecture_units !== 3 && course.lab_time_range !== "Time Not Assigned" ? `/${course.lab_time_range}` : ""}`,
          `${course.building_name ? course.building_name : "TBA"}`,
          course.lecture_room_number || "N/A",
          `${sched.year_level || ""}${sched.section_label || ""}`,
        ]),
      ),
    );

    // Render the table
    doc.autoTable({
      startY: 70,
      head: headers,
      body: rows,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [255, 255, 255], // White background for header
        textColor: [0, 0, 0], // Black text for header
        halign: "center",
        lineColor: [0, 0, 0],
      },
      bodyStyles: {
        halign: "center",
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Professor Name
        1: { cellWidth: 15 }, // Course Code
        2: { cellWidth: 45 }, // Course Description
        3: { cellWidth: 10 }, // Lec
        4: { cellWidth: 10 }, // Lab
        5: { cellWidth: 15 }, // Day
        6: { cellWidth: 32 }, // Time
        7: { cellWidth: 15 }, // Day
        8: { cellWidth: 15 }, // Room
        9: { cellWidth: 15 }, // Section
      },
      margin: { top: 10 },
      tableWidth: "wrap",
    });

    // Open the PDF in a new tab
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(pdfUrl);
    if (newWindow) {
      newWindow.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-1/4 flex-col bg-white shadow-lg">
        <div className="m-5 text-center">
          <p>Are you sure you want to print this schedule?</p>
        </div>
        <div className="mb-5 flex flex-row items-center justify-center gap-10">
          <button
            className="rounded-md bg-green px-10 py-1 text-base font-bold text-white"
            onClick={printPage}
          >
            Print
          </button>
          <button
            className="bg-red-500 px-7 py-1 text-base font-bold text-white"
            onClick={togglePrintModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
