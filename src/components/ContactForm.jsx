import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

const ContactForm = ({ postingId, cardTitle, setShow }) => {
  const [data, setData] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    isValid: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const { name, phone, email } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const validations = { name: "", phone: "", email: "", isValid: true };
    const regex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]/);
    const emailStored = localStorage.getItem(postingId);

    if (!name) {
      validations.name = "El nombre es requerido";
      validations.isValid = false;
    }

    if (!phone) {
      validations.phone = "El telefono es requerido";
      validations.isValid = false;
    }

    if (!email) {
      validations.email = "El email es requerido";
      validations.isValid = false;
    } else if (!regex.test(email)) {
      validations.email = "El formato del email es incorrecto";
      validations.isValid = false;
    } else if (emailStored && emailStored === email) {
      validations.email = "Este email ya se ha utilizado";
      validations.isValid = false;
    }

    return validations;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validations = validate();
    setErrors(validations);
    setIsSubmit(true);

    if (isSubmit && errors.isValid) {
      setErrors({ name: "", phone: "", email: "", isValid: false });
      setData({ name: "", phone: "", email: "" });
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (errors.isValid) {
      localStorage.setItem(postingId, email);
    }
  }, [errors, email, postingId]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="contact-form">
        <h3>Consultar por "{cardTitle}"</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-label">{errors.name}</p>}
        <input
          type="tel"
          className="form-control"
          placeholder="Teléfono"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-label">{errors.phone}</p>}
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-label">{errors.email}</p>}
        {errors.isValid && isSubmit && (
          <div className="alert">
            <BsCheckCircle className="icon" />
            Datos enviados con éxito
          </div>
        )}
        {errors.isValid && isSubmit ? (
          <button className="btn" onClick={() => setShow(false)}>
            Aceptar
          </button>
        ) : (
          <button className="btn">Enviar</button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
