import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import pncHeader from "../../../../assets/pncHeader.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import api from "../../../../api";

const GeneratePrint = () => {
  const [data, setData] = useState([]);
  const [professorName, setProfessorName] = useState(""); // To store the professor's full name
  const [departmentName, setDepartmentName] = useState(""); // To store the department name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("schedule/professor/");
        setData(response.data);

        if (response.data.length > 0) {
          const { first_name, last_name, department_name } =
            response.data[0]?.professor || {};
          setProfessorName(`${first_name || ""} ${last_name || ""}`.trim()); // Combine first and last name
          setDepartmentName(department_name || ""); // Set department name
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openPdfInNewTab = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });

    // Add header content
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

    // Add professor name and department
    doc.text(`Name: ${professorName}`, 20, 65);
    doc.text(`Department: ${departmentName}`, 20, 70);

    // Prepare table data and headers
    const tableData = data
      .map((sched) =>
        sched.courses.map((course) => [
          course.course.code || "N/A", // Course code
          course.course.description || "N/A", // Course description
          course.course.lecture_units || 0, // Lecture units
          course.course.lab_units || 0, // Lab units
          `${course.lecture_time_range?.day_of_week || ""} ${
            course.course.lab_units > 0 && course.lab_time_range?.day_of_week
              ? `/ ${course.lab_time_range?.day_of_week}`
              : ""
          }`, // Day
          `${course.lecture_time_range?.start_time || ""} - ${
            course.lecture_time_range?.end_time || ""
          } ${
            course.course.lab_units > 0 && course.lab_time_range
              ? `/ ${course.lab_time_range.start_time} - ${course.lab_time_range.end_time}`
              : ""
          }`, // Time
          `${course.building_name ? course.building_name : "TBA"}`,
          `${course.lecture_room?.number || ""} ${
            course.course.lab_units > 0 && course.lab_room?.number
              ? `/ ${course.lab_room.number}`
              : ""
          }`, // Room
          sched.section_label || "N/A", // Section
        ]),
      )
      .flat();

    const headers = [
      [
        "Course Code",
        "Course Description",
        "Lec Units",
        "Lab Units",
        "Day",
        "Time",
        "Building",
        "Room",
        "Section",
      ],
    ];

    // Generate table with custom styles
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 75,
      theme: "grid",
      styles: {
        fontSize: 7,
        cellPadding: 1,
        lineColor: [0, 0, 0], // Black border color for both header and body
        lineWidth: 0.1, // Single thin border
      },
      headStyles: {
        fillColor: [255, 255, 255], // White background color
        textColor: [0, 0, 0], // Black text color
        halign: "center", // Center-align header text
        lineColor: [0, 0, 0], // Ensure consistent black border
        lineWidth: 0.1, // Match line width to avoid double borders
        cellPadding: 2,
      },
      bodyStyles: {
        halign: "center", // Center-align body text
        minCellHeight: 0,
        lineColor: [0, 0, 0], // Black border color for body cells
        lineWidth: 0.1, // Single thin border
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Course Code
        1: { cellWidth: 50 }, // Course Description
        2: { cellWidth: 15 }, // Lec Units
        3: { cellWidth: 15 }, // Lab Units
        4: { cellWidth: 25 }, // Day
        5: { cellWidth: 30 }, // Time
        6: { cellWidth: 15 }, // Room
        7: { cellWidth: 15 }, // Room
        8: { cellWidth: 15 }, // Section
      },
      margin: { left: 8 }, // Padding on each side
      tableWidth: "wrap", // Wrap content within the page width
      rowPageBreak: "avoid", // Avoid page breaks within rows
    });

    // Add total units below the table
    const totalUnits = data.reduce((acc, sched) => acc + sched.total_units, 0);
    const totalLecUnits = data.reduce(
      (acc, sched) =>
        acc +
        sched.courses.reduce(
          (lecAcc, course) => lecAcc + (course.course.lecture_units || 0),
          0,
        ),
      0,
    );
    const totalLabUnits = data.reduce(
      (acc, sched) =>
        acc +
        sched.courses.reduce(
          (labAcc, course) => labAcc + (course.course.lab_units || 0),
          0,
        ),
      0,
    );
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(
      `Total Number of Units: ${totalUnits}   Lec: ${totalLecUnits}   Lab: ${totalLabUnits}`,
      105,
      finalY,
      { align: "center" },
    );

    // Footer information moved lower, justified alignment
    const footerY = 250; // Moved further down
    doc.setFontSize(8);
    doc.text(
      "This document is not valid without the signature of the University Registrar.",
      15,
      footerY,
      { maxWidth: 190 },
    );
    doc.text(
      "Generated via OptiSched  on " + new Date().toLocaleString(),
      15,
      footerY + 5,
      { maxWidth: 190 },
    );
    doc.text("FERNANDO T. PENDON III, FRIEdr, CSASS, PhD", 200, footerY, {
      align: "right",
    });
    doc.text("University Registrar", 200, footerY + 5, { align: "right" });

    // Generate the PDF as a Blob
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    const newTab = window.open(pdfUrl, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      alert("Please allow pop-ups for this website to view the PDF.");
    }

    // Revoke the Blob URL after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);
  };

  return (
    <>
      <div className="mx-5 grid grid-areas-generateInteraction grid-in-interaction xm:mt-0">
        <div className="flex items-center justify-start gap-5 grid-in-generatedText">
          <h1 className="font-medium sm:text-sm md:text-base lg:text-lg xl:text-xl xm:text-xs">
            Generated Schedule
          </h1>
        </div>
        <div className="flex items-center justify-end pr-5 grid-in-printBtn xm:pr-0">
          <FontAwesomeIcon
            icon={faPrint}
            className="sm:text-lg md:text-2xl"
            onClick={openPdfInNewTab} // Generates PDF and opens in a new tab
          />
        </div>
      </div>
    </>
  );
};

export default GeneratePrint;
