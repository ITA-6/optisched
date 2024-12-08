import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import api from "../../../api";

const GanttChartModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [ganttData, setGanttData] = useState({ rows: [], items: [] });
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default day
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for editing mode

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const fetchGanttData = async () => {
    try {
      setLoading(true);
      const response = await api.get("schedule/gantt/");
      const rawData = response.data;

      // Format rows and items
      const rows = rawData.rows.map((row) => ({
        id: row.id,
        room: row.roomId,
        label: row.label,
      }));

      const items = rawData.items.map((item) => ({
        id: item.id,
        day: item.day,
        rowId: item.rowId,
        room: item.room,
        type: item.type,
        roomId: item.roomId,
        label: item.label,
        start: formatTime(item.time.start), // Convert to HH:mm
        end: formatTime(item.time.end), // Convert to HH:mm
      }));

      setGanttData({ rows, items });
    } catch (error) {
      console.error("Error fetching Gantt data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchGanttData();
    }
  }, [isOpen]);

  const handleLabelClick = (event) => {
    const name = event.points[0].data.name;
    const [clickedItem] = ganttData.items.filter((item) => item.label === name);
    const [row] = ganttData.rows.filter(
      (row) => row.room === clickedItem.roomId,
    );

    setSelectedItem({ ...clickedItem, rowId: row.label });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const data = {
        course_schedule_id: selectedItem.id,
        room_id: selectedItem.roomId,
        type: selectedItem.type,
        start: selectedItem.start,
        end: selectedItem.end,
      };

      await api.put("schedule/manual-fix/", data);
      setSelectedItem(null);
      fetchGanttData();
    } catch (error) {
      console.error(error);
    }
  };

  const changeTime = (e) => {
    const newStart = e.target.value; // The new start time
    setSelectedItem((prev) => {
      // Calculate the total duration in minutes between old start and end times
      const oldStart = new Date(`1970-01-01T${prev.start}:00`);
      const oldEnd = new Date(`1970-01-01T${prev.end}:00`);
      const totalDuration = (oldEnd - oldStart) / (1000 * 60); // Duration in minutes

      const time = new Date(`1970-01-01T${newStart}:00`);
      const newEnd = new Date(time.getTime() + totalDuration * 60000);
      const hours = newEnd.getHours().toString().padStart(2, "0"); // Format hours as two digits
      const minutes = newEnd.getMinutes().toString().padStart(2, "0"); // Format minutes as two digits
      const formattedNewEnd = `${hours}:${minutes}`; // Combine hours and minutes

      return {
        ...prev,
        start: newStart,
        end: formattedNewEnd,
      };
    });
  };

  const detectOverlaps = (items) => {
    const overlaps = new Set();

    // Group items by rowId (room)
    const groupedByRow = items.reduce((acc, item) => {
      if (!acc[item.rowId]) acc[item.rowId] = [];
      acc[item.rowId].push(item);
      return acc;
    }, {});

    // Detect overlaps within each group
    Object.values(groupedByRow).forEach((group) => {
      group.sort((a, b) => {
        const aStart = new Date(`1970-01-01T${a.start}:00`);
        const bStart = new Date(`1970-01-01T${b.start}:00`);
        return aStart - bStart;
      }); // Sort by start time

      for (let i = 0; i < group.length - 1; i++) {
        const current = group[i];
        const next = group[i + 1];

        const currentEnd = new Date(`1970-01-01T${current.end}:00`);
        const nextStart = new Date(`1970-01-01T${next.start}:00`);

        if (currentEnd > nextStart && group[i].day === group[i + 1].day) {
          overlaps.add(current.id);
          overlaps.add(next.id);
        }
      }
    });

    return overlaps;
  };

  const preparePlotlyData = () => {
    const { rows, items } = ganttData;

    const roomMapping = {};
    rows.forEach((row) => {
      roomMapping[row.id] = row.label;
    });

    // Filter items by selected day
    const filteredItems = items.filter((item) => item.day === selectedDay);

    // Detect overlaps
    const overlaps = detectOverlaps(filteredItems);

    // Prepare Plotly traces
    const data = filteredItems.map((item) => ({
      x: [item.start, item.end], // Use HH:mm formatted times
      y: [roomMapping[item.rowId], roomMapping[item.rowId]],
      mode: "lines",
      line: {
        width: 10,
        color: overlaps.has(item.id) ? "red" : "blue", // Red for overlap, blue otherwise
      },
      name: item.label,
      hovertemplate: `
    Label: ${item.label}<br>
    Room: ${roomMapping[item.rowId]}<br>
    Day: ${item.day}<br>
    Start: ${item.start}<br>
    End: ${item.end}<br>
    ${overlaps.has(item.id) ? "<span style='color:red'>Overlapping</span>" : ""}
        `,
    }));

    return data;
  };

  const plotlyLayout = {
    title: `Schedule Gantt Chart - ${selectedDay}`,
    xaxis: {
      title: "Time",
      type: "category", // Use category for HH:mm format
    },
    yaxis: {
      title: "Rooms",
      automargin: true,
      categoryorder: "category ascending", // Order rooms by label
    },
    showlegend: false,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative flex h-[90%] w-[95%] max-w-7xl flex-col overflow-hidden rounded-lg bg-white p-4">
        <button
          className="absolute right-2 top-2 rounded bg-red-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
        {loading ? (
          <p className="mt-80 text-center text-3xl font-bold text-gray-500">
            Loading Gantt Chart...
          </p>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <label htmlFor="day-select" className="text-gray-700">
                Select Day:
              </label>
              <select
                id="day-select"
                className="rounded border-gray-300 p-2"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 h-full w-full overflow-auto">
              <Plot
                data={preparePlotlyData()}
                layout={plotlyLayout}
                onClick={handleLabelClick}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
              />
            </div>
          </>
        )}
      </div>
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative rounded-lg bg-white p-6">
            <h3 className="text-lg font-bold">Details</h3>
            {isEditing ? (
              <>
                <label>
                  Room:
                  <select
                    value={selectedItem.rowId}
                    onChange={(e) => {
                      const [room] = ganttData.rows.filter((row) => {
                        return row.label === e.target.value;
                      });
                      setSelectedItem({
                        ...selectedItem,
                        roomId: room.room,
                        rowId: e.target.value,
                      });
                    }}
                    className="mt-2 block w-full rounded border border-gray-300 p-2"
                  >
                    {ganttData.rows.map((row) => (
                      <option key={row.id} value={row.roomId}>
                        {row.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Time:
                  <input
                    type="time"
                    value={selectedItem.start}
                    onChange={changeTime}
                    className="mt-2 block w-full rounded border border-gray-300 p-2"
                  />
                </label>
                <button
                  className="mx-8 mt-4 rounded bg-green px-4 py-2 text-white"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p>
                  <b>Label:</b> {selectedItem.label}
                </p>
                <p>
                  <b>Room:</b> {selectedItem.room}
                </p>
                <p>
                  <b>Start:</b> {selectedItem.start}
                </p>
                <p>
                  <b>End:</b> {selectedItem.end}
                </p>
                <button
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </>
            )}
            <button
              className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
              onClick={() => {
                setSelectedItem(null);
                setIsEditing(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChartModal;
