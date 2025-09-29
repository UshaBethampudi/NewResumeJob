import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { dashboardStyles as styles } from '../assets/dummystyle';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const ApplyModal = ({ isOpen, onClose, job, user }) => {
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    totalExperience: '',
    currentCTC: '',
    expectedCTC: '',
    skills: [],
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setFormData((prev) => ({ ...prev, [name]: value.split(',').map(skill => skill.trim()) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATHS.APPLICATIONS.CREATE, {
        ...formData,
        jobId: job._id,
        userId: user._id,
        jobTitle: job.jobTitle,
      });
      toast.success('Application submitted successfully');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply for ${job?.jobTitle}`}>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="totalExperience"
              placeholder="Total Experience"
              value={formData.totalExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="currentCTC"
              placeholder="Current CTC"
              value={formData.currentCTC}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="expectedCTC"
              placeholder="Expected CTC"
              value={formData.expectedCTC}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma-separated)"
              value={formData.skills.join(', ')}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className={`${styles.createButton} group`}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ApplyModal;