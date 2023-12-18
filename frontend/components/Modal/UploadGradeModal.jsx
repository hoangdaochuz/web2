import React, { useState } from 'react';
import UploadModal from './UploadModal';
import axios from 'axios';
import Papa from 'papaparse';
import Router from 'next/router';
import { toast } from 'react-toastify';

const parseGradeData = (data) => {
  if (!data) {
    return [];
  }
  if (Object.keys[data[0]] === 'StudentId') {
    throw new Error('Invalid file format');
  }
  const assignmentName = Object.keys(data[0])[1];
  const filterGrade = data.filter((item) => {
    if (item.StudentId.length === 0) {
      return false;
    }
    return true;
  });
  return filterGrade.map((item) => {
    if (item[assignmentName] === '') {
      item[assignmentName] = 0;
    }
    if (typeof item[assignmentName] === 'string') {
      item[assignmentName] = parseFloat(item[assignmentName]);
    }

    return {
      id: item.StudentId,
      grade: item[assignmentName],
    };
  });
};

const UploadGradeModal = ({ showModal, setShowModal, jwt, slug }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleCSVFileSubmit(event) {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }
    setLoading(true);
    Papa.parse(selectedFile, {
      complete: async (result) => {
        const data = result.data;
        try {
          const grades = parseGradeData(data);
          const assignmentId = Object.keys(data[0])[2];
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${slug}/assignment/${assignmentId}/upload`,
            {
              grades,
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setLoading(false);
          setShowModal(false);
          toast.success('Upload successfully!');
          // setAlert({ show: true, type: 'alert-success', message: 'Upload successfully!' });
          // setTimeout(() => {
          //   setAlert({});
          // }, 3000);

          Router.reload(window.location.pathname);
        } catch (err) {
          setLoading(false);
          setShowModal(false);
          toast.success('Upload failed!');
          // setAlert({ show: true, type: 'alert-danger', message: 'Upload failed!' });
          // setTimeout(() => {
          //   setAlert({});
          // }, 3000);
        }
      },
      header: true,
    });
  }

  return (
    <UploadModal
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      showModal={showModal}
      setShowModal={setShowModal}
      handleCSVFileSubmit={handleCSVFileSubmit}
      loading={loading}
      name={'uploadGrade'}
    />
  );
};

export default UploadGradeModal;
