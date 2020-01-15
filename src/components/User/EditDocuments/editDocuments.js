
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import DocumentModal from './editDocumentModal';

const EditDocuments = ({ userId }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [imgModal, setImgModal] = useState(false);

  const addImgRef = useRef(null);

  const [companyId, setCompanyId] = useState(null);
  const [companyIdPreview, setCompanyIdPreview] = useState(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [addCompanyText, setAddCompanyText] = useState('Save');

  const [validIdOne, setValidIdOne] = useState(null);
  const [validIdOnePreview, setValidIdOnePreview] = useState(null);
  const [validOneOpen, setValidOneOpen] = useState(false);

  const [validIdTwo, setValidIdTwo] = useState(null);
  const [validIdTwoPreview, setValidIdTwoPreview] = useState(null);
  const [validTwoOpen, setValidTwoOpen] = useState(false);

  const [payslipOne, setPayslipOne] = useState(null);
  const [payslipOnePreview, setPayslipOnePreview] = useState(null);
  const [psOneOpen, setPsOneOpen] = useState(false);

  const [payslipTwo, setPayslipTwo] = useState(null);
  const [payslipTwoPreview, setPayslipTwoPreview] = useState(null);
  const [psTwoOpen, setPsTwoOpen] = useState(false);

  const [coe, setCoe] = useState(null);
  const [coePreview, setCoePreview] = useState(null);
  const [coeOpen, setCoeOpen] = useState(false);

  const [billingStatement, setBillingStatement] = useState(null);
  const [billingStatementPreview, setBillingStatementPreview] = useState(null);
  const [bsOpen, setBsOpen] = useState(false);

  const [bankTransaction, setBankTransaction] = useState(null);
  const [bankTransactionPreview, setBankTransactionPreview] = useState(null);
  const [btOpen, setBtOpen] = useState(false);

  const toggleAddImg = () => {
    setImgModal(!imgModal);

    if (!imgModal) {
      addImgRef.current.classList.add('opened');
      setTimeout(() => {
        addImgRef.current.classList.add('visible');
      }, 100)
    } else {
      addImgRef.current.classList.remove('visible');
      setTimeout(() => {
        addImgRef.current.classList.remove('opened');
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

  const handleCompanyId = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setCompanyId(e.target.files[0]);
      setCompanyIdPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setCompanyId(null);
      setCompanyIdPreview(null);
    }
  }

  const removeCompanyId = () => {
    setCompanyId(null);
    setCompanyIdPreview(null);
  }

  const saveCompanyId = (e) => {
    e.preventDefault();
    if (addCompanyText === 'Saving...') return;
    if (!companyId) return;
    const userDocuments = new FormData();
    userDocuments.append('companyId', companyId);
    setAddCompanyText('Saving...');

    axios(`${serverUrl}/documents/update-company-id`, {
      method: 'PUT',
      data: userDocuments,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const res = response.data;
        if (res.success) {
          window.location.reload();
        } else {
          setAddCompanyText('Save');
        }
      })
      .catch(err => {
        console.log('upload error', err);
        setAddCompanyText('Submit Documents');
      })
  }

  const refetch = () => {
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
  }

  if (loading) return <h1 className="title-info loading">Loading Documents...</h1>

  return (
    <>
      <h3 className={`title-info`}>Payslips</h3>
      <div className="info-grid">
        <p className="title">Payslip 1:</p>
        <img src={`${serverUrl}/uploads/${user.payslipOne}`} alt={user.payslipOne} onClick={() => setPsOneOpen(!psOneOpen)} />
        <button type="button" onClick={() => setPsOneOpen(!psOneOpen)} className="doc-update">Update</button>
      </div>
      <div className="info-grid">
        <p className="title">Payslip 2:</p>
        <img src={`${serverUrl}/uploads/${user.payslipTwo}`} alt={user.payslipTwo} onClick={() => setPsTwoOpen(!psTwoOpen)} />
        <button type="button" onClick={() => setPsTwoOpen(!psTwoOpen)} className="doc-update">Update</button>
      </div>

      <h3 className="title-info">Government ID's</h3>
      <div className="info-grid">
        <p className="title">Government ID 1:</p>
        <img src={`${serverUrl}/uploads/${user.validIdOne}`} alt={user.validIdOne} onClick={() => setValidOneOpen(!validOneOpen)} />
        <button type="button" onClick={() => setValidOneOpen(!validOneOpen)} className="doc-update">Update</button>
      </div>
      <div className="info-grid">
        <p className="title">Government ID 2:</p>
        <img src={`${serverUrl}/uploads/${user.validIdTwo}`} alt={user.validIdTwo} onClick={() => setValidTwoOpen(!validTwoOpen)} />
        <button type="button" onClick={() => setValidTwoOpen(!validTwoOpen)} className="doc-update">Update</button>
      </div>

      <h3 className="title-info">COE and Company ID</h3>
      <div className="info-grid">
        <p className="title">COE:</p>
        <img src={`${serverUrl}/uploads/${user.coe}`} alt={user.coe} onClick={() => setCoeOpen(!coeOpen)} />
        <button type="button" onClick={() => setCoeOpen(!coeOpen)} className="doc-update">Update</button>
      </div>
      <div className="info-grid">
        <p className="title">Company ID:</p>
        {
          user.companyId ?
            <>
              <img src={`${serverUrl}/uploads/${user.companyId}`} alt={user.companyId} onClick={() => setCompanyOpen(!companyOpen)} />
              <button type="button" onClick={() => setCompanyOpen(!companyOpen)} className="doc-update">Update</button>
            </>
            :
            <button type="button" onClick={toggleAddImg} className="doc-update add">Add Company ID</button>
        }
      </div>

      <h3 className="title-info">Billing Statement and Bank Transaction</h3>
      <div className="info-grid">
        <p className="title">Billing Statement:</p>
        <img src={`${serverUrl}/uploads/${user.billingStatement}`} alt={user.billingStatement} onClick={() => setBsOpen(!bsOpen)} />
        <button type="button" onClick={() => setBsOpen(!bsOpen)} className="doc-update">Update</button>
      </div>
      <div className="info-grid">
        <p className="title">Bank Transaction:</p>
        <img src={`${serverUrl}/uploads/${user.bankTransaction}`} alt={user.bankTransaction} onClick={() => setBtOpen(!btOpen)} />
        <button type="button" onClick={() => setBtOpen(!btOpen)} className="doc-update">Update</button>
      </div>
      {/* DOC MODAL */}
      <div className="loan-modal" ref={addImgRef}>
        <div className="modal-overlay" onClick={toggleAddImg}></div>
        <div className="modal-content img add-doc">
          <div className="modal-header">
            <p className="modal-title">Add Company ID</p>
            <span onClick={toggleAddImg}>&times;</span>
          </div>
          <div className="img-container">
            <div className="input-layout-container">
              <label htmlFor="companyValidIdOne">
                <div className="file-name">
                  <p>{companyId ? companyId.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="companyValidIdOne" onChange={handleCompanyId} />
              {
                companyIdPreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeCompanyId}>&times;</button>
                    <img src={companyIdPreview} alt="validIdOne-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
          <div className="buttons">
            <button type="button" className="cancel" onClick={toggleAddImg}>Cancel</button>
            <button type="button" onClick={saveCompanyId}>{addCompanyText}</button>
          </div>
        </div>
      </div>
      {/* 
        Document Edit Modal
      */}
      <DocumentModal
        modalTitle="Update Payslip One"
        modalOpen={psOneOpen}
        setModalOpen={setPsOneOpen}
        state={payslipOne}
        setNewState={setPayslipOne}
        preview={payslipOnePreview}
        setPreview={setPayslipOnePreview}
        id="payslipOne"
        url={`${serverUrl}/documents/update-ps-one`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Payslip Two"
        modalOpen={psTwoOpen}
        setModalOpen={setPsTwoOpen}
        state={payslipTwo}
        setNewState={setPayslipTwo}
        preview={payslipTwoPreview}
        setPreview={setPayslipTwoPreview}
        id="payslipTwo"
        url={`${serverUrl}/documents/update-ps-two`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Government ID One"
        modalOpen={validOneOpen}
        setModalOpen={setValidOneOpen}
        state={validIdOne}
        setNewState={setValidIdOne}
        preview={validIdOnePreview}
        setPreview={setValidIdOnePreview}
        id="validIdOne"
        url={`${serverUrl}/documents/update-valid-one`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Government ID Two"
        modalOpen={validTwoOpen}
        setModalOpen={setValidTwoOpen}
        state={validIdTwo}
        setNewState={setValidIdTwo}
        preview={validIdTwoPreview}
        setPreview={setValidIdTwoPreview}
        id="validIdTwo"
        url={`${serverUrl}/documents/update-valid-two`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update COE"
        modalOpen={coeOpen}
        setModalOpen={setCoeOpen}
        state={coe}
        setNewState={setCoe}
        preview={coePreview}
        setPreview={setCoePreview}
        id="coe"
        url={`${serverUrl}/documents/update-coe`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Company ID"
        modalOpen={companyOpen}
        setModalOpen={setCompanyOpen}
        state={companyId}
        setNewState={setCompanyId}
        preview={companyIdPreview}
        setPreview={setCompanyIdPreview}
        id="companyId"
        url={`${serverUrl}/documents/update-company-id`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Billing Statement"
        modalOpen={bsOpen}
        setModalOpen={setBsOpen}
        state={billingStatement}
        setNewState={setBillingStatement}
        preview={billingStatementPreview}
        setPreview={setBillingStatementPreview}
        id="billingStatement"
        url={`${serverUrl}/documents/update-billing-statement`}
        refetch={refetch}
      />
      <DocumentModal
        modalTitle="Update Bank Transaction"
        modalOpen={btOpen}
        setModalOpen={setBtOpen}
        state={bankTransaction}
        setNewState={setBankTransaction}
        preview={bankTransactionPreview}
        setPreview={setBankTransactionPreview}
        id="bankTransaction"
        url={`${serverUrl}/documents/update-bank-transaction`}
        refetch={refetch}
      />
    </>
  )

}

export default EditDocuments;