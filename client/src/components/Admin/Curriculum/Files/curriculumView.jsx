import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CurriculumTable from "./CurriculumTable";

import api from "../../../../api";

const CurriculumView = () => {
  const location = useLocation();
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      const response = await api(`curriculum/?department_id${location.state}`);
      setCurriculums(response.data);
    };

    fetchCurriculums();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64"></div>{" "}
      <div className="container mx-auto px-4 py-6">
        <h2 className="mb-4 mt-8 text-center text-xl font-bold">CURRICULUM</h2>
        {curriculums?.map((curriculum, index) => (
          <CurriculumTable key={index} curriculum={curriculum} />
        ))}
      </div>
    </div>
  );
};

export default CurriculumView;
