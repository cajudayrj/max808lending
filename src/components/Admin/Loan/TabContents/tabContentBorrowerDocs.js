
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../../serverUrl';

const TabContentBorrowerDocs = ({ userId }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [imgModal, setImgModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalImgSrc, setModalImgSrc] = useState('');
  const viewImgRef = useRef(null);

  const toggleViewImg = (title, src) => {
    setImgModal(!imgModal);

    if (!imgModal) {
      viewImgRef.current.classList.add('opened');
      setTimeout(() => {
        viewImgRef.current.classList.add('visible');
        setModalTitle(title);
        setModalImgSrc(src);
      }, 100)
    } else {
      viewImgRef.current.classList.remove('visible');
      setTimeout(() => {
        viewImgRef.current.classList.remove('opened');
        setModalTitle('');
        setModalImgSrc('');
      }, 300)
    }
  }


  useEffect(() => {
    axios(`${serverUrl}/user/documents/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (res.success) {
          setUser(res.user);
          setLoading(false);
        } else {
          setLoading(false);
        }
        return;
      })
  }, [userData.authToken, userId])
  if (loading) return <h1 className="title-info loading">Loading Documents...</h1>

  return (
    <>
      {
        userData.id === userId ?
          <div className="edit-account">
            <Link to="/dashboard/edit-info">Update Documents</Link>
          </div> : null
      }
      <h3 className={`title-info ${userData.id === userId ? 'top' : ''}`}>Payslips</h3>
      <div className="info-grid">
        <p className="title">Payslip 1:</p>
        <img src={`${serverUrl}/uploads/${user.payslipOne}`} alt={user.payslipOne} onClick={() => toggleViewImg('Payslip One', user.payslipOne)} />
      </div>
      <div className="info-grid">
        <p className="title">Payslip 2:</p>
        <img src={`${serverUrl}/uploads/${user.payslipTwo}`} alt={user.payslipTwo} onClick={() => toggleViewImg('Payslip Two', user.payslipTwo)} />
      </div>

      <h3 className="title-info">Government ID's</h3>
      <div className="info-grid">
        <p className="title">Government ID 1:</p>
        <img src={`${serverUrl}/uploads/${user.validIdOne}`} alt={user.validIdOne} onClick={() => toggleViewImg('Government ID One', user.validIdOne)} />
      </div>
      <div className="info-grid">
        <p className="title">Government ID 2:</p>
        <img src={`${serverUrl}/uploads/${user.validIdTwo}`} alt={user.validIdTwo} onClick={() => toggleViewImg('Government ID Two', user.validIdTwo)} />
      </div>

      <h3 className="title-info">COE and Company ID</h3>
      <div className="info-grid">
        <p className="title">COE:</p>
        <img src={`${serverUrl}/uploads/${user.coe}`} alt={user.coe} onClick={() => toggleViewImg('COE', user.coe)} />
      </div>
      <div className="info-grid">
        <p className="title">Company ID:</p>
        <img src={`${serverUrl}/uploads/${user.companyId}`} alt={user.companyId} onClick={() => toggleViewImg('Company ID', user.companyId)} />
      </div>

      <h3 className="title-info">Billing Statement and Bank Transaction</h3>
      <div className="info-grid">
        <p className="title">Billing Statement:</p>
        <img src={`${serverUrl}/uploads/${user.billingStatement}`} alt={user.billingStatement} onClick={() => toggleViewImg('Billing Statement', user.billingStatement)} />
      </div>
      <div className="info-grid">
        <p className="title">Bank Transaction:</p>
        <img src={`${serverUrl}/uploads/${user.bankTransaction}`} alt={user.bankTransaction} onClick={() => toggleViewImg('Bank Transaction', user.bankTransaction)} />
      </div>
      <div className="loan-modal" ref={viewImgRef}>
        <div className="modal-overlay" onClick={() => toggleViewImg('', '')}></div>
        <div className="modal-content img">
          <div className="modal-header">
            <p className="modal-title">{modalTitle}</p>
            <span onClick={() => toggleViewImg('', '')}>&times;</span>
          </div>
          <div className="img-container">
            {
              modalImgSrc !== '' ?
                <img src={`${serverUrl}/uploads/${modalImgSrc}`} alt={modalImgSrc} />
                : null
            }
          </div>
        </div>
      </div>
    </>
  )

}

export default TabContentBorrowerDocs;