import { createContext, useState } from "react";

export const PostingsContext = createContext({
  postings: [],
  setPostings: () => {},
});

export const PostingsProvider = ({ children }) => {
  const [postings, setPostings] = useState([]);
  const value = { postings, setPostings };

  return (
    <PostingsContext.Provider value={value}>
      {children}
    </PostingsContext.Provider>
  );
};
