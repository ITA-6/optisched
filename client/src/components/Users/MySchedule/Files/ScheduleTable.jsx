import React from 'react';
import ScheduleRow from './ScheduleRow';

const ScheduleTable = () => {
  const timeSlots = Array.from({ length: 32 }).map((_, index) => {
    // Calculate the hour and minute based on the index
    const hour = 6 + Math.floor(index / 2);  // Start from 7 AM
    const minute = index % 2 === 0 ? '00' : '30';  // Alternate between 00 and 30 for minutes
    
    // Determine AM/PM for current hour
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 12 ? 12 : hour;  // Convert 24-hour to 12-hour format
    
    // Determine the next hour and the period for the next time slot
    let nextHour = hour;
    let nextMinute = minute === '00' ? '30' : '00';
    if (minute === '30') {
      nextHour += 1;
    }
    const nextPeriod = nextHour >= 12 ? 'pm' : 'am';
    const displayNextHour = nextHour > 12 ? nextHour - 12 : nextHour === 12 ? 12 : nextHour;
    
    return `${displayHour}:${minute} ${period} - ${displayNextHour}:${nextMinute} ${nextPeriod}`;
  });

  return (
    <table className="border border-collapse w-full">
      <thead>
        <tr className="bg-green text-white text-xs">
          <th className="border py-[0.6rem] w-40">TIME</th>
          <th className="border w-40">MONDAY</th>
          <th className="border w-40">TUESDAY</th>
          <th className="border w-40">WEDNESDAY</th>
          <th className="border w-40">THURSDAY</th>
          <th className="border w-40">FRIDAY</th>
          <th className="border w-40">SATURDAY</th>
          <th className="border w-40">SUNDAY</th>
        </tr>
      </thead>
      <tbody className="text-xs text-center">
        {timeSlots.map((timeSlot, index) => (
          <ScheduleRow key={index} timeSlot={timeSlot} />
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-green text-white text-xs">
          <th className="border border-white py-[0.6rem] w-40">TIME</th>
          <th className="border">MONDAY</th>
          <th className="border">TUESDAY</th>
          <th className="border">WEDNESDAY</th>
          <th className="border">THURSDAY</th>
          <th className="border">FRIDAY</th>
          <th className="border">SATURDAY</th>
          <th className="border">SUNDAY</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default ScheduleTable;
