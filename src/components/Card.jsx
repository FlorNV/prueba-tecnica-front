import React from "react";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const Card = ({ posting }) => {
  const {
    posting_location,
    posting_prices,
    publication_plan,
    publish_date,
    title,
    posting_picture,
    posting_slug,
    posting_description,
  } = posting;

  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: posting_prices[0].price.currency,
  }).format(posting_prices[0].price.amount);

  const expenses = posting_prices[0].expenses
    ? `+ ${new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: posting_prices[0].expenses.currency,
      }).format(posting_prices[0].expenses.amount)} Expensas`
    : null;

  const publishDate = dayjs(publish_date, "DD/MM/YYYY");
  const diff = dayjs().diff(publishDate, "day");

  const getPublicationPlan = () => {
    const plans = {
      SUPERHIGHLIGHTED: {
        name: "Super destacado",
        class: "card-border-purple",
      },
      HIGHLIGHTED: {
        name: "Destacado",
        class: "card-border-green",
      },
      SIMPLE: {
        name: "Simple",
        class: undefined,
      },
    };
    return plans[publication_plan];
  };

  const publicationPlan = getPublicationPlan();

  return (
    <div className={`card ${publicationPlan.class}`}>
      <div className="card-picture">
        <img src={posting_picture} alt={title} />
        <div className="prices-container">
          <div className="price">{price}</div>
          {expenses && <div className="expenses">{expenses}</div>}
        </div>
        <span>{publicationPlan.name}</span>
        <div className="btn-favorite">
          <FaRegHeart />
        </div>
      </div>
      <div className="card-body">
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <div className="location">
            {`${posting_location.address}, ${posting_location.zone}, ${posting_location.city}`}
          </div>
          <div className="description">{posting_description}</div>
        </div>
        <div className="card-footer">
          <div className="diff">
            <div className="icon">
              <RxCounterClockwiseClock />
            </div>
            <div>Publicado hace {diff} días</div>
          </div>
          <a href={`/${posting_slug}`} className="card-link">
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;