import React from 'react';
import { accounts } from '../../urls.json'
const Accounts = () => {
  window.location.href = `${accounts}?ref=http://${window.location.hostname}/admin`
  return <div></div>;
};

export default Accounts;
