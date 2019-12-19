const handleRedirects = (history) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  if (userData && userData.userLevel === 1) {
    history.push('/admin');
    return;
  }
  else if (userData && userData.userLevel === 2 && userData.userStatus === 'active') {
    history.push('/dashboard');
    return;
  }
  else if (userData && userData.userLevel === 2 && userData.userStatus === 'verified') {
    history.push('/activate-account/step-one');
    return;
  }
  else if (userData && userData.userLevel === 2 && userData.userStatus === 'verified-step-one') {
    history.push('/activate-account/step-two');
    return;
  }
  else if (userData && userData.userLevel === 2 && userData.userStatus === 'verified-step-two') {
    history.push('/activate-account/step-three');
    return;
  }
  else if (userData && userData.userLevel === 2 && userData.userStatus === 'verified-step-three') {
    history.push('/activate-account/step-four');
    return;
  } else {
    history.push('/');
    window.localStorage.removeItem('userData');
    return;
  }
}

export default handleRedirects;