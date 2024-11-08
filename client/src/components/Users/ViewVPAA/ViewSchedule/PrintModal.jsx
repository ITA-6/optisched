import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PrintModal = ({ togglePrintModal, filterScheduleSections }) => {
    
    const printPage = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'letter',
        });

        doc.setFontSize(12);
        doc.text('Schedule Report', 105, 10, { align: 'center' });
        doc.setFontSize(10);
        doc.text('First Semester, Academic Year 2024-2025', 105, 16, { align: 'center' });

         // Render section header (adapted from HeaderSchedule)
         doc.setFontSize(10);

         // Table headers
         const headers = [["Professor Name", "Course Code", "Course Description", "Lec", "Lab", "Day", "Time", "Room", "Section"]];
         
       // Flattened rows by extracting courses directly
       const rows = filterScheduleSections.flatMap(section =>
        section.flatMap(sched =>
            sched.courses.map(course => [
                course.professor_name || "TBA",
                course.course_code,
                course.course_description || "N/A",
                course.lecture_units || "N/A",
                course.lab_units || 0,
                `${course.lecture_day_of_week || ''}${course.lecture_units !== 3 && course.lab_day_of_week !== "Day Not Assigned" ? `/${course.lab_day_of_week}` : ""}`,
                `${course.lecture_time_range || ''}${course.lecture_units !== 3 && course.lab_time_range !== "Time Not Assigned" ? `/${course.lab_time_range}` : ""}`,
                course.lecture_room_number || "N/A",
                `${sched.year_level || ''}${sched.section_label || ''}`
            ])
        )
    );

    // Render the table
    doc.autoTable({
        startY: 40,
        head: headers,
        body: rows,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellPadding: 2,
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
        },
        headStyles: {
            fillColor: [255, 255, 255], // White background for header
            textColor: [0, 0, 0],       // Black text for header
            halign: 'center',
            lineColor: [0, 0, 0],
        },
        bodyStyles: {
            halign: 'center',
            lineColor: [0, 0, 0],
        },
        columnStyles: {
            0: { cellWidth: 25 },  // Professor Name
            1: { cellWidth: 20 },  // Course Code
            2: { cellWidth: 50 },  // Course Description
            3: { cellWidth: 10 },  // Lec
            4: { cellWidth: 10 },  // Lab
            5: { cellWidth: 15 },  // Day
            6: { cellWidth: 32 },  // Time
            7: { cellWidth: 15 },  // Room
            8: { cellWidth: 15 },  // Section
        },
        margin: { top: 10 },
        tableWidth: 'wrap',
    });

        // Open the PDF in a new tab
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const newWindow = window.open(pdfUrl);
        if (newWindow) {
            newWindow.focus();
        } else {
            alert('Please allow popups for this website');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col w-1/4 bg-white shadow-lg">
                <div className="text-center m-5">
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
    );
};

export default PrintModal;
