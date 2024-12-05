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
        setGanttImage(rawData.gantt_chart.image);

        // Process and format rows and items
        const rows = rawData.rows.map((row) => ({
          ...row,
          id: GSTCID(row.id),
          customField: `Room: ${row.label}`, // Custom field for demonstration
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

    // GSTC Configuration
    const config = {
      licenseKey:
        "hADNzx8RMYTxlvcxFUsHH3TG4ilj2eabwWTM46fQcqRJPnf3AJfkVXHIu5TZgNnWXPpfOPf4MU1jN7Tq+kX7d3DjMZAieBvzw2xy0rRNkDaV3cpm9F4ICfxp9HHkaiRcYIzkBXwCVqp5SxaUbHDBJy/LCoJmuui9qORwZpeJNmvRSckzmc+9sGU6hR5W/EBT0pGIBtFOQy2wF1hC4z6GecbLp4zwRSjtAhLPNwQgiLnLHjaQhDNJift5Yn9MUwRV0mME6p2lHWgworC7NjbejkqXPjw+soLEckJ84KsIKgT1cnVuGOKJ1pi/bansZG8MC1ZZiBxeMPT9MF6umnEY2Q==||U2FsdGVkX194UK4YYZKcm2TxijmeNTwatRliJwPl1TQcXOG/TLlAjbYNlp+0BwM1iYZ5afj/0kN0oHDkhAa7oGlLzfpZF1ZMilvxBqQ+7tc=\nC/o7HoUatFssVXC/ApBbjhnqFu6Nt0IWEuffGk9zQGvjNRZdAa+hcu06BxcPincFil7vPLkfgyKlxzen/W7E6d0HQDLDfvNXpDzJCrETfnfcy63C6QZtv/qYDIPOQLsCnzLPO329ref0Qe/NtmMFaMN0C7yabzRs8dmCVDRewbIbzqEJLmp7oTqVmEcc9I0OjjNMXwMxb94vA6RZe2lUvz1f69EcxdK2CzxyvjOLslRiNeXX17lC8tUNxXu0KfMoXSgOZXWP5AU+vbe15AwP5uAzk3vMnNG0aAIqRZeq8/BFPLUXKrQ+3CeV0d64PjVzy3w6OPChlza9+aGfuHYu2w==",
      list: {
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
        rows: ganttData.rows.reduce((acc, row) => {
          acc[row.id] = row;
          return acc;
        }, {}),
      },
      chart: {
        items: ganttData.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {}),
      },
      scroll: { horizontal: { precise: true } },
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
      <div className="relative h-3/4 w-3/4 rounded-lg bg-white p-4">
        <button
          className="absolute right-2 top-2 rounded bg-red-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
        {loading ? (
          <p className="text-center text-gray-500">Loading Gantt Chart...</p>
        ) : (
          <>
            <img src={`data:image/png;base64,${ganttImage}`} alt="" />
          </>
        )}
      </div>
    </div>
  );
};

export default GanttChartModal;
