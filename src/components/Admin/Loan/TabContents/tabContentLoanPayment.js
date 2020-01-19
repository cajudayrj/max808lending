import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../../serverUrl';

const TabContentLoanPayment = ({ terms, amount, status, approveLoanRequest, setBackToActive, rejectLoanRequest, setActiveLoanStatus, loanId, handlePenalties, handlePayment, handleBalance, setLoanStatus, timesToPay }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [loading, setLoading] = useState(true);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [setActiveModal, setSetActiveModal] = useState(false);
  const [updateLoanModal, setUpdateLoanModal] = useState(false);
  const [fullyPaidModal, setFullyPaidModal] = useState(false);
  const [activeBackModal, setActiveBackModal] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');

  const [loanTermData, setLoanTermData] = useState({});

  const [firstDate, setFirstDate] = useState(null);
  const [firstAmount, setFirstAmount] = useState(0);
  const [firstBalance, setFirstBalance] = useState(0);
  const [firstPaid, setFirstPaid] = useState(0);
  const [firstPenalty, setFirstPenalty] = useState(0);
  const [firstStatus, setFirstStatus] = useState('');
  const [firstEditMode, setFirstEditMode] = useState(false);

  const [secondDate, setSecondDate] = useState(null);
  const [secondAmount, setSecondAmount] = useState(0);
  const [secondBalance, setSecondBalance] = useState(0);
  const [secondPaid, setSecondPaid] = useState(0);
  const [secondPenalty, setSecondPenalty] = useState(0);
  const [secondStatus, setSecondStatus] = useState('');
  const [secondEditMode, setSecondEditMode] = useState(false);

  const [thirdDate, setThirdDate] = useState(null);
  const [thirdAmount, setThirdAmount] = useState(0);
  const [thirdBalance, setThirdBalance] = useState(0);
  const [thirdPaid, setThirdPaid] = useState(0);
  const [thirdPenalty, setThirdPenalty] = useState(0);
  const [thirdStatus, setThirdStatus] = useState('');
  const [thirdEditMode, setThirdEditMode] = useState(false);

  const [fourthDate, setFourthDate] = useState(null);
  const [fourthAmount, setFourthAmount] = useState(0);
  const [fourthBalance, setFourthBalance] = useState(0);
  const [fourthPaid, setFourthPaid] = useState(0);
  const [fourthPenalty, setFourthPenalty] = useState(0);
  const [fourthStatus, setFourthStatus] = useState('');
  const [fourthEditMode, setFourthEditMode] = useState(false);

  const [fifthDate, setFifthDate] = useState(null);
  const [fifthAmount, setFifthAmount] = useState(0);
  const [fifthBalance, setFifthBalance] = useState(0);
  const [fifthPaid, setFifthPaid] = useState(0);
  const [fifthPenalty, setFifthPenalty] = useState(0);
  const [fifthStatus, setFifthStatus] = useState('');
  const [fifthEditMode, setFifthEditMode] = useState(false);

  const [sixthDate, setSixthDate] = useState(null);
  const [sixthAmount, setSixthAmount] = useState(0);
  const [sixthBalance, setSixthBalance] = useState(0);
  const [sixthPaid, setSixthPaid] = useState(0);
  const [sixthPenalty, setSixthPenalty] = useState(0);
  const [sixthStatus, setSixthStatus] = useState('');
  const [sixthEditMode, setSixthEditMode] = useState(false);

  const [seventhDate, setSeventhDate] = useState(null);
  const [seventhAmount, setSeventhAmount] = useState(0);
  const [seventhBalance, setSeventhBalance] = useState(0);
  const [seventhPaid, setSeventhPaid] = useState(0);
  const [seventhPenalty, setSeventhPenalty] = useState(0);
  const [seventhStatus, setSeventhStatus] = useState('');
  const [seventhEditMode, setSeventhEditMode] = useState(false);

  const [eighthDate, setEighthDate] = useState(null);
  const [eighthAmount, setEighthAmount] = useState(0);
  const [eighthBalance, setEighthBalance] = useState(0);
  const [eighthPaid, setEighthPaid] = useState(0);
  const [eighthPenalty, setEighthPenalty] = useState(0);
  const [eighthStatus, setEighthStatus] = useState('');
  const [eighthEditMode, setEighthEditMode] = useState(false);

  const [ninthDate, setNinthDate] = useState(null);
  const [ninthAmount, setNinthAmount] = useState(0);
  const [ninthBalance, setNinthBalance] = useState(0);
  const [ninthPaid, setNinthPaid] = useState(0);
  const [ninthPenalty, setNinthPenalty] = useState(0);
  const [ninthStatus, setNinthStatus] = useState('');
  const [ninthEditMode, setNinthEditMode] = useState(false);

  const [tenthDate, setTenthDate] = useState(null);
  const [tenthAmount, setTenthAmount] = useState(0);
  const [tenthBalance, setTenthBalance] = useState(0);
  const [tenthPaid, setTenthPaid] = useState(0);
  const [tenthPenalty, setTenthPenalty] = useState(0);
  const [tenthStatus, setTenthStatus] = useState('');
  const [tenthEditMode, setTenthEditMode] = useState(false);

  const [eleventhDate, setEleventhDate] = useState(null);
  const [eleventhAmount, setEleventhAmount] = useState(0);
  const [eleventhBalance, setEleventhBalance] = useState(0);
  const [eleventhPaid, setEleventhPaid] = useState(0);
  const [eleventhPenalty, setEleventhPenalty] = useState(0);
  const [eleventhStatus, setEleventhStatus] = useState('');
  const [eleventhEditMode, setEleventhEditMode] = useState(false);

  const [twelfthDate, setTwelfthDate] = useState(null);
  const [twelfthAmount, setTwelfthAmount] = useState(0);
  const [twelfthBalance, setTwelfthBalance] = useState(0);
  const [twelfthPaid, setTwelfthPaid] = useState(0);
  const [twelfthPenalty, setTwelfthPenalty] = useState(0);
  const [twelfthStatus, setTwelfthStatus] = useState('');
  const [twelfthEditMode, setTwelfthEditMode] = useState(false);

  const approveRef = useRef(null);
  const rejectRef = useRef(null);
  const setActiveRef = useRef(null);
  const updateLoanRef = useRef(null);
  const fullyPaidRef = useRef(null);
  const activeBackRef = useRef(null);

  const monify = (amount) => {
    if (amount) {
      return amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    } else {
      return '0.00';
    }
  }

  useEffect(() => {
    setLoading(true);
    if ((status === 'Pending') || (status === 'Rejected')) {
      const eachBoxAmount = amount / timesToPay;
      const today = new Date();

      setFirstAmount(0);
      setFirstDate(null);
      setSecondAmount(0);
      setSecondDate(null);
      setThirdAmount(0);
      setThirdDate(null);
      setFourthAmount(0);
      setFourthDate(null);
      setFifthAmount(0);
      setFifthDate(null);
      setSixthAmount(0);
      setSixthDate(null);
      setSeventhAmount(0);
      setSeventhDate(null);
      setEighthAmount(0);
      setEighthDate(null);
      setNinthAmount(0);
      setNinthDate(null);
      setTenthAmount(0);
      setTenthDate(null);
      setEleventhAmount(0);
      setEleventhDate(null);
      setTwelfthAmount(0);
      setTwelfthDate(null);

      for (let i = 1; i <= timesToPay; i++) {
        if (i === 1) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setFirstAmount(eachBoxAmount);
          setFirstDate(dateDeadline);
        }

        if (i === 2) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setSecondAmount(eachBoxAmount);
          setSecondDate(dateDeadline);
        }

        if (i === 3) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setThirdAmount(eachBoxAmount);
          setThirdDate(dateDeadline);
        }

        if (i === 4) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setFourthAmount(eachBoxAmount);
          setFourthDate(dateDeadline);
        }

        if (i === 5) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setFifthAmount(eachBoxAmount);
          setFifthDate(dateDeadline);
        }

        if (i === 6) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setSixthAmount(eachBoxAmount);
          setSixthDate(dateDeadline);
        }

        if (i === 7) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setSeventhAmount(eachBoxAmount);
          setSeventhDate(dateDeadline);
        }

        if (i === 8) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setEighthAmount(eachBoxAmount);
          setEighthDate(dateDeadline);
        }

        if (i === 9) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setNinthAmount(eachBoxAmount);
          setNinthDate(dateDeadline);
        }

        if (i === 10) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setTenthAmount(eachBoxAmount);
          setTenthDate(dateDeadline);
        }

        if (i === 11) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setEleventhAmount(eachBoxAmount);
          setEleventhDate(dateDeadline);
        }

        if (i === 12) {
          const dateDeadline = moment(today).add((15 * i), 'd').tz('Asia/Manila').format('YYYY-MM-DD');
          setTwelfthAmount(eachBoxAmount);
          setTwelfthDate(dateDeadline);
        }
      }

      setLoading(false);
    } else {
      axios(`${serverUrl}/loans/loan-payments/${loanId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${userData.authToken}`,
        }
      })
        .then(result => {
          const res = result.data;
          if (res.length === 0) return;
          const loan = res[0];
          setLoanTermData(loan);

          setFirstDate(moment(loan.firstPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFirstAmount(loan.firstPaymentAmount);
          setFirstBalance(loan.firstPaymentBalance);
          setFirstPaid(loan.firstPaymentPaid);
          setFirstPenalty(loan.firstPaymentPenalty);
          setFirstStatus(loan.firstPaymentStatus);

          setSecondDate(moment(loan.secondPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSecondAmount(loan.secondPaymentAmount);
          setSecondBalance(loan.secondPaymentBalance);
          setSecondPaid(loan.secondPaymentPaid);
          setSecondPenalty(loan.secondPaymentPenalty);
          setSecondStatus(loan.secondPaymentStatus);

          setThirdDate(moment(loan.thirdPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setThirdAmount(loan.thirdPaymentAmount);
          setThirdBalance(loan.thirdPaymentBalance);
          setThirdPaid(loan.thirdPaymentPaid);
          setThirdPenalty(loan.thirdPaymentPenalty);
          setThirdStatus(loan.thirdPaymentStatus);

          setFourthDate(moment(loan.fourthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFourthAmount(loan.fourthPaymentAmount);
          setFourthBalance(loan.fourthPaymentBalance);
          setFourthPaid(loan.fourthPaymentPaid);
          setFourthPenalty(loan.fourthPaymentPenalty);
          setFourthStatus(loan.fourthPaymentStatus);

          setFifthDate(moment(loan.fifthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFifthAmount(loan.fifthPaymentAmount);
          setFifthBalance(loan.fifthPaymentBalance);
          setFifthPaid(loan.fifthPaymentPaid);
          setFifthPenalty(loan.fifthPaymentPenalty);
          setFifthStatus(loan.fifthPaymentStatus);

          setSixthDate(moment(loan.sixthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSixthAmount(loan.sixthPaymentAmount);
          setSixthBalance(loan.sixthPaymentBalance);
          setSixthPaid(loan.sixthPaymentPaid);
          setSixthPenalty(loan.sixthPaymentPenalty);
          setSixthStatus(loan.sixthPaymentStatus);

          setSeventhDate(moment(loan.seventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSeventhAmount(loan.seventhPaymentAmount);
          setSeventhBalance(loan.seventhPaymentBalance);
          setSeventhPaid(loan.seventhPaymentPaid);
          setSeventhPenalty(loan.seventhPaymentPenalty);
          setSeventhStatus(loan.seventhPaymentStatus);

          setEighthDate(moment(loan.eighthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEighthAmount(loan.eighthPaymentAmount);
          setEighthBalance(loan.eighthPaymentBalance);
          setEighthPaid(loan.eighthPaymentPaid);
          setEighthPenalty(loan.eighthPaymentPenalty);
          setEighthStatus(loan.eighthPaymentStatus);

          setNinthDate(moment(loan.ninthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setNinthAmount(loan.ninthPaymentAmount);
          setNinthBalance(loan.ninthPaymentBalance);
          setNinthPaid(loan.ninthPaymentPaid);
          setNinthPenalty(loan.ninthPaymentPenalty);
          setNinthStatus(loan.ninthPaymentStatus);

          setTenthDate(moment(loan.tenthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTenthAmount(loan.tenthPaymentAmount);
          setTenthBalance(loan.tenthPaymentBalance);
          setTenthPaid(loan.tenthPaymentPaid);
          setTenthPenalty(loan.tenthPaymentPenalty);
          setTenthStatus(loan.tenthPaymentStatus);

          setEleventhDate(moment(loan.eleventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEleventhAmount(loan.eleventhPaymentAmount);
          setEleventhBalance(loan.eleventhPaymentBalance);
          setEleventhPaid(loan.eleventhPaymentPaid);
          setEleventhPenalty(loan.eleventhPaymentPenalty);
          setEleventhStatus(loan.eleventhPaymentStatus);

          setTwelfthDate(moment(loan.twelfthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTwelfthAmount(loan.twelfthPaymentAmount);
          setTwelfthBalance(loan.twelfthPaymentBalance);
          setTwelfthPaid(loan.twelfthPaymentPaid);
          setTwelfthPenalty(loan.twelfthPaymentPenalty);
          setTwelfthStatus(loan.twelfthPaymentStatus);
        })

      setLoading(false);
    }

  }, [amount, loanId, status, terms, timesToPay, userData.authToken])

  useEffect(() => {
    const totalPenalties = (firstPenalty
      + secondPenalty
      + thirdPenalty
      + fourthPenalty
      + fifthPenalty
      + sixthPenalty
      + seventhPenalty
      + eighthPenalty
      + ninthPenalty
      + tenthPenalty
      + eleventhPenalty
      + twelfthPenalty)

    handlePenalties(totalPenalties);
  }, [firstPenalty, secondPenalty, thirdPenalty, fourthPenalty, fifthPenalty, sixthPenalty, seventhPenalty, eighthPenalty, ninthPenalty, tenthPenalty, eleventhPenalty, twelfthPenalty, handlePenalties])

  useEffect(() => {
    const totalPayment = (firstPaid
      + secondPaid
      + thirdPaid
      + fourthPaid
      + fifthPaid
      + sixthPaid
      + seventhPaid
      + eighthPaid
      + ninthPaid
      + tenthPaid
      + eleventhPaid
      + twelfthPaid)

    handlePayment(totalPayment);
  }, [firstPaid, secondPaid, thirdPaid, fourthPaid, fifthPaid, sixthPaid, seventhPaid, eighthPaid, ninthPaid, tenthPaid, eleventhPaid, twelfthPaid, handlePayment])

  useEffect(() => {
    const totalBalance = (firstBalance
      + secondBalance
      + thirdBalance
      + fourthBalance
      + fifthBalance
      + sixthBalance
      + seventhBalance
      + eighthBalance
      + ninthBalance
      + tenthBalance
      + eleventhBalance
      + twelfthBalance)

    handleBalance(totalBalance);
  }, [firstBalance, secondBalance, thirdBalance, fourthBalance, fifthBalance, sixthBalance, seventhBalance, eighthBalance, ninthBalance, tenthBalance, eleventhBalance, twelfthBalance, handleBalance])



  const toggleApproveModal = e => {
    e.preventDefault();
    setApproveModal(!approveModal);
    if (!approveModal) {
      approveRef.current.classList.add('opened');
      setTimeout(() => {
        approveRef.current.classList.add('visible');
      }, 100)
    } else {
      approveRef.current.classList.remove('visible');
      setTimeout(() => {
        approveRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const toggleRejectModal = e => {
    e.preventDefault();
    setRejectModal(!rejectModal);
    if (!rejectModal) {
      rejectRef.current.classList.add('opened');
      setTimeout(() => {
        rejectRef.current.classList.add('visible');
      }, 100)
    } else {
      rejectRef.current.classList.remove('visible');
      setTimeout(() => {
        rejectRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const toggleSetActiveModal = e => {
    e.preventDefault();
    setSetActiveModal(!setActiveModal);
    if (!setActiveModal) {
      setActiveRef.current.classList.add('opened');
      setTimeout(() => {
        setActiveRef.current.classList.add('visible');
      }, 100)
    } else {
      setActiveRef.current.classList.remove('visible');
      setTimeout(() => {
        setActiveRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const toggleUpdateLoanModal = e => {
    e.preventDefault();
    setUpdateLoanModal(!updateLoanModal);
    if (!updateLoanModal) {
      updateLoanRef.current.classList.add('opened');
      setTimeout(() => {
        updateLoanRef.current.classList.add('visible');
      }, 100)
    } else {
      updateLoanRef.current.classList.remove('visible');
      setTimeout(() => {
        updateLoanRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const toggleActiveBackModal = e => {
    e.preventDefault();
    setActiveBackModal(!activeBackModal);
    if (!activeBackModal) {
      activeBackRef.current.classList.add('opened');
      setTimeout(() => {
        activeBackRef.current.classList.add('visible');
      }, 100)
    } else {
      activeBackRef.current.classList.remove('visible');
      setTimeout(() => {
        activeBackRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const confirmApproval = e => {
    const data = {
      firstDate,
      firstAmount,
      secondDate,
      secondAmount,
      thirdDate,
      thirdAmount,
      fourthDate,
      fourthAmount,
      fifthDate,
      fifthAmount,
      sixthDate,
      sixthAmount,
      seventhDate,
      seventhAmount,
      eighthDate,
      eighthAmount,
      ninthDate,
      ninthAmount,
      tenthDate,
      tenthAmount,
      eleventhDate,
      eleventhAmount,
      twelfthDate,
      twelfthAmount
    }
    toggleApproveModal(e);
    setTimeout(() => {
      approveLoanRequest(data);
    }, 400)
  }

  const confirmReject = e => {
    toggleRejectModal(e);
    setTimeout(() => {
      rejectLoanRequest(rejectMessage);
    }, 400)
  }

  const confirmSetActive = e => {
    toggleSetActiveModal(e);
    setTimeout(() => {
      setActiveLoanStatus();
    }, 400)
  }

  const updateLoanRequest = () => {
    const data = {
      firstDate: firstDate === 'Invalid date' ? null : firstDate,
      firstBalance,
      firstPaid,
      firstPenalty,
      firstStatus,
      secondDate: secondDate === 'Invalid date' ? null : secondDate,
      secondBalance,
      secondPaid,
      secondPenalty,
      secondStatus,
      thirdDate: thirdDate === 'Invalid date' ? null : thirdDate,
      thirdBalance,
      thirdPaid,
      thirdPenalty,
      thirdStatus,
      fourthDate: fourthDate === 'Invalid date' ? null : fourthDate,
      fourthBalance,
      fourthPaid,
      fourthPenalty,
      fourthStatus,
      fifthDate: fifthDate === 'Invalid date' ? null : fifthDate,
      fifthBalance,
      fifthPaid,
      fifthPenalty,
      fifthStatus,
      sixthDate: sixthDate === 'Invalid date' ? null : sixthDate,
      sixthBalance,
      sixthPaid,
      sixthPenalty,
      sixthStatus,
      seventhDate: seventhDate === 'Invalid date' ? null : seventhDate,
      seventhBalance,
      seventhPaid,
      seventhPenalty,
      seventhStatus,
      eighthDate: eighthDate === 'Invalid date' ? null : eighthDate,
      eighthBalance,
      eighthPaid,
      eighthPenalty,
      eighthStatus,
      ninthDate: ninthDate === 'Invalid date' ? null : ninthDate,
      ninthBalance,
      ninthPaid,
      ninthPenalty,
      ninthStatus,
      tenthDate: tenthDate === 'Invalid date' ? null : tenthDate,
      tenthBalance,
      tenthPaid,
      tenthPenalty,
      tenthStatus,
      eleventhDate: eleventhDate === 'Invalid date' ? null : eleventhDate,
      eleventhBalance,
      eleventhPaid,
      eleventhPenalty,
      eleventhStatus,
      twelfthDate: twelfthDate === 'Invalid date' ? null : twelfthDate,
      twelfthBalance,
      twelfthPaid,
      twelfthPenalty,
      twelfthStatus
    }

    axios(`${serverUrl}/loans/update-active-loan/${loanId}`, {
      method: "PUT",
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (!res.success) {
          console.log(res.message);
        } else {
          const loan = res.loanData;
          setLoanTermData(loan);

          setFirstDate(moment(loan.firstPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFirstAmount(loan.firstPaymentAmount);
          setFirstBalance(loan.firstPaymentBalance);
          setFirstPaid(loan.firstPaymentPaid);
          setFirstPenalty(loan.firstPaymentPenalty);
          setFirstStatus(loan.firstPaymentStatus);

          setSecondDate(moment(loan.secondPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSecondAmount(loan.secondPaymentAmount);
          setSecondBalance(loan.secondPaymentBalance);
          setSecondPaid(loan.secondPaymentPaid);
          setSecondPenalty(loan.secondPaymentPenalty);
          setSecondStatus(loan.secondPaymentStatus);

          setThirdDate(moment(loan.thirdPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setThirdAmount(loan.thirdPaymentAmount);
          setThirdBalance(loan.thirdPaymentBalance);
          setThirdPaid(loan.thirdPaymentPaid);
          setThirdPenalty(loan.thirdPaymentPenalty);
          setThirdStatus(loan.thirdPaymentStatus);

          setFourthDate(moment(loan.fourthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFourthAmount(loan.fourthPaymentAmount);
          setFourthBalance(loan.fourthPaymentBalance);
          setFourthPaid(loan.fourthPaymentPaid);
          setFourthPenalty(loan.fourthPaymentPenalty);
          setFourthStatus(loan.fourthPaymentStatus);

          setFifthDate(moment(loan.fifthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFifthAmount(loan.fifthPaymentAmount);
          setFifthBalance(loan.fifthPaymentBalance);
          setFifthPaid(loan.fifthPaymentPaid);
          setFifthPenalty(loan.fifthPaymentPenalty);
          setFifthStatus(loan.fifthPaymentStatus);

          setSixthDate(moment(loan.sixthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSixthAmount(loan.sixthPaymentAmount);
          setSixthBalance(loan.sixthPaymentBalance);
          setSixthPaid(loan.sixthPaymentPaid);
          setSixthPenalty(loan.sixthPaymentPenalty);
          setSixthStatus(loan.sixthPaymentStatus);

          setSeventhDate(moment(loan.seventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSeventhAmount(loan.seventhPaymentAmount);
          setSeventhBalance(loan.seventhPaymentBalance);
          setSeventhPaid(loan.seventhPaymentPaid);
          setSeventhPenalty(loan.seventhPaymentPenalty);
          setSeventhStatus(loan.seventhPaymentStatus);

          setEighthDate(moment(loan.eighthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEighthAmount(loan.eighthPaymentAmount);
          setEighthBalance(loan.eighthPaymentBalance);
          setEighthPaid(loan.eighthPaymentPaid);
          setEighthPenalty(loan.eighthPaymentPenalty);
          setEighthStatus(loan.eighthPaymentStatus);

          setNinthDate(moment(loan.ninthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setNinthAmount(loan.ninthPaymentAmount);
          setNinthBalance(loan.ninthPaymentBalance);
          setNinthPaid(loan.ninthPaymentPaid);
          setNinthPenalty(loan.ninthPaymentPenalty);
          setNinthStatus(loan.ninthPaymentStatus);

          setTenthDate(moment(loan.tenthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTenthAmount(loan.tenthPaymentAmount);
          setTenthBalance(loan.tenthPaymentBalance);
          setTenthPaid(loan.tenthPaymentPaid);
          setTenthPenalty(loan.tenthPaymentPenalty);
          setTenthStatus(loan.tenthPaymentStatus);

          setEleventhDate(moment(loan.eleventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEleventhAmount(loan.eleventhPaymentAmount);
          setEleventhBalance(loan.eleventhPaymentBalance);
          setEleventhPaid(loan.eleventhPaymentPaid);
          setEleventhPenalty(loan.eleventhPaymentPenalty);
          setEleventhStatus(loan.eleventhPaymentStatus);

          setTwelfthDate(moment(loan.twelfthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTwelfthAmount(loan.twelfthPaymentAmount);
          setTwelfthBalance(loan.twelfthPaymentBalance);
          setTwelfthPaid(loan.twelfthPaymentPaid);
          setTwelfthPenalty(loan.twelfthPaymentPenalty);
          setTwelfthStatus(loan.twelfthPaymentStatus);
        }
        setFirstEditMode(false);
        setSecondEditMode(false);
        setThirdEditMode(false);
        setFourthEditMode(false);
        setFifthEditMode(false);
        setSixthEditMode(false);
        setSeventhEditMode(false);
        setEighthEditMode(false);
        setNinthEditMode(false);
        setTenthEditMode(false);
        setEleventhEditMode(false);
        setTwelfthEditMode(false);
      })
  }

  const toggleFullyPaidModal = e => {
    handleCancelEdit('first');
    handleCancelEdit('second');
    handleCancelEdit('third');
    handleCancelEdit('first');
    handleCancelEdit('fifth');
    handleCancelEdit('sixth');
    handleCancelEdit('seventh');
    handleCancelEdit('eighth');
    handleCancelEdit('ninth');
    handleCancelEdit('tenth');
    handleCancelEdit('eleventh');
    handleCancelEdit('twelfth');

    e.preventDefault();
    setFullyPaidModal(!fullyPaidModal);
    if (!fullyPaidModal) {
      fullyPaidRef.current.classList.add('opened');
      setTimeout(() => {
        fullyPaidRef.current.classList.add('visible');
      }, 100)
    } else {
      fullyPaidRef.current.classList.remove('visible');
      setTimeout(() => {
        fullyPaidRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const fullyPaidLoan = () => {

    const data = {
      firstDate: firstDate === 'Invalid date' ? null : firstDate,
      firstBalance: 0,
      firstPaid: firstAmount + firstPenalty,
      firstPenalty,
      firstStatus: 'Paid',
      secondDate: secondDate === 'Invalid date' ? null : secondDate,
      secondBalance: 0,
      secondPaid: secondAmount + secondPenalty,
      secondPenalty,
      secondStatus: 'Paid',
      thirdDate: thirdDate === 'Invalid date' ? null : thirdDate,
      thirdBalance: 0,
      thirdPaid: thirdAmount + thirdPenalty,
      thirdPenalty,
      thirdStatus: 'Paid',
      fourthDate: fourthDate === 'Invalid date' ? null : fourthDate,
      fourthBalance: 0,
      fourthPaid: fourthAmount + fourthPenalty,
      fourthPenalty,
      fourthStatus: 'Paid',
      fifthDate: fifthDate === 'Invalid date' ? null : fifthDate,
      fifthBalance: 0,
      fifthPaid: fifthAmount + fifthPenalty,
      fifthPenalty,
      fifthStatus: 'Paid',
      sixthDate: sixthDate === 'Invalid date' ? null : sixthDate,
      sixthBalance: 0,
      sixthPaid: sixthAmount + sixthPenalty,
      sixthPenalty,
      sixthStatus: 'Paid',
      seventhDate: seventhDate === 'Invalid date' ? null : seventhDate,
      seventhBalance: 0,
      seventhPaid: seventhAmount + seventhPenalty,
      seventhPenalty,
      seventhStatus: 'Paid',
      eighthDate: eighthDate === 'Invalid date' ? null : eighthDate,
      eighthBalance: 0,
      eighthPaid: eighthAmount + eighthPenalty,
      eighthPenalty,
      eighthStatus: 'Paid',
      ninthDate: ninthDate === 'Invalid date' ? null : ninthDate,
      ninthBalance: 0,
      ninthPaid: ninthAmount + ninthPenalty,
      ninthPenalty,
      ninthStatus: 'Paid',
      tenthDate: tenthDate === 'Invalid date' ? null : tenthDate,
      tenthBalance: 0,
      tenthPaid: tenthAmount + tenthPenalty,
      tenthPenalty,
      tenthStatus: 'Paid',
      eleventhDate: eleventhDate === 'Invalid date' ? null : eleventhDate,
      eleventhBalance: 0,
      eleventhPaid: eleventhAmount + eleventhPenalty,
      eleventhPenalty,
      eleventhStatus: 'Paid',
      twelfthDate: twelfthDate === 'Invalid date' ? null : twelfthDate,
      twelfthBalance: 0,
      twelfthPaid: twelfthAmount + twelfthPenalty,
      twelfthPenalty,
      twelfthStatus: 'Paid',
    }

    axios(`${serverUrl}/loans/set-fully-paid/${loanId}`, {
      method: "PUT",
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (!res.success) {
          console.log(res.message);
        } else {
          const loan = res.loanData;
          setLoanTermData(loan);

          setFirstDate(moment(loan.firstPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFirstAmount(loan.firstPaymentAmount);
          setFirstBalance(loan.firstPaymentBalance);
          setFirstPaid(loan.firstPaymentPaid);
          setFirstPenalty(loan.firstPaymentPenalty);
          setFirstStatus(loan.firstPaymentStatus);

          setSecondDate(moment(loan.secondPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSecondAmount(loan.secondPaymentAmount);
          setSecondBalance(loan.secondPaymentBalance);
          setSecondPaid(loan.secondPaymentPaid);
          setSecondPenalty(loan.secondPaymentPenalty);
          setSecondStatus(loan.secondPaymentStatus);

          setThirdDate(moment(loan.thirdPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setThirdAmount(loan.thirdPaymentAmount);
          setThirdBalance(loan.thirdPaymentBalance);
          setThirdPaid(loan.thirdPaymentPaid);
          setThirdPenalty(loan.thirdPaymentPenalty);
          setThirdStatus(loan.thirdPaymentStatus);

          setFourthDate(moment(loan.fourthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFourthAmount(loan.fourthPaymentAmount);
          setFourthBalance(loan.fourthPaymentBalance);
          setFourthPaid(loan.fourthPaymentPaid);
          setFourthPenalty(loan.fourthPaymentPenalty);
          setFourthStatus(loan.fourthPaymentStatus);

          setFifthDate(moment(loan.fifthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setFifthAmount(loan.fifthPaymentAmount);
          setFifthBalance(loan.fifthPaymentBalance);
          setFifthPaid(loan.fifthPaymentPaid);
          setFifthPenalty(loan.fifthPaymentPenalty);
          setFifthStatus(loan.fifthPaymentStatus);

          setSixthDate(moment(loan.sixthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSixthAmount(loan.sixthPaymentAmount);
          setSixthBalance(loan.sixthPaymentBalance);
          setSixthPaid(loan.sixthPaymentPaid);
          setSixthPenalty(loan.sixthPaymentPenalty);
          setSixthStatus(loan.sixthPaymentStatus);

          setSeventhDate(moment(loan.seventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setSeventhAmount(loan.seventhPaymentAmount);
          setSeventhBalance(loan.seventhPaymentBalance);
          setSeventhPaid(loan.seventhPaymentPaid);
          setSeventhPenalty(loan.seventhPaymentPenalty);
          setSeventhStatus(loan.seventhPaymentStatus);

          setEighthDate(moment(loan.eighthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEighthAmount(loan.eighthPaymentAmount);
          setEighthBalance(loan.eighthPaymentBalance);
          setEighthPaid(loan.eighthPaymentPaid);
          setEighthPenalty(loan.eighthPaymentPenalty);
          setEighthStatus(loan.eighthPaymentStatus);

          setNinthDate(moment(loan.ninthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setNinthAmount(loan.ninthPaymentAmount);
          setNinthBalance(loan.ninthPaymentBalance);
          setNinthPaid(loan.ninthPaymentPaid);
          setNinthPenalty(loan.ninthPaymentPenalty);
          setNinthStatus(loan.ninthPaymentStatus);

          setTenthDate(moment(loan.tenthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTenthAmount(loan.tenthPaymentAmount);
          setTenthBalance(loan.tenthPaymentBalance);
          setTenthPaid(loan.tenthPaymentPaid);
          setTenthPenalty(loan.tenthPaymentPenalty);
          setTenthStatus(loan.tenthPaymentStatus);

          setEleventhDate(moment(loan.eleventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setEleventhAmount(loan.eleventhPaymentAmount);
          setEleventhBalance(loan.eleventhPaymentBalance);
          setEleventhPaid(loan.eleventhPaymentPaid);
          setEleventhPenalty(loan.eleventhPaymentPenalty);
          setEleventhStatus(loan.eleventhPaymentStatus);

          setTwelfthDate(moment(loan.twelfthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
          setTwelfthAmount(loan.twelfthPaymentAmount);
          setTwelfthBalance(loan.twelfthPaymentBalance);
          setTwelfthPaid(loan.twelfthPaymentPaid);
          setTwelfthPenalty(loan.twelfthPaymentPenalty);
          setTwelfthStatus(loan.twelfthPaymentStatus);

          setLoanStatus('Fully Paid');
        }
        setFirstEditMode(false);
        setSecondEditMode(false);
        setThirdEditMode(false);
        setFourthEditMode(false);
        setFifthEditMode(false);
        setSixthEditMode(false);
        setSeventhEditMode(false);
        setEighthEditMode(false);
        setNinthEditMode(false);
        setTenthEditMode(false);
        setEleventhEditMode(false);
        setTwelfthEditMode(false);
      })
  }

  const confirmFullyPaid = e => {
    toggleFullyPaidModal(e);
    setTimeout(() => {
      fullyPaidLoan();
    }, 400)
  }

  const confirmActiveBack = e => {
    toggleActiveBackModal(e);
    setTimeout(() => {
      setBackToActive();
    }, 400)
  }

  const confirmUpdateLoan = e => {
    toggleUpdateLoanModal(e);
    setTimeout(() => {
      updateLoanRequest();
    }, 400)
  }

  const handleCancelEdit = box => {
    const loan = { ...loanTermData };

    switch (box) {
      case 'first':
        setFirstDate(moment(loan.firstPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setFirstAmount(loan.firstPaymentAmount);
        setFirstBalance(loan.firstPaymentBalance);
        setFirstPaid(loan.firstPaymentPaid);
        setFirstPenalty(loan.firstPaymentPenalty);
        setFirstStatus(loan.firstPaymentStatus);
        setFirstEditMode(false);
        return;
      case 'second':
        setSecondDate(moment(loan.secondPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setSecondAmount(loan.secondPaymentAmount);
        setSecondBalance(loan.secondPaymentBalance);
        setSecondPaid(loan.secondPaymentPaid);
        setSecondPenalty(loan.secondPaymentPenalty);
        setSecondStatus(loan.secondPaymentStatus);
        setSecondEditMode(false);
        return;
      case 'third':
        setThirdDate(moment(loan.thirdPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setThirdAmount(loan.thirdPaymentAmount);
        setThirdBalance(loan.thirdPaymentBalance);
        setThirdPaid(loan.thirdPaymentPaid);
        setThirdPenalty(loan.thirdPaymentPenalty);
        setThirdStatus(loan.thirdPaymentStatus);
        setThirdEditMode(false);
        return;
      case 'fourth':
        setFourthDate(moment(loan.fourthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setFourthAmount(loan.fourthPaymentAmount);
        setFourthBalance(loan.fourthPaymentBalance);
        setFourthPaid(loan.fourthPaymentPaid);
        setFourthPenalty(loan.fourthPaymentPenalty);
        setFourthStatus(loan.fourthPaymentStatus);
        setFourthEditMode(false);
        return;
      case 'fifth':
        setFifthDate(moment(loan.fifthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setFifthAmount(loan.fifthPaymentAmount);
        setFifthBalance(loan.fifthPaymentBalance);
        setFifthPaid(loan.fifthPaymentPaid);
        setFifthPenalty(loan.fifthPaymentPenalty);
        setFifthStatus(loan.fifthPaymentStatus);
        setFifthEditMode(false);
        return;
      case 'sixth':
        setSixthDate(moment(loan.sixthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setSixthAmount(loan.sixthPaymentAmount);
        setSixthBalance(loan.sixthPaymentBalance);
        setSixthPaid(loan.sixthPaymentPaid);
        setSixthPenalty(loan.sixthPaymentPenalty);
        setSixthStatus(loan.sixthPaymentStatus);
        setSixthEditMode(false);
        return;
      case 'seventh':
        setSeventhDate(moment(loan.seventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setSeventhAmount(loan.seventhPaymentAmount);
        setSeventhBalance(loan.seventhPaymentBalance);
        setSeventhPaid(loan.seventhPaymentPaid);
        setSeventhPenalty(loan.seventhPaymentPenalty);
        setSeventhStatus(loan.seventhPaymentStatus);
        setSeventhEditMode(false);
        return;
      case 'eighth':
        setEighthDate(moment(loan.eighthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setEighthAmount(loan.eighthPaymentAmount);
        setEighthBalance(loan.eighthPaymentBalance);
        setEighthPaid(loan.eighthPaymentPaid);
        setEighthPenalty(loan.eighthPaymentPenalty);
        setEighthStatus(loan.eighthPaymentStatus);
        setEighthEditMode(false);
        return;
      case 'ninth':
        setNinthEditMode(false);
        setNinthDate(moment(loan.ninthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setNinthAmount(loan.ninthPaymentAmount);
        setNinthBalance(loan.ninthPaymentBalance);
        setNinthPaid(loan.ninthPaymentPaid);
        setNinthPenalty(loan.ninthPaymentPenalty);
        setNinthStatus(loan.ninthPaymentStatus);
        return;
      case 'tenth':
        setTenthDate(moment(loan.tenthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setTenthAmount(loan.tenthPaymentAmount);
        setTenthBalance(loan.tenthPaymentBalance);
        setTenthPaid(loan.tenthPaymentPaid);
        setTenthPenalty(loan.tenthPaymentPenalty);
        setTenthStatus(loan.tenthPaymentStatus);
        setTenthEditMode(false);
        return;
      case 'eleventh':
        setEleventhDate(moment(loan.eleventhPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setEleventhAmount(loan.eleventhPaymentAmount);
        setEleventhBalance(loan.eleventhPaymentBalance);
        setEleventhPaid(loan.eleventhPaymentPaid);
        setEleventhPenalty(loan.eleventhPaymentPenalty);
        setEleventhStatus(loan.eleventhPaymentStatus);
        setEleventhEditMode(false);
        return;
      case 'twelfth':
        setTwelfthDate(moment(loan.twelfthPaymentDate).tz('Asia/Manila').format('YYYY-MM-DD'))
        setTwelfthAmount(loan.twelfthPaymentAmount);
        setTwelfthBalance(loan.twelfthPaymentBalance);
        setTwelfthPaid(loan.twelfthPaymentPaid);
        setTwelfthPenalty(loan.twelfthPaymentPenalty);
        setTwelfthStatus(loan.twelfthPaymentStatus);
        setTwelfthEditMode(false);
        return;
      default:
        return;
    }
  }

  const handleEditMode = box => {

    switch (box) {
      case 'first':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setFirstEditMode(true);
        return;
      case 'second':
        handleCancelEdit('first');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setSecondEditMode(true);
        return;
      case 'third':
        handleCancelEdit('second');
        handleCancelEdit('first');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setThirdEditMode(true);
        return;
      case 'fourth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('first');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setFourthEditMode(true);
        return;
      case 'fifth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('first');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setFifthEditMode(true);
        return;
      case 'sixth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('first');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setSixthEditMode(true);
        return;
      case 'seventh':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('first');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setSeventhEditMode(true);
        return;
      case 'eighth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('first');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setEighthEditMode(true);
        return;
      case 'ninth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('first');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setNinthEditMode(true);
        return;
      case 'tenth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('first');
        handleCancelEdit('eleventh');
        handleCancelEdit('twelfth');
        setTenthEditMode(true);
        return;
      case 'eleventh':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('first');
        handleCancelEdit('twelfth');
        setEleventhEditMode(true);
        return;
      case 'twelfth':
        handleCancelEdit('second');
        handleCancelEdit('third');
        handleCancelEdit('fourth');
        handleCancelEdit('fifth');
        handleCancelEdit('sixth');
        handleCancelEdit('seventh');
        handleCancelEdit('eighth');
        handleCancelEdit('ninth');
        handleCancelEdit('tenth');
        handleCancelEdit('eleventh');
        handleCancelEdit('first');
        setTwelfthEditMode(true);
        return;
      default:
        return;
    }
  }

  const handleFirstPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setFirstPaid(0);
      balance = (firstAmount + firstPenalty) - 0;
      setFirstBalance(balance);
      return;
    }
    let paidAmount = parseFloat(val);
    balance = (firstAmount + firstPenalty) - paidAmount;
    setFirstPaid(paidAmount);
    setFirstBalance(balance);
  }

  const handleFirstPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.firstPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setFirstPenalty(0);
      bal = currBal - firstPaid;
      setFirstBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - firstPaid;
    setFirstPenalty(penalty);
    setFirstBalance(bal);
  }

  const handleSecondPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setSecondPaid(0);
      balance = (secondAmount + secondPenalty) - 0;
      setSecondBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (secondAmount + secondPenalty) - paidAmount;
    setSecondPaid(paidAmount);
    setSecondBalance(balance);
  }

  const handleSecondPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.secondPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setSecondPenalty(0);
      bal = currBal - secondPaid;
      setSecondBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - secondPaid;
    setSecondPenalty(penalty);
    setSecondBalance(bal);
  }

  const handleThirdPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setThirdPaid(0);
      balance = (thirdAmount + thirdPenalty) - 0;
      setThirdBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (thirdAmount + thirdPenalty) - paidAmount;
    setThirdPaid(paidAmount);
    setThirdBalance(balance);
  }

  const handleThirdPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.thirdPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setThirdPenalty(0);
      bal = currBal - thirdPaid;
      setThirdBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - thirdPaid;
    setThirdPenalty(penalty);
    setThirdBalance(bal);
  }

  const handleFourthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setFourthPaid(0);
      balance = (fourthAmount + fourthPenalty) - 0;
      setFourthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (fourthAmount + fourthPenalty) - paidAmount;
    setFourthPaid(paidAmount);
    setFourthBalance(balance);
  }

  const handleFourthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.fourthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setFourthPenalty(0);
      bal = currBal - fourthPaid;
      setFourthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - fourthPaid;
    setFourthPenalty(penalty);
    setFourthBalance(bal);
  }

  const handleFifthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setFifthPaid(0);
      balance = (fifthAmount + fifthPenalty) - 0;
      setFifthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (fifthAmount + fifthPenalty) - paidAmount;
    setFifthPaid(paidAmount);
    setFifthBalance(balance);
  }

  const handleFifthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.fifthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setFifthPenalty(0);
      bal = currBal - fifthPaid;
      setFifthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - fifthPaid;
    setFifthPenalty(penalty);
    setFifthBalance(bal);
  }

  const handleSixthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setSixthPaid(0);
      balance = (sixthAmount + sixthPenalty) - 0;
      setSixthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (sixthAmount + sixthPenalty) - paidAmount;
    setSixthPaid(paidAmount);
    setSixthBalance(balance);
  }

  const handleSixthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.sixthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setSixthPenalty(0);
      bal = currBal - sixthPaid;
      setSixthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - sixthPaid;
    setSixthPenalty(penalty);
    setSixthBalance(bal);
  }

  const handleSeventhPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setSeventhPaid(0);
      balance = (seventhAmount + seventhPenalty) - 0;
      setSeventhBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (seventhAmount + seventhPenalty) - paidAmount;
    setSeventhPaid(paidAmount);
    setSeventhBalance(balance);
  }

  const handleSeventhPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.seventhPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setSeventhPenalty(0);
      bal = currBal - seventhPaid;
      setSeventhBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - seventhPaid;
    setSeventhPenalty(penalty);
    setSeventhBalance(bal);
  }

  const handleEighthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setEighthPaid(0);
      balance = (eighthAmount + eighthPenalty) - 0;
      setEighthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (eighthAmount + eighthPenalty) - paidAmount;
    setEighthPaid(paidAmount);
    setEighthBalance(balance);
  }

  const handleEighthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.eighthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setEighthPenalty(0);
      bal = currBal - eighthPaid;
      setEighthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - eighthPaid;
    setEighthPenalty(penalty);
    setEighthBalance(bal);
  }

  const handleNinthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setNinthPaid(0);
      balance = (ninthAmount + ninthPenalty) - 0;
      setNinthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (ninthAmount + ninthPenalty) - paidAmount;
    setNinthPaid(paidAmount);
    setNinthBalance(balance);
  }

  const handleNinthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.ninthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setNinthPenalty(0);
      bal = currBal - ninthPaid;
      setNinthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - ninthPaid;
    setNinthPenalty(penalty);
    setNinthBalance(bal);
  }

  const handleTenthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setTenthPaid(0);
      balance = (tenthAmount + tenthPenalty) - 0;
      setTenthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (tenthAmount + tenthPenalty) - paidAmount;
    setTenthPaid(paidAmount);
    setTenthBalance(balance);
  }

  const handleTenthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.tenthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setTenthPenalty(0);
      bal = currBal - tenthPaid;
      setTenthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - tenthPaid;
    setTenthPenalty(penalty);
    setTenthBalance(bal);
  }

  const handleEleventhPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setEleventhPaid(0);
      balance = (eleventhAmount + eleventhPenalty) - 0;
      setEleventhBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (eleventhAmount + eleventhPenalty) - paidAmount;
    setEleventhPaid(paidAmount);
    setEleventhBalance(balance);
  }

  const handleEleventhPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.eleventhPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setEleventhPenalty(0);
      bal = currBal - eleventhPaid;
      setEleventhBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - eleventhPaid;
    setEleventhPenalty(penalty);
    setEleventhBalance(bal);
  }

  const handleTwelfthPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setTwelfthPaid(0);
      balance = (twelfthAmount + twelfthPenalty) - 0;
      setTwelfthBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (twelfthAmount + twelfthPenalty) - paidAmount;
    setTwelfthPaid(paidAmount);
    setTwelfthBalance(balance);
  }

  const handleTwelfthPenalty = e => {
    let val = e.target.value;
    const currBal = loanTermData.twelfthPaymentAmount;
    let bal;
    if (e.target.value === '') {
      setTwelfthPenalty(0);
      bal = currBal - twelfthPaid;
      setTwelfthBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + currBal) - twelfthPaid;
    setTwelfthPenalty(penalty);
    setTwelfthBalance(bal);
  }

  if (loading) return <h3>Loading data...</h3>

  return (
    <>
      <div className={`loan-payment-boxes ${status !== 'Pending' ? 'current' : ''}`}>
        {
          status === 'Approved' ?
            <p className="loan-approved">LOAN REQUEST APPROVED</p>
            : null
        }
        {
          status === 'Accepted' ?
            <>
              <p className="loan-accepted">Borrower has accepted the Terms</p>
              <button className="success set-active" onClick={toggleSetActiveModal}>Set Loan as ACTIVE</button>
            </>
            : null
        }
        {
          status === 'Rejected' ?
            <p className="loan-rejected">LOAN REQUEST REJECTED</p>
            : null
        }
        {
          status === 'Refused' ?
            <p className="loan-rejected">Loan Terms refused by borrower</p>
            : null
        }
        {
          status === 'Active' ?
            <div className="fully-paid-btn">
              <button className="success set-full-paid" onClick={toggleFullyPaidModal}>Set Loan as Fully Paid</button>
            </div>
            : null
        }
        {
          status === 'Fully Paid' ?
            <div className="fully-paid-btn">
              <button className="set-full-paid" onClick={toggleActiveBackModal}>Set Back Loan as Active</button>
            </div>
            : null
        }
        {
          status === 'Fully Paid' ?
            <p className="loan-accepted">Loan has been full paid</p>
            : null
        }
        {
          firstAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>First Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(firstDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || firstEditMode ?
                    <input type="date" value={firstDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setFirstDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(firstAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(firstPenalty)}</p>
                      {
                        firstEditMode ?
                          <input type="number" step="0.01" min="0" value={firstPenalty} onChange={handleFirstPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(firstPaid)}</p>
                      {
                        firstEditMode ?
                          <input type="number" step="0.01" min="0" value={firstPaid} onChange={handleFirstPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(firstBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${firstStatus === 'Paid' ? 'paid' : firstStatus === 'Past Due' ? 'pastdue' : ''}`}>{firstStatus}</p>
                      {
                        firstEditMode ?
                          <select type="text" value={firstStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = firstPenalty + firstAmount;
                              setFirstPaid(paid);
                              setFirstBalance(0);
                            } else {
                              setFirstPaid(loanTermData.firstPaymentPaid);
                              setFirstBalance(loanTermData.firstPaymentBalance + firstPenalty);
                            }
                            setFirstStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        firstEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('first')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('first')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            :
            <h3>No amount set.</h3>
        }

        {
          secondAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Second Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(secondDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || secondEditMode ?
                    <input type="date" value={secondDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setSecondDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(secondAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(secondPenalty)}</p>
                      {
                        secondEditMode ?
                          <input type="number" step="0.01" min="0" value={secondPenalty} onChange={handleSecondPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(secondPaid)}</p>
                      {
                        secondEditMode ?
                          <input type="number" step="0.01" min="0" value={secondPaid} onChange={handleSecondPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(secondBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${secondStatus === 'Paid' ? 'paid' : secondStatus === 'Past Due' ? 'pastdue' : ''}`}>{secondStatus}</p>
                      {
                        secondEditMode ?
                          <select type="text" value={secondStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = secondPenalty + secondAmount;
                              setSecondPaid(paid);
                              setSecondBalance(0);
                            } else {
                              setSecondPaid(loanTermData.secondPaymentPaid);
                              setSecondBalance(loanTermData.secondPaymentBalance + secondPenalty);
                            }
                            setSecondStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        secondEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('second')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('second')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          thirdAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Third Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(thirdDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || thirdEditMode ?
                    <input type="date" value={thirdDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setThirdDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(thirdAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(thirdPenalty)}</p>
                      {
                        thirdEditMode ?
                          <input type="number" step="0.01" min="0" value={thirdPenalty} onChange={handleThirdPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(thirdPaid)}</p>
                      {
                        thirdEditMode ?
                          <input type="number" step="0.01" min="0" value={thirdPaid} onChange={handleThirdPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(thirdBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${thirdStatus === 'Paid' ? 'paid' : thirdStatus === 'Past Due' ? 'pastdue' : ''}`}>{thirdStatus}</p>
                      {
                        thirdEditMode ?
                          <select type="text" value={thirdStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = thirdPenalty + thirdAmount;
                              setThirdPaid(paid);
                              setThirdBalance(0);
                            } else {
                              setThirdPaid(loanTermData.thirdPaymentPaid);
                              setThirdBalance(loanTermData.thirdPaymentBalance + thirdPenalty);
                            }
                            setThirdStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        thirdEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('third')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('third')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          fourthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Fourth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(fourthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || fourthEditMode ?
                    <input type="date" value={fourthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setFourthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(fourthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(fourthPenalty)}</p>
                      {
                        fourthEditMode ?
                          <input type="number" step="0.01" min="0" value={fourthPenalty} onChange={handleFourthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(fourthPaid)}</p>
                      {
                        fourthEditMode ?
                          <input type="number" step="0.01" min="0" value={fourthPaid} onChange={handleFourthPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(fourthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${fourthStatus === 'Paid' ? 'paid' : fourthStatus === 'Past Due' ? 'pastdue' : ''}`}>{fourthStatus}</p>
                      {
                        fourthEditMode ?
                          <select type="text" value={fourthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = fourthPenalty + fourthAmount;
                              setFourthPaid(paid);
                              setFourthBalance(0);
                            } else {
                              setFourthPaid(loanTermData.fourthPaymentPaid);
                              setFourthBalance(loanTermData.fourthPaymentBalance + fourthPenalty);
                            }
                            setFourthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        fourthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('fourth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('fourth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          fifthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Fifth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(fifthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || fifthEditMode ?
                    <input type="date" value={fifthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setFifthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(fifthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(fifthPenalty)}</p>
                      {
                        fifthEditMode ?
                          <input type="number" step="0.01" min="0" value={fifthPenalty} onChange={handleFifthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(fifthPaid)}</p>
                      {
                        fifthEditMode ?
                          <input type="number" step="0.01" min="0" value={fifthPaid} onChange={handleFifthPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(fifthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${fifthStatus === 'Paid' ? 'paid' : fifthStatus === 'Past Due' ? 'pastdue' : ''}`}>{fifthStatus}</p>
                      {
                        fifthEditMode ?
                          <select type="text" value={fifthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = fifthPenalty + fifthAmount;
                              setFifthPaid(paid);
                              setFifthBalance(0);
                            } else {
                              setFifthPaid(loanTermData.fifthPaymentPaid);
                              setFifthBalance(loanTermData.fifthPaymentBalance + fifthPenalty);
                            }
                            setFifthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        fifthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('fifth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('fifth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          sixthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Sixth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(sixthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || sixthEditMode ?
                    <input type="date" value={sixthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setSixthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(sixthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(sixthPenalty)}</p>
                      {
                        sixthEditMode ?
                          <input type="number" step="0.01" min="0" value={sixthPenalty} onChange={handleSixthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(sixthPaid)}</p>
                      {
                        sixthEditMode ?
                          <input type="number" step="0.01" min="0" value={sixthPaid} onChange={handleSixthPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(sixthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${sixthStatus === 'Paid' ? 'paid' : sixthStatus === 'Past Due' ? 'pastdue' : ''}`}>{sixthStatus}</p>
                      {
                        sixthEditMode ?
                          <select type="text" value={sixthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = sixthPenalty + sixthAmount;
                              setSixthPaid(paid);
                              setSixthBalance(0);
                            } else {
                              setSixthPaid(loanTermData.sixthPaymentPaid);
                              setSixthBalance(loanTermData.sixthPaymentBalance + sixthPenalty);
                            }
                            setSixthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        sixthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('sixth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('sixth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          seventhAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Seventh Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(seventhDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || seventhEditMode ?
                    <input type="date" value={seventhDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setSeventhDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(seventhAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(seventhPenalty)}</p>
                      {
                        seventhEditMode ?
                          <input type="number" step="0.01" min="0" value={seventhPenalty} onChange={handleSeventhPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(seventhPaid)}</p>
                      {
                        seventhEditMode ?
                          <input type="number" step="0.01" min="0" value={seventhPaid} onChange={handleSeventhPaid} />
                          : null
                      }
                    </div>
                    {
                      status === 'Active' ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(seventhBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Balance:</p>
                      <p className="value">&#8369;{monify(seventhBalance)}</p>
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${seventhStatus === 'Paid' ? 'paid' : seventhStatus === 'Past Due' ? 'pastdue' : ''}`}>{seventhStatus}</p>
                      {
                        seventhEditMode ?
                          <select type="text" value={seventhStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = seventhPenalty + seventhAmount;
                              setSeventhPaid(paid);
                              setSeventhBalance(0);
                            } else {
                              setSeventhPaid(loanTermData.seventhPaymentPaid);
                              setSeventhBalance(loanTermData.seventhPaymentBalance + seventhPenalty);
                            }
                            setSeventhStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        seventhEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('seventh')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('seventh')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          eighthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Eighth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(eighthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || eighthEditMode ?
                    <input type="date" value={eighthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setEighthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(eighthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(eighthPenalty)}</p>
                      {
                        eighthEditMode ?
                          <input type="number" step="0.01" min="0" value={eighthPenalty} onChange={handleEighthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(eighthPaid)}</p>
                      {
                        eighthEditMode ?
                          <input type="number" step="0.01" min="0" value={eighthPaid} onChange={handleEighthPaid} />
                          : null
                      }
                    </div>
                    {
                      (status === 'Active') ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(eighthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${eighthStatus === 'Paid' ? 'paid' : eighthStatus === 'Past Due' ? 'pastdue' : ''}`}>{eighthStatus}</p>
                      {
                        eighthEditMode ?
                          <select type="text" value={eighthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = eighthPenalty + eighthAmount;
                              setEighthPaid(paid);
                              setEighthBalance(0);
                            } else {
                              setEighthPaid(loanTermData.eighthPaymentPaid);
                              setEighthBalance(loanTermData.eighthPaymentBalance + eighthPenalty);
                            }
                            setEighthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        eighthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('eighth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('eighth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          ninthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Ninth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(ninthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || ninthEditMode ?
                    <input type="date" value={ninthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setNinthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(ninthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(ninthPenalty)}</p>
                      {
                        ninthEditMode ?
                          <input type="number" step="0.01" min="0" value={ninthPenalty} onChange={handleNinthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(ninthPaid)}</p>
                      {
                        ninthEditMode ?
                          <input type="number" step="0.01" min="0" value={ninthPaid} onChange={handleNinthPaid} />
                          : null
                      }
                    </div>
                    {
                      (status === 'Active') ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(ninthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${ninthStatus === 'Paid' ? 'paid' : ninthStatus === 'Past Due' ? 'pastdue' : ''}`}>{ninthStatus}</p>
                      {
                        ninthEditMode ?
                          <select type="text" value={ninthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = ninthPenalty + ninthAmount;
                              setNinthPaid(paid);
                              setNinthBalance(0);
                            } else {
                              setNinthPaid(loanTermData.ninthPaymentPaid);
                              setNinthBalance(loanTermData.ninthPaymentBalance + ninthPenalty);
                            }
                            setNinthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        ninthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('ninth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('ninth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          tenthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Tenth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(tenthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || tenthEditMode ?
                    <input type="date" value={tenthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setTenthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(tenthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(tenthPenalty)}</p>
                      {
                        tenthEditMode ?
                          <input type="number" step="0.01" min="0" value={tenthPenalty} onChange={handleTenthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(tenthPaid)}</p>
                      {
                        tenthEditMode ?
                          <input type="number" step="0.01" min="0" value={tenthPaid} onChange={handleTenthPaid} />
                          : null
                      }
                    </div>
                    {
                      (status === 'Active') ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(tenthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${tenthStatus === 'Paid' ? 'paid' : tenthStatus === 'Past Due' ? 'pastdue' : ''}`}>{tenthStatus}</p>
                      {
                        tenthEditMode ?
                          <select type="text" value={tenthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = tenthPenalty + tenthAmount;
                              setTenthPaid(paid);
                              setTenthBalance(0);
                            } else {
                              setTenthPaid(loanTermData.tenthPaymentPaid);
                              setTenthBalance(loanTermData.tenthPaymentBalance + tenthPenalty);
                            }
                            setTenthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        tenthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('tenth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('tenth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          eleventhAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Eleventh Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(eleventhDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || eleventhEditMode ?
                    <input type="date" value={eleventhDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setEleventhDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(eleventhAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(eleventhPenalty)}</p>
                      {
                        eleventhEditMode ?
                          <input type="number" step="0.01" min="0" value={eleventhPenalty} onChange={handleEleventhPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(eleventhPaid)}</p>
                      {
                        eleventhEditMode ?
                          <input type="number" step="0.01" min="0" value={eleventhPaid} onChange={handleEleventhPaid} />
                          : null
                      }
                    </div>
                    {
                      (status === 'Active') ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(eleventhBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${eleventhStatus === 'Paid' ? 'paid' : eleventhStatus === 'Past Due' ? 'pastdue' : ''}`}>{eleventhStatus}</p>
                      {
                        eleventhEditMode ?
                          <select type="text" value={eleventhStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = eleventhPenalty + eleventhAmount;
                              setEleventhPaid(paid);
                              setEleventhBalance(0);
                            } else {
                              setEleventhPaid(loanTermData.eleventhPaymentPaid);
                              setEleventhBalance(loanTermData.eleventhPaymentBalance + eleventhPenalty);
                            }
                            setEleventhStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        eleventhEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('eleventh')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('eleventh')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }

        {
          twelfthAmount !== 0 ?
            <div className="loan-payment-boxes__box">
              <div className="payment-heading-label">
                <h4>Twelfth Payment</h4>
              </div>
              <div className="inputs-labels">
                <p className="label">Due Date:</p>
                <p className="payment-date">{moment(twelfthDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</p>
                {
                  (status === 'Pending') || twelfthEditMode ?
                    <input type="date" value={twelfthDate}
                      min={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
                      onChange={e => setTwelfthDate(e.target.value)}
                      onKeyDown={e => e.preventDefault()}
                    />
                    : null
                }
              </div>
              <div className="inputs-labels">
                <p className="label">Payment Amount:</p>
                <p className="value">&#8369;{monify(twelfthAmount)}</p>
              </div>
              {
                ((status === 'Active') || (status === 'Fully Paid')) ?
                  <>
                    <div className="inputs-labels">
                      <p className="label">Penalty:</p>
                      <p className="value penalty">&#8369;{monify(twelfthPenalty)}</p>
                      {
                        twelfthEditMode ?
                          <input type="number" step="0.01" min="0" value={twelfthPenalty} onChange={handleTwelfthPenalty} />
                          : null
                      }
                    </div>
                    <div className="inputs-labels">
                      <p className="label">Amount Paid:</p>
                      <p className="value">&#8369;{monify(twelfthPaid)}</p>
                      {
                        twelfthEditMode ?
                          <input type="number" step="0.01" min="0" value={twelfthPaid} onChange={handleTwelfthPaid} />
                          : null
                      }
                    </div>
                    {
                      (status === 'Active') ?
                        <div className="inputs-labels">
                          <p className="label">Balance:</p>
                          <p className="value">&#8369;{monify(twelfthBalance)}</p>
                        </div>
                        : null
                    }
                    <div className="inputs-labels">
                      <p className="label">Status:</p>
                      <p className={`value status ${twelfthStatus === 'Paid' ? 'paid' : twelfthStatus === 'Past Due' ? 'pastdue' : ''}`}>{twelfthStatus}</p>
                      {
                        twelfthEditMode ?
                          <select type="text" value={twelfthStatus} onChange={e => {
                            if (e.target.value === 'Paid') {
                              const paid = twelfthPenalty + twelfthAmount;
                              setTwelfthPaid(paid);
                              setTwelfthBalance(0);
                            } else {
                              setTwelfthPaid(loanTermData.twelfthPaymentPaid);
                              setTwelfthBalance(loanTermData.twelfthPaymentBalance + twelfthPenalty);
                            }
                            setTwelfthStatus(e.target.value)
                          }}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Past Due">Past Due</option>
                          </select>
                          : null
                      }
                    </div>
                  </>
                  : null
              }
              {
                status === 'Active' ?
                  <>
                    <div className="separator"></div>
                    <div className="edit-box">
                      {
                        twelfthEditMode ?
                          <>
                            <button className="edit-save" onClick={toggleUpdateLoanModal}>Save</button>
                            <button className="cancel" onClick={() => handleCancelEdit('twelfth')}>Cancel</button>
                          </>
                          : <button className="edit-save" onClick={() => handleEditMode('twelfth')}>Edit</button>
                      }
                    </div>
                  </>
                  : null
              }
            </div>
            : null
        }
        {
          status === 'Pending' ?
            <div className="approve-decline-pending-loan">
              <button className="approve" onClick={toggleApproveModal}>Approve Loan Request</button>
              <button className="reject" onClick={toggleRejectModal}>Reject Loan Request</button>
            </div>
            : null
        }
      </div>
      <div className="loan-modal" ref={approveRef}>
        <div className="modal-overlay" onClick={toggleApproveModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Confirm Approve Loan Request?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmApproval}>Approve</button>
            <button type="button" className="cancel-btn" onClick={toggleApproveModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={rejectRef}>
        <div className="modal-overlay" onClick={toggleRejectModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Confirm Reject Loan Request?</p>
          </div>
          <div className="reject-message">
            <label htmlFor="reject-loan" className="reject-label">Message / Reason for reject:</label>
            <textarea id="reject-loan" value={rejectMessage} onChange={e => setRejectMessage(e.target.value)} rows="4"></textarea>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmReject}>Continue</button>
            <button type="button" className="cancel-btn" onClick={toggleRejectModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={setActiveRef}>
        <div className="modal-overlay" onClick={toggleSetActiveModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Set Loan Status to Active?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmSetActive}>Continue</button>
            <button type="button" className="cancel-btn" onClick={toggleSetActiveModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={updateLoanRef}>
        <div className="modal-overlay" onClick={toggleUpdateLoanModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Save Loan Updates?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmUpdateLoan}>Save</button>
            <button type="button" className="cancel-btn" onClick={toggleUpdateLoanModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={fullyPaidRef}>
        <div className="modal-overlay" onClick={toggleFullyPaidModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Set Loan as Full Paid?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmFullyPaid}>Confirm</button>
            <button type="button" className="cancel-btn" onClick={toggleFullyPaidModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={activeBackRef}>
        <div className="modal-overlay" onClick={toggleActiveBackModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Set Back Loan as Active? &#40; Please proceed with caution &#41;</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmActiveBack}>Set to Active</button>
            <button type="button" className="cancel-btn" onClick={toggleActiveBackModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TabContentLoanPayment;