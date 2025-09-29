import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import ApplyModal from '../components/ApplyModal';
import { UserContext } from '../context/userContext';

const jobExamples = [
  {
    "_id": "1",
    "jobTitle": "Software Engineer",
    "company": "Infosys",
    "location": "Hyderabad",
    "experience": "2-4 years",
    "salary": "6-10 LPA",
    "jobDescription": "Java, Spring Boot, Microservices, REST APIs, SQL"
  },
  {
    "_id": "2",
    "jobTitle": "UI Developer",
    "company": "Infosys",
    "location": "Bangalore",
    "experience": "1-3 years",
    "salary": "4-7 LPA",
    "jobDescription": "React, JavaScript, HTML, CSS, Tailwind"
  },
  {
    "_id": "3",
    "jobTitle": "Business Analyst",
    "company": "Infosys",
    "location": "Pune",
    "experience": "3-5 years",
    "salary": "7-12 LPA",
    "jobDescription": "Client communication, Requirement analysis, Agile, Documentation"
  },
  {
    "_id": "4",
    "jobTitle": "Data Analyst",
    "company": "Tech Mahindra",
    "location": "Pune",
    "experience": "1-3 years",
    "salary": "5-8 LPA",
    "jobDescription": "Python, Power BI, SQL, Data Visualization, Excel"
  },
  {
    "_id": "5",
    "jobTitle": "Backend Developer",
    "company": "Tech Mahindra",
    "location": "Bangalore",
    "experience": "2-4 years",
    "salary": "6-9 LPA",
    "jobDescription": "Node.js, Express.js, REST APIs, MongoDB"
  },
  {
    "_id": "6",
    "jobTitle": "Cloud Support Engineer",
    "company": "Tech Mahindra",
    "location": "Hyderabad",
    "experience": "1-3 years",
    "salary": "5-8 LPA",
    "jobDescription": "AWS, Networking, Linux, Cloud Troubleshooting"
  },
  {
    "_id": "7",
    "jobTitle": "Cloud DevOps Engineer",
    "company": "Cognizant",
    "location": "Chennai",
    "experience": "2-5 years",
    "salary": "8-12 LPA",
    "jobDescription": "AWS, Docker, Kubernetes, CI/CD, Linux administration"
  },
  {
    "_id": "8",
    "jobTitle": "Full Stack Developer",
    "company": "Cognizant",
    "location": "Mumbai",
    "experience": "1-4 years",
    "salary": "6-10 LPA",
    "jobDescription": "MERN Stack, REST APIs, Git, Deployment"
  },
  {
    "_id": "9",
    "jobTitle": "QA Automation Engineer",
    "company": "Cognizant",
    "location": "Kolkata",
    "experience": "2-4 years",
    "salary": "5-9 LPA",
    "jobDescription": "Selenium, TestNG, API Testing, Java/Python"
  },
  {
    "_id": "10",
    "jobTitle": "Database Administrator",
    "company": "Oracle",
    "location": "Hyderabad",
    "experience": "3-6 years",
    "salary": "10-15 LPA",
    "jobDescription": "Oracle DB, SQL, Performance Tuning, Backup & Recovery"
  },
  {
    "_id": "11",
    "jobTitle": "Java Developer",
    "company": "Oracle",
    "location": "Bangalore",
    "experience": "2-4 years",
    "salary": "8-12 LPA",
    "jobDescription": "Java, Spring Boot, Microservices, REST APIs"
  },
  {
    "_id": "12",
    "jobTitle": "Cloud Architect",
    "company": "Oracle",
    "location": "Pune",
    "experience": "4-7 years",
    "salary": "12-20 LPA",
    "jobDescription": "OCI, Kubernetes, Terraform, DevOps"
  },
  {
    "_id": "13",
    "jobTitle": "Frontend Developer",
    "company": "Capgemini",
    "location": "Mumbai",
    "experience": "1-3 years",
    "salary": "4-7 LPA",
    "jobDescription": "React, JavaScript, HTML, CSS"
  },
  {
    "_id": "14",
    "jobTitle": "Python Developer",
    "company": "Capgemini",
    "location": "Noida",
    "experience": "2-4 years",
    "salary": "6-10 LPA",
    "jobDescription": "Python, Django, REST APIs, SQL"
  },
  {
    "_id": "15",
    "jobTitle": "Data Engineer",
    "company": "Capgemini",
    "location": "Hyderabad",
    "experience": "3-5 years",
    "salary": "8-13 LPA",
    "jobDescription": "Big Data, ETL, AWS, Spark, SQL"
  },
  {
    "_id": "16",
    "jobTitle": "Software Developer",
    "company": "FactSet",
    "location": "Hyderabad",
    "experience": "1-3 years",
    "salary": "6-9 LPA",
    "jobDescription": "JavaScript, React, APIs, Agile"
  },
  {
    "_id": "17",
    "jobTitle": "Data Research Analyst",
    "company": "FactSet",
    "location": "Chennai",
    "experience": "0-2 years",
    "salary": "4-6 LPA",
    "jobDescription": "Data Analysis, Excel, SQL, Financial Research"
  },
  {
    "_id": "18",
    "jobTitle": "DevOps Engineer",
    "company": "FactSet",
    "location": "Bangalore",
    "experience": "2-5 years",
    "salary": "8-12 LPA",
    "jobDescription": "CI/CD, AWS, Docker, Jenkins, Linux"
  }
];

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
        setJobs(jobExamples);
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