import React, { useState, useEffect } from "react";
import { GSTC } from "gantt-schedule-timeline-calendar";
import "gantt-schedule-timeline-calendar/dist/style.css";
import api from "../../../api";

const GanttChart = () => {
  const [ganttData, setGanttData] = useState({ rows: [], items: [] });

  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        const response = await api.get("/api/schedule/gantt/");
        setGanttData(response.data);
      } catch (error) {
        console.error("Error fetching Gantt data:", error);
      }
    };

    fetchGanttData();
  }, []);

  return (
    <div>
      <h2>Schedule Gantt Chart</h2>
      <GSTC
        state={{
          config: {
            list: { rows: ganttData.rows },
            chart: { items: ganttData.items },
          },
        }}
      />
    </div>
  );
};

export default GanttChart;
