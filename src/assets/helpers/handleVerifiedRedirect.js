const handleVerifiedRedirect = (history) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  if (userData && userData.userLevel === 1) {
    history.push('/admin');
  } else if (userData && userData.userLevel === 2 && userData.userStatus !== 'active') {
    history.push('/dashboard');
  }
}

export default handleVerifiedRedirect;