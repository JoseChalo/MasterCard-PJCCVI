import React, { createContext, useState } from 'react';

export const gmailUser = createContext();

export const GmailUserCurrent = ({ children }) => {
  const [gmail, setGmailCurrent] = useState('Sin gmail por el momento :c');

  return (
    <gmailUser.Provider value={{ gmail, setGmailCurrent }}>
      {children}
    </gmailUser.Provider>
  );
};

