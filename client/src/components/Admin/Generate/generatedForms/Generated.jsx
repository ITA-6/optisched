import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { departments } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Generated = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const navigate = useNavigate();

  //find the department.name that matches the decodedName
  const departmentData = departments.find((item) => item.name === decodedName);

  if (!departmentData) {
    return <div>Data not found</div>;
  }

  const handleBackClick = () => {
    navigate("/admin/generate");
  };

  return (
    <div className="h-screen w-screen bg-white-grayish">
      <div className="ml-[18rem] mr-[2rem] grid h-screen grid-cols-[2fr_1fr] grid-rows-[1fr_1fr_8fr] pb-10 grid-areas-generated-table-layout">
        <div className="flex items-center justify-start gap-5 grid-in-generatedText">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2xl"
            className="cursor-pointer"
            onClick={handleBackClick}
          />
          <h1 className="text-2xl font-medium">Generated Schedule</h1>
        </div>
        <div className="flex items-center justify-end pr-5 grid-in-printBtn">
          <FontAwesomeIcon icon={faPrint} size="2xl" />
        </div>
        <div className="h-full bg-white px-5 pt-5 grid-in-table">
          <div className="grid grid-cols-[1fr-1fr] grid-rows-[0.5fr_0.5fr_0.5fr_8fr_1fr] grid-areas-generated-table">
            <h1 className="text-xl font-bold grid-in-profName">
              Professor name : {departmentData.name}
            </h1>
            <h1 className="text-xl font-bold grid-in-departmentName">
              Department : {departmentData.department}
            </h1>
            <h1 className="text-xl font-bold grid-in-appointmentStatus">
              Appointment Status : {departmentData.appointment}
            </h1>

            <div className="h-full w-full flex-1 grid-in-table">
              <table className="h-full w-full">
                <thead className="bg-green">
                  <th>Course Code</th>
                  <th>Course Description</th>
                  <th>Lec Units</th>
                  <th>Lab Units</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Units</th>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between py-2 grid-in-units">
              <h1 className="text-xl font-medium">Total Units :</h1>
              <button className="color-white rounded-lg bg-green px-10 py-3">
                {" "}
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generated;
