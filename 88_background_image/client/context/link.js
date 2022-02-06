import React, { useState, createContext } from "react";

const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  return (
    <LinkContext.Provider value={[links, setLinks]}>
      {children}
    </LinkContext.Provider>
  );
};

export { LinkContext, LinkProvider };
