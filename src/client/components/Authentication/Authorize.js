import React from 'react';
import { Redirect } from 'react-router-dom';
import settings from '../../settings';

export const isLoggedIn = () => {
  return localStorage.getItem(settings.authToken) !== null;
};

const withAuthorize = children => {
  const loggedIn = isLoggedIn();
  return loggedIn ? children : <Redirect to="/" />;
};

export default withAuthorize;
