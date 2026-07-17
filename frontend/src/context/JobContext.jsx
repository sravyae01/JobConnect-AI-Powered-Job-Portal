import { createContext, useContext, useEffect, useState } from "react";
import { getJobs, getPopularSearches } from "../services/jobService";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobsData, searchData] = await Promise.all([
          getJobs(),
          getPopularSearches(),
        ]);

        setJobs(jobsData);
        setPopularSearches(searchData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        popularSearches,
        loading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);