import React from 'react';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import HeaderSchedule from './PrintableSchedule/HeaderSchedule';
import ScheduleTable from './PrintableSchedule/ScheduleTable';

const ROWS_PER_PAGE = 13; // Set the number of rows per page

const PrintModal = ({ togglePrintModal, filterScheduleSections }) => {
    const printPage = () => {
        // Flatten all chunks across all sections to ensure page-break is only applied on non-last chunks
        const allChunks = filterScheduleSections?.flatMap((sectionArray, sectionIndex) => {
            const chunks = [];
            for (let i = 0; i < sectionArray.length; i += ROWS_PER_PAGE) {
                chunks.push({ data: sectionArray.slice(i, i + ROWS_PER_PAGE), sectionIndex });
            }
            return chunks;
        });

        // Generate content with Header and rows for each chunk
        const TableContent = allChunks?.map((chunk, chunkIndex) => {
            const isLastChunk = chunkIndex === allChunks.length - 1;
            const pageBreakStyle = isLastChunk ? '' : 'page-break-after: always;';

            return `
                <div key="${chunk.sectionIndex}-${chunkIndex}" style="${pageBreakStyle} margin: 0; padding: 0;">
                    <div style="margin: 0; padding: 0;">
                        ${ReactDOMServer.renderToStaticMarkup(
                            <HeaderSchedule style={{ margin: 0, padding: 0 }} />
                        )}
                    </div>
                    ${ReactDOMServer.renderToStaticMarkup(<ScheduleTable sectionArray={chunk.data} />)}
                </div>
            `;
        }).join('');

        const contentToPrint = `
            <div style="margin: 0; padding: 0; box-sizing: border-box;" class="flex flex-col justify-center px-7 text-center">
                ${TableContent}
            </div>
        `;

        const options = {
            margin: 10, // Set left-right and bottom margins for the PDF
            filename: 'generated-pdf.pdf', // PDF filename
            image: { type: 'jpeg', quality: 1.0 }, // Image quality
            html2canvas: { scale: 2, useCORS: true }, // Higher scale for clarity
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' } // PDF format
        };

        // Create a new element to contain the content
        const element = document.createElement('div');
        element.innerHTML = contentToPrint;

        // Use html2pdf to convert content to PDF
        html2pdf()
            .from(element)
            .set(options)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);

                // Open PDF in a new tab
                const newWindow = window.open(pdfUrl);
                if (newWindow) {
                    newWindow.focus();
                } else {
                    alert('Please allow popups for this website');
                }
            });
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
