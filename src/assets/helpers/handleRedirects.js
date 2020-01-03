const handleRedirects = (history) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  if (userData && userData.userLevel === 1) {
    history.push('/admin');
  }
  else if (userData && (userData.userLevel === 2) && (userData.userStatus === 'active')) {
    history.push('/dashboard');
  }
  else if (userData && (userData.userLevel === 2) && (userData.userStatus === 'verified')) {
    history.push('/activate-account/step-one');
  }
  else if (userData && (userData.userLevel === 2) && (userData.userStatus === 'verified-step-one')) {
    history.push('/activate-account/step-two');
  }
  else if (userData && (userData.userLevel === 2) && (userData.userStatus === 'verified-step-two')) {
    history.push('/activate-account/step-three');
  }
  else if (userData && (userData.userLevel === 2) && (userData.userStatus === 'verified-step-three')) {
    history.push('/activate-account/step-four');
  } else {
    history.push('/');
    window.localStorage.removeItem('userData');
  }
}

export default handleRedirects;