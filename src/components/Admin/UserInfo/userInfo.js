import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TabContentBorrowerInfo from '../Loan/TabContents/tabContentBorrowerInfo';
import TabContentBorrowerDocs from '../Loan/TabContents/tabContentBorrowerDocs';
import TabContentBorrowerRefs from '../Loan/TabContents/tabContentBorrowerRefs';
import handleRedirects from '../../../assets/helpers/handleRedirects';

const UserInfo = props => {

  const borrowerInfoRef = useRef(null);
  const borrowerDocsRef = useRef(null);
  const borrowerRefsRef = useRef(null);
  const borrowerInfoBtnRef = useRef(null);
  const borrowerDocsBtnRef = useRef(null);
  const borrowerRefsBtnRef = useRef(null);

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const userId = props.match.params.id || userData.id;
  const label = props.match.params.id ? 'Borrower' : 'Account';

  useEffect(() => {
    if (userData.userLevel === 2) {
      handleRedirects(history);
    }
  }, [history, userData.userLevel])

  const showInfoTabs = (tab) => {
    switch (tab) {
      case 'borrower-info':
        borrowerInfoRef.current.classList.remove('hidden');
        borrowerInfoBtnRef.current.classList.add('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
      case 'borrower-docs':
        borrowerDocsRef.current.classList.remove('hidden');
        borrowerDocsBtnRef.current.classList.add('active');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
      case 'borrower-refs':
        borrowerRefsRef.current.classList.remove('hidden');
        borrowerRefsBtnRef.current.classList.add('active');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        return;
      default:
        borrowerInfoRef.current.classList.remove('hidden');
        borrowerInfoBtnRef.current.classList.add('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
    }
  }

  return (
    <div className="loan user-info">
      <div className="loan__main-info">
        <div className="loan-tabs">
          <button ref={borrowerInfoBtnRef} className="tab-btns active" onClick={() => showInfoTabs('borrower-info')}>{label} Information</button>
          <button ref={borrowerDocsBtnRef} className="tab-btns" onClick={() => showInfoTabs('borrower-docs')}>{label} Documents</button>
          <button ref={borrowerRefsBtnRef} className="tab-btns" onClick={() => showInfoTabs('borrower-refs')}>{label} References</button>
        </div>
        <div className="loan-tab-contents">
          <div ref={borrowerInfoRef} className="loan-tab-contents__borrower-info">
            <TabContentBorrowerInfo userId={userId} />
          </div>
          <div ref={borrowerDocsRef} className="loan-tab-contents__borrower-documents hidden">
            <TabContentBorrowerDocs userId={userId} />
          </div>
          <div ref={borrowerRefsRef} className="loan-tab-contents__borrower-references hidden">
            <TabContentBorrowerRefs userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;