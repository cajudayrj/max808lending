import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const Faq = () => {
  return (
    <>
      <Header />
      <div className="faq">
        <div className="faq-header d-grid">
          <div className="faq-header-banner">
            <div className="faq-header-content-container max808-container">
              <div className="faq-title">
                <h2 className="title">Frequently Asked Questions</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-content-container max808-container">
          <div className="faq-items">
            <h3 className="questions">How to apply for a loan?</h3>
            <p className="answers">We offer quick online application. Just click BORROW located on the upper right portion of the webpage. Create an account, then complete the online application form and wait for a response within 24 hours.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What are the important requirements to apply for loan?</h3>
            <div className="answers">
              <ul>
                <li>30K Minimum Salary</li>
                <li>Regular Employee &#40;Metro Manila&#41;</li>
                <li>Online Banking and Checking Account</li>
                <li>Certificate of Employment</li>
                <li>2 Months Payslips &amp; Bank Transaction</li>
                <li>1 Company &amp; 2 Government ID's</li>
              </ul>
            </div>
          </div>
          <div className="faq-items">
            <h3 className="questions">How much is the loanable amount?</h3>
            <p className="answers">Max 808 Lending Corp. can provide loan ranging from 50% to 500% of their monthly income. Approved amount will be according to credit investigation and evaluation.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What is the interest rate?</h3>
            <p className="answers">Max 808 Lending Corp. is charging 3% to 10% monthly, add on to your principal.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">How much is the processing fee?</h3>
            <p className="answers">2% of the loaned amount. It's all inclusive of the finance and non-finance charges. The breakdown is available in the Disclosure Statement once your loan is released.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What are the terms of payment?</h3>
            <p className="answers">Payback periods for loans can vary from 15 days to 9 months subject to approval. If you maintain a good account with us, your term may extend as much as 9 months on your re-loan.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">How long does it take to process the loan application?</h3>
            <p className="answers">We will provide you of a decision on your loan application within 24 hours after completion of application form and full submission of requirements.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">Can I apply if I do not have employment?</h3>
            <p className="answers">No, you must be employed by a company or self-employed (for doctors/dentists) to be able to qualify.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">After approval, when will I receive the money?</h3>
            <p className="answers">We will issue a check once the contract is signed. Make sure you have 2 valid IDs with you when claiming the proceeds of the loan.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">Can I apply for another loan if I have an existing loan with Max 808 Lending Corp.?</h3>
            <p className="answers">No.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">How do I make payments?</h3>
            <p className="answers">We require post-dated checks upon release of the loan. Make sure that you fund the checks 2-3 working days before your due date, so it won’t bounce.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What if I miss or I’m late on payment?</h3>
            <p className="answers">We wish to be informed in advance if you will not be able to make a payment. We know that even if you want to pay us back, there may be circumstances beyond your control that will prevent you from doing so. If you inform us ahead of time, we will do our best to come up with a suitable payment schedule for your situation. Penalty will be charged for every monthly payment missed.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What will happen when my check bounce?</h3>
            <p className="answers">As stated in Republic Act No. 4885: “By post-dating a check or issuing a check in payment of an obligation when the offender had no funds in the bank, or his funds deposited therein were not sufficient to cover the amount of check. The failure of the drawer of the check to deposit the amount necessary to cover his check within three (3) days from receipt of notice from the bank and/or the payee or holder that said check has been dishonored for lack of insufficiency of funds shall be prima facie evidence of deceit constituting false pretense or fraudulent act.”</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What if I want to pay off my loan early?</h3>
            <p className="answers">You may pay your loan early however, if you will pay it in full before its maturity, there will be no rebates, but you can already file for a re-loan.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What if I change my personal details such as home address, last name, contact number, etc.? ( In case I moved to a different address, got married, lost my phone, etc. )</h3>
            <p className="answers">You contact Max 808 Lending Corp. by sending an e-mail, message or drop by our office with proof of change in your personal details.</p>
          </div>
          <div className="faq-items">
            <h3 className="questions">What if I don't pay my loan?</h3>
            <p className="answers">Legal action will be filed against you in court. We will pursue you until unpaid loan amount is fully recovered, plus interests and damages.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;