import React, { useContext } from "react";
import { PostingsContext } from "../contexts/PostingsContext";
import Card from "./Card";

const Cards = () => {
  const { postings } = useContext(PostingsContext);

  return (
    <div className="cards">
      {postings.map((posting) => (
        <Card key={posting.posting_id} posting={posting} />
      ))}
    </div>
  );
};

export default Cards;
