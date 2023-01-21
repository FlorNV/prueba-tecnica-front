import React from "react";
import { useState } from "react";
import { postings as postingsList } from "../mockedPostings";
import Card from "./Card";

const Cards = () => {
  const [postings, setPostings] = useState(postingsList);

  return (
    <div className="cards">
      {postings.map((posting) => (
        <Card key={posting.posting_id} posting={posting} />
      ))}
    </div>
  );
};

export default Cards;
