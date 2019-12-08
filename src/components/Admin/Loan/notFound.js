import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found max808-container">
      <h1>Nothing found.</h1>
      <Link className="back-to-dashboard" to="/admin">Back to dashboard.</Link>
    </div>
  )
}

export default NotFound;