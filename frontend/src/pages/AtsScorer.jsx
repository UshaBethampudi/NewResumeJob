import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardStyles as styles } from '../assets/dummystyle';

const AtsScorer = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    try {
      const res = await axios.post('/api/ats/score', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setScore(res.data.score);
      setSuggestions(res.data.suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>ATS Scorer</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Resume</label>
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-40 p-2 border rounded"
            ></textarea>
          </div>
          <button type="submit" className={`${styles.createButton} group`}>
            <div className={styles.createButtonOverlay}></div>
            <span className={styles.createButtonContent}>
              Get Score
            </span>
          </button>
        </form>
        {score !== null && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">ATS Score: <span className='text-violet-500'>{score}%</span></h2>
            <h3 className="text-xl font-bold mt-4">Suggestions:</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AtsScorer;