import React, { useCallback, useEffect } from "react";

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
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn" onClick={() => setShow(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
