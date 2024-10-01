import React from 'react';
import ScheduleRow from './ScheduleRow';

const ScheduleTable = () => {
    const timeSlots = Array.from({ length: 30 }).map((_, index) => {
    const hour = 7 + Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'am' : 'pm';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const nextHour = hour === 10 && minute === '30' ? 10 : hour + (minute === '30' ? 1 : 0);
    const displayNextHour = nextHour > 12 ? nextHour - 12 : nextHour;

    return `${displayHour}:${minute} ${period} - ${displayNextHour}:00 ${nextHour >= 12 ? 'pm' : 'am'}`;
  });

  return (
    <table className="border border-collapse w-full">
      <thead>
        <tr className="bg-green text-white text-xs">
          <th className="border border-white py-[0.6rem] w-40">TIME</th>
          <th className="border border-white w-40">MONDAY</th>
          <th className="border border-white w-40">TUESDAY</th>
          <th className="border border-white w-40">WEDNESDAY</th>
          <th className="border border-white w-40">THURSDAY</th>
          <th className="border border-white w-40">FRIDAY</th>
          <th className="border border-white w-40">SATURDAY</th>
          <th className="border border-white w-40">SUNDAY</th>
        </tr>
      </thead>
      <tbody className='text-xs text-center'>
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