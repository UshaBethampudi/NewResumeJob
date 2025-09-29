import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import ApplyModal from '../components/ApplyModal';
import { UserContext } from '../context/userContext';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.JOBS.GET_ALL);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>Jobs</h1>
            <p className={styles.headerSubtitle}>Find your next opportunity</p>
          </div>
        </div>

        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <h3 className={styles.emptyTitle}>No Jobs Found</h3>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{job.jobTitle}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <p className="text-gray-600 mb-2">{job.experience}</p>
                <p className="text-gray-600 mb-2">{job.salary}</p>
                <p className="text-gray-800 mb-4">{job.jobDescription}</p>
                <button
                  className={`${styles.createButton} group`}
                  onClick={() => handleApplyClick(job)}
                >
                  <div className={styles.createButtonOverlay}></div>
                  <span className={styles.createButtonContent}>
                    Apply
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          job={selectedJob}
          user={user}
        />
      )}
    </DashboardLayout>
  );
};

export default Jobs;