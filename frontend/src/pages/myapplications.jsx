import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.APPLICATIONS.GET_ALL);
        
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Applications</h1>
            <p className={styles.headerSubtitle}>Track your job applications</p>
          </div>
        </div>

        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <h3 className={styles.emptyTitle}>No Applications Found</h3>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">{app.jobId ? app.jobId.jobTitle : 'Position Not Available'}</h2>
                <p className="text-gray-600 mb-2">{app.jobId ? app.jobId.company : 'Company Not Available'}</p>
                <p className="text-gray-600 mb-2">Status: Applied {app.jobId ? `for ${app.jobId.jobTitle}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyApplications;