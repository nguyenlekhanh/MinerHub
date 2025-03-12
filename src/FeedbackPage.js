import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

import { db } from "./config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"

const FeedbackPage = () => {
  // States to handle request description and submit button state
  const [feedbackData, setFeedsbackData] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedbackDescription, setFeedbackDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState('Submit');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const minerHubFeedbackRef = collection(db, "minerhub_feedback");

  // Fetch all request descriptions from Firebase
  const fetchRequests = async () => {
    try {
      // const querySnapshot = await db.collection('minerhub_feedback').orderBy('timestamp', 'desc').get();
      // const feedbackData = querySnapshot.docs.map(doc => doc.data());

      const feedbackData = await getDocs(minerHubFeedbackRef)
      const filterData = feedbackData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setFeedbackList(filterData);
      // setFeedsbackData(feedbackData);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async () => {
    if (feedbackDescription.trim() === '') return;

    setIsSubmitDisabled(true); // Disable the submit button
    setIsSubmitting(true);
    setSubmitText('Please wait...');

    try {
      await addDoc(minerHubFeedbackRef, {
        feedback: feedbackDescription,
        createdAt: serverTimestamp()
      });

      fetchRequests();

      setIsSubmitting(false);
      setSubmitText('Submit');

      setTimeout(() => {
        setIsSubmitDisabled(false);
      }, 60000); // 60000ms = 60 seconds
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
      setSubmitText('Submit');
      setIsSubmitDisabled(false);
    }
  };

  const formatFeedback = (feedback) => {
    return feedback.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };


  return (
    <div className="container py-5" id="feedback-page">
      <h2 className="mb-4">Feedback Description:</h2>

      {/* Feedback Textarea */}
      <div className="form-group">
        <textarea
          value={feedbackDescription}
          onChange={(e) => setFeedbackDescription(e.target.value)}
          rows="5"
          className="form-control"
          placeholder="Enter your feedback..."
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="btn btn-primary mt-3"
      >
        {submitText}
      </button>

      <h3 className="mt-5">All Requests:</h3>

      {/* Feedback Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Feedback Description</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((feedback, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ whiteSpace: 'pre-line' }}>
                {formatFeedback(feedback.feedback)}

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackPage;
