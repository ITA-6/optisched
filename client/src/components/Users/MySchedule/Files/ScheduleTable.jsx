import React from 'react';
import ScheduleRow from './ScheduleRow';

const ScheduleTable = () => {
  
  return (
    <table className="border border-collapse  xm:table-fixed w-full sm:table-fixed ">
      <thead>
        <tr className="bg-green text-white text-xs">
          <th className="border py-[0.6rem] xm:w-40 sm:w-40">TIME</th>
          <th className="border xm:w-40 sm:w-40">MONDAY</th>
          <th className="border xm:w-40 sm:w-40">TUESDAY</th>
          <th className="border xm:w-40 sm:w-40">WEDNESDAY</th>
          <th className="border xm:w-40 sm:w-40">THURSDAY</th>
          <th className="border xm:w-40 sm:w-40">FRIDAY</th>
          <th className="border xm:w-40 sm:w-40">SATURDAY</th>
          <th className="border xm:w-40 sm:w-40">SUNDAY</th>
        </tr>
      </thead>
      <tbody className="text-xs text-center">
          <ScheduleRow/>
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
