import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Homepage = () => {
  return (
    <>
      <Header />
      <div className="homepage">
        <div className="homepage__banner-container d-grid">
          <div className="banner-img">
            <img src={require('../../assets/images/frontbanner.png')} alt="max808-homepage-banner" />
          </div>
          <div className="banner-content">
            <div className="banner-content-container max808-container">
              <div className="content">
                <h1>MAX808 LENDING CORP.</h1>
                <h3 className="tagline">Personal Loan for Filipinos Made Easy.</h3>
                <Link to="/borrow" className="cta-borrow">APPLY NOW</Link>
                <p className="cta-login">Already a borrower? <Link to="/login" className="login">Login here.</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage__about-container max808-container">
          <div className="homepage__section-headings about-heading">
            <h3>ABOUT US</h3>
          </div>
          <div className="about-content">
            <p>Max 808 Lending Corp. is committed in assisting families meet their life goals. We understand that sometimes no matter how much we plan our lives, unexpected situations still arise. When that happens, we are here to make your ends meet, fast!</p>
            <p>We value your time so we provide online loan application and submission of required documents. Borrowers with good credit history can get instant approval.</p>
            <p>As we build our relationship with you, your good credit history will give you the chance to be our partner. Your passive income can help pave your way to financial freedom.</p>
          </div>
        </div>
        <div className="homepage__how-it-works-container">
          <div className="how-it-works max808-container">
            <div className="homepage__section-headings how-it-works__heading">
              <h3>HOW IT WORKS</h3>
            </div>
            <p className="how-it-works__sub-title">We Process your loan within 24 hours</p>
            <div className="how-it-works__step-container">
              <div className="box-container d-grid">
                <div className="box-1 boxes">
                  <p className="step-label">1</p>
                  <p className="step-instruction">Create an account</p>
                </div>
                <div className="box-2 boxes">
                  <p className="step-label">2</p>
                  <p className="step-instruction">Complete application forms then upload required documents</p>
                </div>
                <div className="box-3 boxes">
                  <p className="step-label">3</p>
                  <p className="step-instruction">Credit check and document verification</p>
                </div>
                <div className="box-4 boxes">
                  <p className="step-label">4</p>
                  <p className="step-instruction">Present Original Documents and Sign Contract</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessengerCustomerChat
        pageId="103467941193071"
        appId="576151426556921"
        themeColor="#187cbc"
      />
      <Footer />
    </>
  );
}

export default Homepage;