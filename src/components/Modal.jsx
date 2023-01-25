import React, { useCallback, useEffect } from "react";
import { BsXLg } from "react-icons/bs";

const Modal = ({ show, setShow, title, children }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    },
    [setShow]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`modal ${show ? "modal-animation" : ""}`}
      onClick={() => setShow(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button className="btn" onClick={() => setShow(false)}>
            <BsXLg className="icon" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {/* <button className="btn" onClick={() => setShow(false)}>
            <GrClose />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
