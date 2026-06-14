import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const jobService = {
  /**
   * Fetch all job applications for the logged-in user.
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  async getJobs(userId) {
    try {
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((docSnap) => {
        jobs.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Sort newest first (descending order by createdAt)
      return jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Could not retrieve your applications. Please try again.');
    }
  },

  /**
   * Create a new job application in Firestore.
   * @param {string} userId
   * @param {Object} job
   * @returns {Promise<Object>}
   */
  async createJob(userId, job) {
    try {
      const jobDocRef = doc(db, 'jobs', job.id);
      const newJob = {
        ...job,
        userId,
        createdAt: job.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(jobDocRef, newJob);
      return newJob;
    } catch (error) {
      console.error('Error creating job:', error);
      throw new Error('Failed to save the application. Please try again.');
    }
  },

  /**
   * Update an existing job application.
   * @param {string} jobId
   * @param {Object} updatedData
   * @returns {Promise<Object>}
   */
  async updateJob(jobId, updatedData) {
    try {
      const jobDocRef = doc(db, 'jobs', jobId);
      const dataToUpdate = {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(jobDocRef, dataToUpdate);
      return dataToUpdate;
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error('Failed to update the application details. Please try again.');
    }
  },

  /**
   * Delete a job application.
   * @param {string} jobId
   * @returns {Promise<void>}
   */
  async deleteJob(jobId) {
    try {
      const jobDocRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobDocRef);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error('Failed to delete the application. Please try again.');
    }
  }
};
