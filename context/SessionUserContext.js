"use client";
import React, { createContext, useState } from "react";

export const SessionUserContext = createContext();

export const SessionUserProvider = ({ children }) => {
  const [sessionUser, setSessionUser] = useState({});

  return (
    <SessionUserContext.Provider value={{ sessionUser, setSessionUser }}>
      {children}
    </SessionUserContext.Provider>
  );
};
