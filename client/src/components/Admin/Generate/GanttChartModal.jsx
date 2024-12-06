import React, { useEffect, useRef, useState } from "react";
import GSTC from "gantt-schedule-timeline-calendar";
import "gantt-schedule-timeline-calendar/dist/style.css";
import api from "../../../api";

const GSTCID = GSTC.api.GSTCID;

const GanttChartModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [ganttData, setGanttData] = useState({ rows: [], items: [] });
  const gstcContainerRef = useRef(null);
  const gstcInstance = useRef(null);
  const [ganttImage, setGanttImage] = useState(null);

  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        setLoading(true);
        const response = await api.get("schedule/gantt/");
        const rawData = response.data;

        console.log("API Response:", rawData); // Debugging

        setGanttImage(rawData.gantt_chart.image); // Set base64 image

        // Format rows and items
        const rows = rawData.rows.map((row) => ({
          ...row,
          id: GSTCID(row.id),
          customField: `Room: ${row.label}`, // Add custom field for demonstration
        }));

        const items = rawData.items.map((item) => ({
          ...item,
          id: GSTCID(item.id),
          rowId: GSTCID(item.rowId),
        }));

        setGanttData({ rows, items });
      } catch (error) {
        console.error("Error fetching Gantt data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchGanttData();
    }

    return () => {
      if (gstcInstance.current) {
        gstcInstance.current.destroy();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!gstcContainerRef.current || ganttData.rows.length === 0) return;

    const config = {
      licenseKey: "your-license-key", // Replace with your GSTC license key
      list: {
        rows: ganttData.rows.reduce((acc, row) => {
          acc[row.id] = {
            ...row,
            height: 50, // Further increase row height for better spacing
          };
          return acc;
        }, {}),
        columns: {
          data: {
            [GSTCID("label")]: {
              id: GSTCID("label"),
              data: "label",
              width: 200,
              header: {
                content: "Room Name",
              },
            },
            [GSTCID("customField")]: {
              id: GSTCID("customField"),
              data: "customField",
              width: 200,
              header: {
                content: "Custom Field",
              },
            },
          },
        },
      },
      chart: {
        items: ganttData.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {}),
        time: {
          zoom: 10, // Reduce zoom level for better readability
          from: GSTC.api.date().startOf("day").valueOf(),
          to: GSTC.api.date().endOf("day").add(1, "day").valueOf(),
          period: "hour",
          header: [
            {
              content: "MMM DD, YYYY", // Top header for dates
              style: { "font-size": "14px", "margin-bottom": "10px" },
            },
            {
              content: "hh:mm A", // Bottom header for hours
              style: {
                "font-size": "12px",
                "margin-top": "5px",
                "padding-bottom": "10px",
                transform: "rotate(-30deg)", // Slight rotation for readability
              },
            },
          ],
        },
      },
      scroll: {
        horizontal: { precise: true },
        vertical: {
          enabled: true, // Enable vertical scrolling
        },
      },
    };

    gstcInstance.current = GSTC({
      element: gstcContainerRef.current,
      state: GSTC.api.stateFromConfig(config),
    });

    return () => {
      if (gstcInstance.current) {
        gstcInstance.current.destroy();
      }
    };
  }, [ganttData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative flex h-[90%] w-[95%] max-w-7xl flex-col rounded-lg bg-white p-4">
        <button
          className="absolute right-2 top-2 rounded bg-red-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
        {loading ? (
          <p className="text-center text-gray-500">Loading Gantt Chart...</p>
        ) : ganttImage ? (
          <div className="h-full w-full overflow-auto">
            <img
              src={`data:image/png;base64,${ganttImage}`}
              alt="Gantt Chart"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div
            ref={gstcContainerRef}
            className="h-full w-full border border-gray-300"
          />
        )}
      </div>
    </div>
  );
};

export default GanttChartModal;
