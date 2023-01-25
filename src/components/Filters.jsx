import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { PostingsContext } from "../contexts/PostingsContext";
import { postings as postingsList } from "../mockedPostings";
import arrow from "../assets/down_arrow.svg";

const Filters = () => {
  const [openAddress, setOpenAddress] = useState(true);
  const [openOperations, setOpenOperations] = useState(true);
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState("");
  const { setPostings } = useContext(PostingsContext);

  useEffect(() => {
    if (operation !== "") {
      const postings = postingsList.filter(
        (posting) => posting.operation_type.operation_type_id == operation
      );
      setPostings(postings);
    } else {
      setPostings(postingsList);
    }
  }, [operation, setPostings]);

  const handleClick = () => {
    if (query !== "") {
      const postings = postingsList.filter((posting) => {
        const { address, zone, city } = posting.posting_location;
        const location = [address, zone, city].join(", ");
        return location.toLowerCase().includes(query.toLowerCase());
      });
      setPostings(postings);
    } else {
      setPostings(postingsList);
    }
  };

  const handleChangeInput = (e) => {
    setQuery(e.target.value);
  };

  const handleChangeRadio = (e) => {
    setOperation(e.target.value);
  };

  return (
    <div className="filters">
      <div>
        <span>Filtrado actual</span>
      </div>
      <div className="menu">
        <button
          onClick={() => {
            setOpenAddress(!openAddress);
          }}
          className="btn-dropdown"
        >
          <span>Dirección</span>
          <img
            src={arrow}
            alt=""
            className={openAddress ? "toggle-up" : "toggle-down"}
          />
        </button>
        {openAddress && (
          <div className="dropdown-menu menu-search">
            <input
              type="text"
              name="query"
              value={query}
              onChange={handleChangeInput}
              placeholder="Buscar por dirección"
              className="form-control"
            />
            <button onClick={handleClick} className="btn-search">
              <GoSearch />
            </button>
          </div>
        )}
      </div>
      <div className="menu">
        <button
          className="btn-dropdown"
          onClick={() => {
            setOpenOperations(!openOperations);
          }}
        >
          <span>Tipo de operación</span>
          <img
            src={arrow}
            alt=""
            className={openOperations ? "toggle-up" : "toggle-down"}
          />
        </button>
        {openOperations && (
          <div className="dropdown-menu">
            <label className="form-label">
              <input
                type="radio"
                value="1"
                name="operation"
                checked={operation === "1"}
                onChange={handleChangeRadio}
                className="form-radio"
              />
              Alquiler
            </label>

            <label className="form-label">
              <input
                type="radio"
                value="2"
                name="operation"
                checked={operation === "2"}
                onChange={handleChangeRadio}
                className="form-radio"
              />
              Compra/Venta
            </label>

            <label className="form-label">
              <input
                type="radio"
                value="3"
                name="operation"
                checked={operation === "3"}
                onChange={handleChangeRadio}
                className="form-radio"
              />
              Alquiler Temporal
            </label>

            <label className="form-label">
              <input
                type="radio"
                value=""
                name="operation"
                checked={operation === ""}
                onChange={handleChangeRadio}
                className="form-radio"
              />
              Todos
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
