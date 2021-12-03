import React from 'react';

export const Accordion = ({ num, nome }) => {
  return (
    <div className="accordion accordion" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
            tabIndex="-1"
          >
            <p>in caso di registrazione senza codice fiscale...</p>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse px-2"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <input
            type="text"
            ref={nome}
            name="name"
            className="form-control my-2"
            placeholder="NOME E COGNOME"
          />
          <input
            type="text"
            name="phoneNumber"
            ref={num}
            className="form-control my-2"
            placeholder="NUMERO DI TELEFONO"
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
