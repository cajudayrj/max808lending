import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DocumentModal = ({ modalTitle, modalOpen, setModalOpen, state, preview, setNewState, setPreview, id, url, refetch }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const viewImgRef = useRef(null);
  const [submitText, setSubmitText] = useState('Save');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (modalOpen) {
      viewImgRef.current.classList.add('opened');
      setTimeout(() => {
        viewImgRef.current.classList.add('visible');
      }, 100)
    } else {
      viewImgRef.current.classList.remove('visible');
      setTimeout(() => {
        viewImgRef.current.classList.remove('opened');
      }, 300)
    }
  }, [modalOpen]);

  const handleChange = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setNewState(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setNewState(null);
      setPreview(null);
    }
  }

  const removepreview = () => {
    setNewState(null);
    setPreview(null);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (submitText === 'Saving...') return;

    setMessage('');
    if (!state) {
      setMessage('Please upload an image.')
      return;
    };

    const userDocuments = new FormData();
    userDocuments.append(id, state);
    setSubmitText('Saving...');

    axios(url, {
      method: 'PUT',
      data: userDocuments,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const res = response.data;
        if (res.success) {
          refetch();
          setModalOpen(!modalOpen)
        } else {
          setMessage(res.error.message)
        }
        setSubmitText('Save')
      })
      .catch(err => {
        console.log('upload error', err);
        setMessage("There's an error uploading files. Please refresh page.")
        setSubmitText('Save');
      })
  }

  const closeModal = e => {
    e.preventDefault();
    setModalOpen(!modalOpen);
    setNewState(null);
    setPreview(null);
    setMessage('');
  }

  return (
    <div className="loan-modal" ref={viewImgRef}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content img add-doc">
        <div className="modal-header">
          <p className="modal-title">{modalTitle}</p>
          <span onClick={closeModal}>&times;</span>
        </div>
        {
          message !== '' ?
            <div className={`response-message warning`}>
              <p>{message}</p>
            </div> : null
        }
        <div className="img-container">
          <div className="input-layout-container">
            <label htmlFor={id}>
              <div className="file-name">
                <p>{state ? state.name : 'No chosen image'}</p>
              </div>
              <button>Choose File</button>
            </label>
            <input type="file" id={id} onChange={handleChange} />
            {
              preview ?
                <div className="image-preview">
                  <button className="removeImg" type="button" onClick={removepreview}>&times;</button>
                  <img src={preview} alt="validIdOne-preview" />
                </div>
                :
                null
            }
          </div>
        </div>
        <div className="buttons">
          <button type="button" className="cancel" onClick={closeModal}>Cancel</button>
          <button type="button" onClick={handleSubmit}>{submitText}</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentModal;